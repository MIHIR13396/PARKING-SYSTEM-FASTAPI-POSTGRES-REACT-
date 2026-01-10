from tables import Parking
from sqlalchemy.orm import Session
from schemas import ParkCreate

# Create
def create_park(db:Session,data:ParkCreate):
    parking_instance= Parking(**data.model_dump()) # pydt fun to convert class dict , json ** for address
    db.add(parking_instance)
    db.commit()
    db.refresh(parking_instance)
    return parking_instance

# Read
def get_park(db:Session):
    return db.query(Parking).all()

# Update parking location
def update_parking_location(db: Session, vehicle_num: str, new_parking_loc: str):
    parking = db.query(Parking).filter(
        Parking.vehicle_num == vehicle_num
    ).first()

    if not parking:
        return None

    parking.parking_loc = new_parking_loc
    db.commit()
    db.refresh(parking)  
    return parking


# Delete parking entry
def delete_parking(db: Session, vehicle_num: str):
    parking = db.query(Parking).filter(
        Parking.vehicle_num == vehicle_num
    ).first()

    if not parking:
        return None

    db.delete(parking)
    db.commit()
    return parking
