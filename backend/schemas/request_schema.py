from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime
from enum import Enum

class JobStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETE = "complete"
    FAILED = "failed"
    RETRYING = "retrying"

class GoalRequest(BaseModel):
    goal: str
    business_profile_id: Optional[UUID] = None
    attachments: Optional[List[str]] = []

class JobResponse(BaseModel):
    id: UUID
    user_id: UUID
    goal_text: str
    status: JobStatus
    current_agent: Optional[str] = None
    final_report: Optional[str] = None
    notion_url: Optional[str] = None
    confidence_score: Optional[float] = None
    created_at: datetime
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class AgentEvent(BaseModel):
    event: str
    agent: str
    message: str
    confidence: Optional[float] = None
    score: Optional[float] = None
    reason: Optional[str] = None
    retry_attempt: Optional[int] = None
    sending_back_to: Optional[str] = None
    final_confidence: Optional[float] = None
    notion_url: Optional[str] = None
    count: Optional[int] = None
    job_id: Optional[str] = None
    total_time_seconds: Optional[int] = None
    outputs: Optional[Dict[str, Any]] = None
    timestamp: str

class AutomationTrigger(BaseModel):
    automation_type: str
    business_profile_id: UUID

class FileUploadResponse(BaseModel):
    filename: str
    path: str
    size: int
    content_type: str
