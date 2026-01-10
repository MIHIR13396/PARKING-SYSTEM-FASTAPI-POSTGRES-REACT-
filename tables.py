from db import Base
from sqlalchemy import Integer, Column, String

class Parking(Base):
    __tablename__ = "parking"
    id = Column(Integer, primary_key=True,index = True)
    name = Column(String, nullable=False, index = True)
    vehicle_type = Column(Integer, nullable=False,index = True) # 2 for bike , 3 for auto , 4 for Car
    vehicle_num = Column(String(10),nullable=False,unique = True ,index = True)
    parking_loc= Column(String(5),nullable=False,index = True)

 