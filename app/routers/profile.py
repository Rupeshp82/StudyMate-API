from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.auth_utils import get_current_user

router = APIRouter(
    prefix="/profile",
    tags=["profile"],
    responses={404: {"description": "Not found"}},
)

@router.get("/me", response_model=schemas.UserProfileOut)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    profile = db.query(models.UserProfile).filter(models.UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return profile

@router.put("/me", response_model=schemas.UserProfileOut)
def create_profile(
    profile: schemas.UserProfileCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    existing = db.query(models.UserProfile).filter(
        models.UserProfile.user_id == current_user.id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Profile already exists")

    new_profile = models.UserProfile(
        user_id=current_user.id,
        **profile.dict()
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


@router.put("/", response_model=schemas.UserProfileOut)
def update_profile(
    profile_update: schemas.UserProfileUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(models.UserProfile).filter(
        models.UserProfile.user_id == current_user.id
    ).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    for key, value in profile_update.dict().items():
        if value is not None:
            setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile