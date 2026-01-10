from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, Depends, HTTPException
import crud, schemas,tables
from db import get_db,engine
from sqlalchemy.orm import Session

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/parking/", response_model = list[schemas.Park])
def get_all_parking(db: Session = Depends(get_db)):
    return crud.get_park(db)

@app.post("/parking/", response_model = schemas.Park)
def create_new_park(Parking: schemas.ParkCreate,db: Session = Depends(get_db)):
    print(Parking.name, Parking.vehicle_num)
    return crud.create_park(db,Parking)


@app.put("/parking/{vehicle_num}", response_model=schemas.Park)
def update_parking(
    vehicle_num: str,
    data: schemas.ParkUpdate,
    db: Session = Depends(get_db)
):
    updated = crud.update_parking_location(
        db,
        vehicle_num,
        data.parking_loc
    )
    if not updated:
        raise HTTPException(status_code=404, detail="vehicle not found")
    return updated


@app.delete("/parking/{vehicle_num}", response_model=schemas.Park)
def delete_parking(
    vehicle_num: str,
    db: Session = Depends(get_db)
):
    deleted = crud.delete_parking(db, vehicle_num)
    if not deleted:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return deleted
