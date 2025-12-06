from typing import Optional
from pydantic import BaseModel, EmailStr

#schemas for registering users
# --------- Auth Schemas ---------

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    username: str
    password: str   # only new field needed

class UserOut(UserBase):
    id: int
    username: str
    is_active: bool

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    
# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[int] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Base schema for Subject
class SubjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class SubjectCreate(SubjectBase):
    """
    Data required to create a new subject.
    """
    pass

class subjectUpdate(SubjectBase):
    """
    Data required to update an existing subject.
    All fields are optional.
    """
    name: Optional[str] = None
    description: Optional[str] = None

class SubjectOut(SubjectBase):
    """
    Data returned to a client.
    """
    id: int

    class Config:
        #for pydantic v2 we use from_attributes
        #from_attributes = True

        #for pydantic v1 we use orm_mode
        orm_mode = True