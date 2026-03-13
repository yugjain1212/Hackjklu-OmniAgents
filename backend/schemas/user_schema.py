from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID

class UserBase(BaseModel):
    email: EmailStr
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True

class BusinessProfileBase(BaseModel):
    business_name: str
    industry: str  # clothing, food, salon, tech, services, retail, other
    monthly_revenue: str  # 0-1L, 1-5L, 5-10L, 10L+
    business_goal: str  # grow_sales, new_market, fix_marketing, understand_competitors, automate_operations
    target_audience: Optional[str] = None
    city: str
    whatsapp_number: Optional[str] = None

class BusinessProfileCreate(BusinessProfileBase):
    pass

class BusinessProfileResponse(BusinessProfileBase):
    id: UUID
    user_id: UUID
    notion_connected: bool = False
    gmail_connected: bool = False
    sheets_connected: bool = False
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None
