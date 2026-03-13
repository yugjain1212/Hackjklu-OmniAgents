"""Critic Agent - Quality Controller"""

from typing import Dict, Any
import re
from .base_agent import BaseAgent

class CriticAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Critic", role="Quality Controller and Safety Checker")
    
    def get_system_prompt(self) -> str:
        return """You are a senior business quality controller.

You review all agent outputs before they reach the business owner. Your job is to make sure the advice is:
- Accurate (all claims sourced)
- Realistic (financially achievable)
- Relevant (actually answers their goal)
- Safe (no false promises or illegal advice)
- Appropriate (right tone for Indian market)

Scoring Rubric (total 10 points):

Business section (6 points):
  - All claims have cited sources: 2 pts
  - Analysis matches user's actual situation: 2 pts
  - Recommendation is financially realistic: 2 pts

Marketing section (4 points):
  - Competitor data is specific not generic: 1 pt
  - Positioning gap is clearly identified: 1 pt
  - Channel recommendations have budget: 1 pt
  - Content is appropriate for Indian audience: 1 pt

You must output in this exact format:

QUALITY REVIEW

Score: [X]/10

Strengths:
- [strength 1]
- [strength 2]

Issues Found:
- [issue 1] - Severity: [high/medium/low]
- [issue 2] - Severity: [high/medium/low]

Decision: [APPROVED or REJECTED]

If REJECTED:
Reason: [specific reason]
Send back to: [agent name]
Required fixes: [what needs to be corrected]

If APPROVED:
Authorization: Notion save + content delivery approved"""
    
    def _build_user_prompt(self, input_data: Dict[str, Any], context: Dict[str, Any] = None) -> str:
        content_package = input_data.get("output", "")
        original_goal = input_data.get("original_goal", "")
        
        return f"""
ORIGINAL GOAL:
{original_goal}

CONTENT TO REVIEW:
{content_package}

Review this content thoroughly and provide your quality assessment.
Be strict - only approve if it truly meets all criteria."""
    
    async def run(self, input_data: Dict[str, Any], context: Dict[str, Any] = None) -> Dict[str, Any]:
        """Override run to parse approval/rejection decision"""
        result = await super().run(input_data, context)
        
        if result["success"]:
            output = result["output"]
            
            # Parse decision
            if "Decision: REJECTED" in output or "Decision: REJECT" in output:
                result["decision"] = "rejected"
                # Extract which agent to send back to
                match = re.search(r'Send back to:\s*(\w+)', output, re.IGNORECASE)
                result["send_back_to"] = match.group(1) if match else "writer"
                # Extract reason
                match = re.search(r'Reason:\s*(.+?)(?:\n|$)', output)
                result["rejection_reason"] = match.group(1) if match else "Quality check failed"
            else:
                result["decision"] = "approved"
                result["send_back_to"] = None
                result["rejection_reason"] = None
            
            # Extract score
            match = re.search(r'Score:\s*(\d+\.?\d*)', output)
            if match:
                result["score"] = float(match.group(1))
                result["confidence"] = result["score"]
        
        return result
    
    async def _calculate_confidence(self, output: str, input_data: Dict[str, Any]) -> float:
        """Extract the score from the output"""
        try:
            match = re.search(r'Score:\s*(\d+\.?\d*)', output)
            if match:
                return float(match.group(1))
        except:
            pass
        return 7.0
