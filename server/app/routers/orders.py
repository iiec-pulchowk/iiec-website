from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..database import get_product_db  # Use the history DB session

router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)


@router.post("/", response_model=schemas.OrderHistory)
def create_order(order: schemas.OrderHistoryCreate, db: Session = Depends(get_product_db)):
    """
    Create a new order history entry.
    """
    return crud.create_order_history(db=db, order=order)


@router.get("/", response_model=List[schemas.OrderHistory])
def read_orders_history(skip: int = 0, limit: int = 100, db: Session = Depends(get_product_db)):
    """
    Retrieve order history entries.
    """
    orders = crud.get_orders_history(db, skip=skip, limit=limit)
    return orders


@router.get("/{order_id}", response_model=schemas.OrderHistory)
def read_order_history(order_id: int, db: Session = Depends(get_product_db)):
    """
    Retrieve a specific order history entry by ID.
    """
    db_order = crud.get_order_history(db, order_id=order_id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order


@router.patch("/{order_id}", response_model=schemas.OrderHistory)
def update_order(order_id: int, order_update: schemas.OrderHistoryUpdate, db: Session = Depends(get_product_db)):
    """
    Update an order.
    """
    updated_order = crud.update_order_history(
        db, order_id=order_id, order_update=order_update)
    if updated_order is None:
        raise HTTPException(
            status_code=404, detail="Order not found or no update performed")
    return updated_order


# status_code 204 for successful deletion with no content response
@router.delete("/{order_id}", status_code=204)
def delete_order(order_id: int, db: Session = Depends(get_product_db)):
    """
    Delete an order by ID.
    """
    deleted_order = crud.delete_order_history(db, order_id=order_id)
    if deleted_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    # Or return Response(status_code=204)
    return {"message": "Order deleted successfully"}
