from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models
from .routers import subjects


# Create the database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="StudyMate API",
    description="API for StudyMate application to manage study materials and user progress.",
    version="1.0.0"
)

#frontend to talk to backend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(subjects.router)

# Root endpoint
@app.get("/", tags=["root"])
def root():
    return {"message": "Welcome to the StudyMate API!"}