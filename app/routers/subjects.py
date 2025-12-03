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

#get all subjects
@router.get("/", response_model=List[schemas.SubjectOut])
def get_subjects(db: Session = Depends(get_db)):
    subjects = db.query(models.Subject).all()
    return subjects

@router.put("/{subject_id}", response_model=schemas.SubjectOut)
def update_subject(
    subject_id: int,
    subject_update: schemas.subjectUpdate,
    db: Session = Depends(get_db)
    ):
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subject with id '{subject_id}' not found."
        )
    
    #check if updating name to an existing name
    if subject_update.name and subject_update.name != subject.name:
        existing_subject = db.query(models.Subject).filter(models.Subject.name == subject_update.name).first()
        if existing_subject:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Subject with name '{subject_update.name}' already exists."
            )
    
    #update fields if provided
    if subject_update.name is not None:
        subject.name = subject_update.name
    if subject_update.description is not None:
        subject.description = subject_update.description
    
    db.commit()
    db.refresh(subject)
    return subject

@router.delete("/{subject_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_subject(
    subject_id: int,
    db: Session = Depends(get_db)
    ):
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subject with id '{subject_id}' not found."
        )
    
    db.delete(subject)
    db.commit()
    return None