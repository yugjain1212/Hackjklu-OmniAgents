"""
OmniAgent Backend - FastAPI Application
Multi-agent AI automation platform for small business owners
"""

import os
import json
import asyncio
from datetime import datetime
from typing import Dict, List, Optional
from uuid import uuid4, UUID
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Depends, File, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import socketio

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Import schemas
from schemas.user_schema import (
    UserCreate, UserLogin, UserResponse, 
    BusinessProfileCreate, BusinessProfileResponse, Token
)
from schemas.request_schema import (
    GoalRequest, JobResponse, AgentEvent, 
    JobStatus, AutomationTrigger, FileUploadResponse
)

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=os.getenv('CORS_ORIGINS', '*').split(','),
    logger=True,
    engineio_logger=True
)

# Store active connections and jobs
active_connections: Dict[str, WebSocket] = {}
active_jobs: Dict[str, dict] = {}

# Mock database (replace with real DB in production)
users_db = {}
business_profiles_db = {}
jobs_db = {}

# Security
security = HTTPBearer()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler"""
    # Startup
    print("🚀 Starting OmniAgent Backend...")
    yield
    # Shutdown
    print("🛑 Shutting down OmniAgent Backend...")

# Create FastAPI app
app = FastAPI(
    title="OmniAgent API",
    description="Multi-agent AI automation platform for small business owners",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(','),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Wrap with Socket.IO
socket_app = socketio.ASGIApp(sio, app)

# ============== AUTHENTICATION ENDPOINTS ==============

@app.post("/api/auth/signup", response_model=UserResponse)
async def signup(user: UserCreate):
    """Register a new user"""
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = uuid4()
    users_db[user.email] = {
        "id": user_id,
        "email": user.email,
        "password": user.password,  # Hash in production!
        "is_active": True,
        "created_at": datetime.now()
    }
    
    return UserResponse(
        id=user_id,
        email=user.email,
        is_active=True,
        created_at=datetime.now()
    )

@app.post("/api/auth/login", response_model=Token)
async def login(user: UserLogin):
    """Login existing user"""
    if user.email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    db_user = users_db[user.email]
    if db_user["password"] != user.password:  # Verify hash in production!
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create access token (simplified - use JWT in production)
    return Token(access_token=f"mock_token_{user.email}")

@app.get("/api/auth/me", response_model=UserResponse)
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user info"""
    # Verify token and return user (simplified)
    token = credentials.credentials
    email = token.replace("mock_token_", "")
    if email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = users_db[email]
    return UserResponse(
        id=user["id"],
        email=user["email"],
        is_active=user["is_active"],
        created_at=user["created_at"]
    )

# ============== BUSINESS PROFILE ENDPOINTS ==============

