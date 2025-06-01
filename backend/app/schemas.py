from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List, Any, Dict


class UserBase(BaseModel):
    email: str
    name: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image: Optional[str] = None
    in_stock: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    in_stock: Optional[bool] = None


class Product(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ProjectSectionBase(BaseModel):
    project_id: int
    title: str
    description: Optional[str] = None
    details: Optional[str] = None
    main_image_url: Optional[str] = None


class ProjectSectionCreate(ProjectSectionBase):
    pass


class ProjectSectionUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    details: Optional[str] = None
    main_image_url: Optional[str] = None


class ProjectSection(ProjectSectionBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    overview: Optional[str] = None
    main_image_url: Optional[str] = None
    status: str = 'upcoming'


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    overview: Optional[str] = None
    main_image_url: Optional[str] = None
    status: Optional[str] = None


class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    sections: List[ProjectSection] = []

    class Config:
        from_attributes = True


class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: str  # Expects YYYY-MM-DD
    time: str
    location: str
    url: Optional[str] = None
    imageUrl: Optional[str] = None


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    location: Optional[str] = None
    url: Optional[str] = None
    imageUrl: Optional[str] = None


class Event(EventBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Schemas for OrderHistory
class OrderHistoryBase(BaseModel):
    full_name: str
    email: str
    contact: str
    quantity: int  # Total quantity of items
    total_amount: float  # Represents 'total'


class OrderHistoryCreate(OrderHistoryBase):
    pass


class OrderHistoryUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    contact: Optional[str] = None
    quantity: Optional[int] = None
    total_amount: Optional[float] = None


class OrderHistory(OrderHistoryBase):
    id: int  # Represents 'order_id'
    order_date: datetime

    class Config:
        from_attributes = True
