from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from .database import Base

#model for users
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Integer, default=1)  # 1 for active, 0 for inactive

    profile = relationship("UserProfile", back_populates="user", uselist=False)

#model for user profiles
class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)

    # One-to-one relationship with User
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    # Profile fields
    full_name = Column(String(100), nullable=True)
    age = Column(Integer, nullable=True)
    gender = Column(String(20), nullable=True)
    address = Column(String(255), nullable=True)
    university = Column(String(255), nullable=True)
    experience = Column(Text, nullable=True)
    projects = Column(Text, nullable=True)
    bio = Column(Text, nullable=True)
    skills = Column(Text, nullable=True)

    user = relationship("User", back_populates="profile")

#mdoel for subjects
class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)