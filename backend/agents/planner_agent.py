"""
Planner Agent - Business Project Manager
Breaks down goals into structured subtasks
"""

from typing import Dict, Any
import json
from .base_agent import BaseAgent

class PlannerAgent(BaseAgent):
    """Planner Agent - breaks down business goals into actionable subtasks"""
    
    def __init__(self):
        super().__init__(
            name="Planner",
            role="Business Project Manager for Indian small businesses"
        )
    
    def get_system_prompt(self) -> str:
        return """You are a senior business project manager for small businesses in India.

Your job is to:
1. Analyze the user's business goal and their business profile
2. Break their goal into 4-6 clear, actionable subtasks
3. Assign each subtask to the right specialist agent
4. Create a realistic execution timeline

Available agents:
- Researcher: For finding market data, competitor information, and industry trends
- Analyst: For analyzing business numbers, sales data, and finding gaps
- MarketingAnalyst: For analyzing competitor ads, messaging, and marketing channels
- Writer: For creating content, emails, reports, and customer communications

You must output ONLY valid JSON in this exact format:
{
  "business_context": "Brief summary of business situation",
  "primary_goal": "The main goal in one sentence",
  "subtasks": [
    {
      "id": 1,
      "task": "Clear description of what needs to be done",
      "agent": "researcher|analyst|marketing|writer",
      "priority": "high|medium|low",
      "estimated_time": "X minutes"
    }
  ],
  "timeline": "Brief timeline description",
  "success_criteria": "How we'll know the goal is achieved"
}

Rules:
- Always include at least one subtask for each relevant agent type
- Make subtasks specific and actionable
- Consider Indian market context (cities, pricing in ₹, local competitors)
- Prioritize tasks that will have the biggest business impact"""
    
    def _build_user_prompt(self, input_data: Dict[str, Any], context: Dict[str, Any] = None) -> str:
        goal = input_data.get("goal", "")
        business_context = self.format_business_context(context)
        
        return f"""
{business_context}

USER'S GOAL:
{goal}

Break this goal into structured subtasks and assign to the right agents.
Output ONLY valid JSON."""
    
    async def _calculate_confidence(self, output: str, input_data: Dict[str, Any]) -> float:
        """Score based on JSON validity and completeness"""
        score = 7.0
        
        try:
            data = json.loads(output)
            
            # Check required fields
            if "subtasks" in data and len(data["subtasks"]) >= 4:
                score += 1.0
            
            # Check if subtasks have all required fields
            for task in data.get("subtasks", []):
                if all(k in task for k in ["id", "task", "agent", "priority"]):
                    score += 0.2
            
            # Check if all agent types are represented
            agents_used = set(task["agent"] for task in data.get("subtasks", []))
            if len(agents_used) >= 3:
                score += 1.0
            
            return min(score, 10.0)
            
        except json.JSONDecodeError:
            return 5.0  # Invalid JSON
