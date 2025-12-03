from typing import Optional
from pydantic import BaseModel

class SubjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class SubjectCreate(SubjectBase):
    """
    Data required to create a new subject.
    """
    pass

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