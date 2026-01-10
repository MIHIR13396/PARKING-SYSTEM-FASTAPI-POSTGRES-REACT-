from pydantic import BaseModel 

class ParkBase(BaseModel):
    name:str
    vehicle_type:int
    vehicle_num:str
    parking_loc:str

class ParkCreate(ParkBase):
    pass

class ParkUpdate(BaseModel):
    parking_loc: str


class Park(ParkBase):
    id : int

    class Config:
        # for old pdy version < 2.x we can use orm_mode
        from_attributes = True # pdy version >2.x