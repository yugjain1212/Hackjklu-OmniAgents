"""
Crew Manager - Orchestrates the 6-agent pipeline
"""

import os
import asyncio
from typing import Dict, Any, Optional, Callable
from datetime import datetime

from agents import (
    PlannerAgent,
    ResearcherAgent,
    AnalystAgent,
    MarketingAnalystAgent,
    WriterAgent,
    CriticAgent
)

class CrewManager:
    """Manages the multi-agent pipeline execution"""
    
    def __init__(self, websocket_emitter: Optional[Callable] = None):
        self.agents = {
            "planner": PlannerAgent(),
            "researcher": ResearcherAgent(),
            "analyst": AnalystAgent(),
            "marketing": MarketingAnalystAgent(),
            "writer": WriterAgent(),
            "critic": CriticAgent(),
        }
        self.confidence_threshold = float(os.getenv("CONFIDENCE_THRESHOLD", 7.0))
        self.max_retries = int(os.getenv("MAX_RETRY_ATTEMPTS", 3))
        self.websocket_emitter = websocket_emitter
        
    async def run_pipeline(
        self, 
        goal: str, 
        context: Dict[str, Any],
        job_id: str
    ) -> Dict[str, Any]:
        """
        Run the complete 6-agent pipeline
        
        Args:
            goal: User's business goal
            context: Business profile and other context
            job_id: Unique job identifier
            
        Returns:
            Final result with all outputs
        """
        results = {
            "job_id": job_id,
            "goal": goal,
            "start_time": datetime.now().isoformat(),
            "agents": {},
            "final_output": None,
            "notion_url": None,
            "confidence": 0,
            "status": "running"
        }
        
        try:
            # Step 1: Planner
            await self._emit_event(job_id, "agent_start", "planner", "Analyzing goal and creating plan...")
            planner_result = await self.agents["planner"].run(
                {"goal": goal},
                context
            )
            results["agents"]["planner"] = planner_result
            await self._emit_event(job_id, "agent_complete", "planner", "Plan created", planner_result["confidence"])
            
            # Check if we need to retry
            if planner_result["confidence"] < self.confidence_threshold:
                planner_result = await self._retry_agent("planner", {"goal": goal}, context, job_id)
                results["agents"]["planner"] = planner_result
            
            # Step 2: Researcher
            await self._emit_event(job_id, "agent_start", "researcher", "Gathering market intelligence...")
            researcher_result = await self.agents["researcher"].run(
                {"task": planner_result["output"]},
                context
            )
            results["agents"]["researcher"] = researcher_result
            await self._emit_event(job_id, "agent_complete", "researcher", "Research complete", researcher_result["confidence"])
            
            # Step 3: Analyst
            await self._emit_event(job_id, "agent_start", "analyst", "Analyzing business data...")
            analyst_result = await self.agents["analyst"].run(
                {"output": researcher_result["output"]},
                context
            )
            results["agents"]["analyst"] = analyst_result
            await self._emit_event(job_id, "agent_complete", "analyst", "Analysis complete", analyst_result["confidence"])
            
            # Step 4: Marketing Analyst
            await self._emit_event(job_id, "agent_start", "marketing", "Analyzing competitor marketing...")
            marketing_result = await self.agents["marketing"].run(
                {"output": analyst_result["output"]},
                context
            )
            results["agents"]["marketing"] = marketing_result
            await self._emit_event(job_id, "agent_complete", "marketing", "Marketing analysis complete", marketing_result["confidence"])
            
            # Step 5: Writer
            await self._emit_event(job_id, "agent_start", "writer", "Creating content and reports...")
            writer_result = await self.agents["writer"].run(
                {"output": marketing_result["output"]},
                context
            )
            results["agents"]["writer"] = writer_result
            await self._emit_event(job_id, "agent_complete", "writer", "Content created", writer_result["confidence"])
            
            # Step 6: Critic (with retry logic)
            critic_result = await self._run_critic_with_retry(
                writer_result["output"],
                goal,
                context,
                job_id,
                results
            )
            
            if critic_result.get("decision") == "approved":
                results["status"] = "complete"
                results["final_output"] = writer_result["output"]
                results["confidence"] = critic_result.get("score", 7.0)
                
                # Save to Notion (mock)
                notion_url = f"https://notion.so/omniagent-report-{job_id}"
                results["notion_url"] = notion_url
                await self._emit_event(job_id, "notion_saved", None, None, notion_url=notion_url)
                
            else:
                results["status"] = "failed"
                results["error"] = critic_result.get("rejection_reason", "Quality check failed")
            
            results["end_time"] = datetime.now().isoformat()
            
            # Emit completion
            await self._emit_event(
                job_id, 
                "pipeline_complete", 
                None, 
                None,
                final_confidence=results["confidence"],
                notion_url=results["notion_url"]
            )
            
            return results
            
        except Exception as e:
            results["status"] = "failed"
            results["error"] = str(e)
            results["end_time"] = datetime.now().isoformat()
            return results
    
    async def _run_critic_with_retry(
        self,
        content: str,
        goal: str,
        context: Dict[str, Any],
        job_id: str,
        results: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Run critic with retry logic"""
        for attempt in range(self.max_retries):
            await self._emit_event(job_id, "agent_start", "critic", f"Quality check (attempt {attempt + 1})...")
            
            critic_result = await self.agents["critic"].run(
                {
                    "output": content,
                    "original_goal": goal
                },
                context
            )
            
            if critic_result.get("decision") == "approved":
                await self._emit_event(
                    job_id, 
                    "critic_approve", 
                    None, 
                    f"Approved with score {critic_result.get('score', 0)}/10",
                    final_confidence=critic_result.get("score")
                )
                return critic_result
            
            # Rejected - need to retry
            send_back_to = critic_result.get("send_back_to", "writer")
            reason = critic_result.get("rejection_reason", "Quality issues found")
            
            await self._emit_event(
                job_id,
                "critic_reject",
                None,
                reason,
                score=critic_result.get("score"),
                retry_attempt=attempt + 1,
                sending_back_to=send_back_to
            )
            
            if attempt < self.max_retries - 1:
                # Retry the agent that failed
                agent_to_retry = self.agents.get(send_back_to.lower())
                if agent_to_retry:
                    await self._emit_event(job_id, "agent_start", send_back_to.lower(), f"Retrying based on feedback...")
                    
                    # Get previous input for this agent
                    if send_back_to.lower() == "writer":
                        prev_output = results["agents"]["marketing"]["output"]
                    elif send_back_to.lower() == "marketing":
                        prev_output = results["agents"]["analyst"]["output"]
                    elif send_back_to.lower() == "analyst":
                        prev_output = results["agents"]["researcher"]["output"]
                    elif send_back_to.lower() == "researcher":
                        prev_output = results["agents"]["planner"]["output"]
                    else:
                        prev_output = {"output": content}
                    
                    retry_result = await agent_to_retry.run(
                        {"output": prev_output, "feedback": reason},
                        context
                    )
                    results["agents"][send_back_to.lower()] = retry_result
                    content = retry_result["output"]
                    
                    await self._emit_event(job_id, "agent_complete", send_back_to.lower(), "Retry complete", retry_result["confidence"])
        
        # Max retries exceeded
        return critic_result
    
    async def _retry_agent(
        self,
        agent_name: str,
        input_data: Dict[str, Any],
        context: Dict[str, Any],
        job_id: str
    ) -> Dict[str, Any]:
        """Retry an agent with feedback"""
        await self._emit_event(job_id, "agent_start", agent_name, "Improving output...")
        
        # Add feedback to input
        input_data["feedback"] = "Please provide more detailed and accurate information."
        
        result = await self.agents[agent_name].run(input_data, context)
        
        await self._emit_event(job_id, "agent_complete", agent_name, "Improvement complete", result["confidence"])
        
        return result
    
    async def _emit_event(
        self,
        job_id: str,
        event_type: str,
        agent: Optional[str],
        message: Optional[str],
        confidence: Optional[float] = None,
        **kwargs
    ):
        """Emit WebSocket event"""
        if self.websocket_emitter:
            event_data = {
                "event": event_type,
                "job_id": job_id,
                "timestamp": datetime.now().isoformat()
            }
            
            if agent:
                event_data["agent"] = agent
            if message:
                event_data["message"] = message
            if confidence:
                event_data["confidence"] = confidence
            
            event_data.update(kwargs)
            
            await self.websocket_emitter(event_data)
