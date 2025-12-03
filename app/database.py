from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLAlchemy Database URL - to create a SQLite database file named 'studymate.db' in the current directory
DATABASE_URL = "sqlite:///./studymate.db"

# for sqlite, need to set check_same_thread to False
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
    )

#for each request will get its own session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#this is a base class for models
Base = declarative_base()

def get_db():
    """Dependency to get DB session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()