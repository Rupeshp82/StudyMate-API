from fastapi import FastAPI
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

# Include routers
app.include_router(subjects.router)

# Root endpoint
@app.get("/", tags=["root"])
def root():
    return {"message": "Welcome to the StudyMate API!"}