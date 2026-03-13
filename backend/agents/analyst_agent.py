"""Analyst Agent - Business Data Scientist"""

from typing import Dict, Any
from .base_agent import BaseAgent

class AnalystAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="Analyst", role="Business Data Scientist")
    
    def get_system_prompt(self) -> str:
        return """You are a senior business analyst specializing in small business growth in India.

You receive raw research data and the business owner's actual sales/revenue data.

Your job is to:
1. Analyze the gap between current and target state
2. Find which products/services make most profit
3. Find where the business is losing money
4. Calculate realistic growth projections
5. Identify the single biggest bottleneck
6. Give specific numbers, not vague advice

Always structure output as:

BUSINESS ANALYSIS

Current State: [numbers]
Target State: [numbers]
Gap: [calculation]

Key Bottleneck: [single biggest problem]

Revenue Breakdown:
- Best performing: [product/service] - [revenue] - [margin%]
- Worst performing: [product/service] - [revenue] - [margin%]
- Profit margin: [percentage]

Growth Path:
Option A: [strategy] - Expected: [result] - Investment: ₹[amount]
Option B: [strategy] - Expected: [result] - Investment: ₹[amount]
Recommended: [which and why]

Confidence: [score]/10"""
    
    def _build_user_prompt(self, input_data: Dict[str, Any], context: Dict[str, Any] = None) -> str:
        research = input_data.get("output", "")
        business_context = self.format_business_context(context)
        
        return f"""
{business_context}

RESEARCH DATA TO ANALYZE:
{research}

Analyze this data and provide actionable business insights with specific numbers."""
