from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/subjects",
    tags=["subjects"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.SubjectOut, status_code=status.HTTP_201_CREATED)
def create_subject(
    subject: schemas.SubjectCreate, 
    db: Session = Depends(get_db)
    ):

    #check if subject with same name exists
    existing_subject = db.query(models.Subject).filter(models.Subject.name == subject.name).first()
    if existing_subject:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Subject with name '{subject.name}' already exists."
        )
    
    #create new subject
    subject = models.Subject(
        name=subject.name,
        description=subject.description
    )
    db.add(subject)
    db.commit()
    db.refresh(subject)
    return subject

@router.get("/", response_model=List[schemas.SubjectOut])
def get_subjects(db: Session = Depends(get_db)):
    subjects = db.query(models.Subject).all()
    return subjects