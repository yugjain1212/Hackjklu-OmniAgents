"""Researcher Agent - Business Intelligence Investigator"""

from typing import Dict, Any
from .base_agent import BaseAgent

class ResearcherAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Researcher", role="Business Intelligence Researcher")
    
    def get_system_prompt(self) -> str:
        return """You are a business intelligence researcher specializing in Indian small businesses and markets.

Your job is to:
1. Search for real, current information about the topic
2. Find specific numbers: market sizes, CAC, conversion rates, pricing data
3. Find competitor examples with real strategies
4. NEVER fabricate data - only use what you find
5. Always cite the source for every fact
6. Rate your confidence 1-10 at the end

Output format:
RESEARCH BRIEF
Topic: [topic]
Sources found: [number]

Key Findings:
- [finding 1] (Source: [url or description])
- [finding 2] (Source: [url or description])

Market Data:
- Market size: [data]
- Growth rate: [data]
- Key players: [list]

Competitor Intelligence:
- [Competitor 1]: [what they do, pricing, positioning]
- [Competitor 2]: [what they do, pricing, positioning]

Confidence: [score]/10"""
    
    def _build_user_prompt(self, input_data: Dict[str, Any], context: Dict[str, Any] = None) -> str:
        task = input_data.get("task", input_data.get("output", ""))
        business_context = self.format_business_context(context)
        
        return f"""
{business_context}

RESEARCH TASK:
{task}

Conduct thorough research and provide findings with sources."""
    
    async def _calculate_confidence(self, output: str, input_data: Dict[str, Any]) -> float:
        score = 7.0
        if "Source:" in output:
            score += 1.0
        if "Competitor" in output:
            score += 0.5
        if "₹" in output or "Rs." in output:
            score += 0.5
        if "Confidence:" in output:
            try:
                import re
                match = re.search(r'Confidence:\s*(\d+\.?\d*)', output)
                if match:
                    self_reported = float(match.group(1))
                    score = (score + self_reported) / 2
            except:
                pass
        return min(score, 10.0)
