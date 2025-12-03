from fastapi import FastAPI

app = FastAPI(
    title="StudyMate API",
    description="API for StudyMate application to manage study materials and user progress.",
    version="1.0.0"
)

@app.get("/", tags=["root"])
def root():
    return {"message": "Welcome to the StudyMate API!"}