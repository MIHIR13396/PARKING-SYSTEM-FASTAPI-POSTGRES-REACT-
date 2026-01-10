from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

#SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password@localhost:5432/Parking_User"
SQLALCHEMY_DATABASE_URL = "postgresql:///Parking_User"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal= sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()           # To create tables we will use in code

def get_db():                       # init session using this fun
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_table():
    Base.metadata.create_all(bind=engine)