@app.post("/api/auth/business-profile", response_model=BusinessProfileResponse)
async def create_business_profile(
    profile: BusinessProfileCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Create or update business profile"""
    token = credentials.credentials
    email = token.replace("mock_token_", "")
    
    if email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = users_db[email]["id"]
    profile_id = uuid4()
    
    business_profiles_db[str(user_id)] = {
        "id": profile_id,
        "user_id": user_id,
        **profile.dict(),
        "notion_connected": False,
        "gmail_connected": False,
        "sheets_connected": False,
        "created_at": datetime.now()
    }
    
    return BusinessProfileResponse(
        id=profile_id,
        user_id=user_id,
        **profile.dict(),
        notion_connected=False,
        gmail_connected=False,
        sheets_connected=False,
        created_at=datetime.now()
    )

@app.get("/api/auth/business-profile", response_model=BusinessProfileResponse)
async def get_business_profile(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get user's business profile"""
    token = credentials.credentials
    email = token.replace("mock_token_", "")
    
    if email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = str(users_db[email]["id"])
    if user_id not in business_profiles_db:
        raise HTTPException(status_code=404, detail="Business profile not found")
    
    profile = business_profiles_db[user_id]
    return BusinessProfileResponse(**profile)

# ============== AGENT PIPELINE ENDPOINTS ==============

@app.post("/api/run-goal", response_model=JobResponse)
async def run_goal(
    request: GoalRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Start agent pipeline for a goal"""
    token = credentials.credentials
    email = token.replace("mock_token_", "")
    
    if email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = users_db[email]["id"]
    job_id = uuid4()
    
    job = {
        "id": job_id,
        "user_id": user_id,
        "goal_text": request.goal,
        "status": JobStatus.PENDING,
        "current_agent": None,
        "final_report": None,
        "notion_url": None,
        "confidence_score": None,
        "created_at": datetime.now(),
        "completed_at": None
    }
    
    jobs_db[str(job_id)] = job
    
    # Start pipeline in background
    asyncio.create_task(run_agent_pipeline(str(job_id), request.goal, user_id))
    
    return JobResponse(**job)

@app.get("/api/status/{job_id}", response_model=JobResponse)
async def get_job_status(
    job_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get current job status"""
    if job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return JobResponse(**jobs_db[job_id])

@app.get("/api/report/{job_id}")
async def get_report(
    job_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get final report for a job"""
    if job_id not in jobs_db:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs_db[job_id]
    if job["status"] != JobStatus.COMPLETE:
        raise HTTPException(status_code=400, detail="Job not complete yet")
    
    return {
        "job_id": job_id,
        "report": job["final_report"],
        "notion_url": job["notion_url"],
        "confidence_score": job["confidence_score"]
    }

# ============== FILE UPLOAD ENDPOINTS ==============

@app.post("/api/upload", response_model=FileUploadResponse)
async def upload_file(
    file: UploadFile = File(...),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Upload file for agent processing"""
    token = credentials.credentials
    email = token.replace("mock_token_", "")
    
    if email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Save file (implement actual storage in production)
    upload_dir = os.getenv("UPLOAD_DIR", "./uploads")
    os.makedirs(upload_dir, exist_ok=True)
    
    file_path = os.path.join(upload_dir, file.filename)
    content = await file.read()
    
    with open(file_path, "wb") as f:
        f.write(content)
    
    return FileUploadResponse(
        filename=file.filename,
        path=file_path,
        size=len(content),
        content_type=file.content_type
    )

# ============== AUTOMATION ENDPOINTS ==============

@app.get("/api/automations")
async def list_automations(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """List all available automations"""
    return {
        "automations": [
            {
                "id": "morning-briefing",
                "name": "Morning Briefing",
                "status": "active",
                "schedule": "Daily at 7:00 AM IST"
            },
            {
                "id": "competitor-monitor",
                "name": "Competitor Monitor",
                "status": "active",
                "schedule": "Daily at 8:00 AM IST"
            },
            {
                "id": "content-calendar",
                "name": "Weekly Content Calendar",
                "status": "active",
                "schedule": "Weekly on Monday"
            },
            {
                "id": "review-manager",
                "name": "Review Auto-Reply",
                "status": "paused",
                "schedule": "Every 2 hours"
            },
            {
                "id": "inventory-alerts",
                "name": "Inventory Alerts",
                "status": "active",
                "schedule": "Daily at 10:00 AM IST"
            },
            {
                "id": "weekly-report",
                "name": "Weekly Business Report",
                "status": "active",
                "schedule": "Weekly on Sunday"
            }
        ]
    }

@app.post("/api/automations/trigger")
async def trigger_automation(
    trigger: AutomationTrigger,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Manually trigger an automation"""
    # Implementation for triggering automations
    return {"status": "triggered", "automation_type": trigger.automation_type}

@app.get("/api/briefing/today")
async def get_daily_briefing(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get today's morning briefing"""
    return {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "revenue_yesterday": 12450,
        "best_product": "Festive Kurtis",
        "new_reviews": 3,
        "stock_alerts": 2,
        "action": "Competitor launched 20% discount. Consider limited-time offer."
    }

# ============== WEBSOCKET EVENTS ==============

@sio.event
async def connect(sid, environ):
    """Handle client connection"""
    print(f"Client connected: {sid}")
    active_connections[sid] = {"connected_at": datetime.now()}

@sio.event
async def disconnect(sid):
    """Handle client disconnection"""
    print(f"Client disconnected: {sid}")
    if sid in active_connections:
        del active_connections[sid]

@sio.on("subscribe_job")
async def subscribe_job(sid, data):
    """Subscribe to job updates"""
    job_id = data.get("job_id")
    if job_id:
        await sio.enter_room(sid, f"job_{job_id}")
        print(f"Client {sid} subscribed to job {job_id}")

@sio.on("unsubscribe_job")
async def unsubscribe_job(sid, data):
    """Unsubscribe from job updates"""
    job_id = data.get("job_id")
    if job_id:
        await sio.leave_room(sid, f"job_{job_id}")
        print(f"Client {sid} unsubscribed from job {job_id}")

# ============== AGENT PIPELINE SIMULATION ==============

async def run_agent_pipeline(job_id: str, goal: str, user_id: UUID):
    """Run the 6-agent pipeline with WebSocket events"""
    job = jobs_db[job_id]
    job["status"] = JobStatus.RUNNING
    
    agents_pipeline = [
        {"id": "planner", "name": "Planner", "delay": 2},
        {"id": "researcher", "name": "Researcher", "delay": 3},
        {"id": "analyst", "name": "Analyst", "delay": 3},
        {"id": "marketing", "name": "Marketing Analyst", "delay": 3},
        {"id": "writer", "name": "Writer", "delay": 3},
        {"id": "critic", "name": "Critic", "delay": 2},
    ]
    
    start_time = datetime.now()
    
    for agent in agents_pipeline:
        # Update current agent
        job["current_agent"] = agent["name"]
        
        # Emit agent_start event
        await sio.emit("agent_start", {
            "event": "agent_start",
            "agent": agent["id"],
            "message": f"{agent['name']} is working on your task...",
            "timestamp": datetime.now().isoformat()
        }, room=f"job_{job_id}")
        
        # Simulate work
        await asyncio.sleep(agent["delay"])
        
        # Emit agent_complete event
        confidence = 8.5 + (agent["id"] == "critic" and 0.7 or 0)
        await sio.emit("agent_complete", {
            "event": "agent_complete",
            "agent": agent["id"],
            "message": f"{agent['name']} completed their task",
            "confidence": confidence,
            "timestamp": datetime.now().isoformat()
        }, room=f"job_{job_id}")
    
    # Simulate Critic approval
    await sio.emit("critic_approve", {
        "event": "critic_approve",
        "final_confidence": 9.2,
        "message": "Quality check passed. Saving to Notion...",
        "timestamp": datetime.now().isoformat()
    }, room=f"job_{job_id}")
    
    await asyncio.sleep(1)
    
    # Simulate Notion save
    await sio.emit("notion_saved", {
        "event": "notion_saved",
        "notion_url": f"https://notion.so/page-{job_id}",
        "timestamp": datetime.now().isoformat()
    }, room=f"job_{job_id}")
    
    # Complete job
    total_time = (datetime.now() - start_time).seconds
    job["status"] = JobStatus.COMPLETE
    job["current_agent"] = None
    job["final_report"] = f"Report for: {goal}"
    job["notion_url"] = f"https://notion.so/page-{job_id}"
    job["confidence_score"] = 9.2
    job["completed_at"] = datetime.now()
    
    # Emit pipeline_complete
    await sio.emit("pipeline_complete", {
        "event": "pipeline_complete",
        "job_id": job_id,
        "total_time_seconds": total_time,
        "final_score": 9.2,
        "outputs": {
            "report_url": f"https://notion.so/page-{job_id}",
            "emails_drafted": 3,
            "posts_created": 7,
            "whatsapp_messages": 2
        },
        "timestamp": datetime.now().isoformat()
    }, room=f"job_{job_id}")

# ============== MAIN ENTRY POINT ==============

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("BACKEND_PORT", 8000))
    uvicorn.run(socket_app, host="0.0.0.0", port=port)
