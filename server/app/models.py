from sqlalchemy import Column, Integer, String, DateTime, Text, Float, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base, BaseHistory  # Import BaseHistory
from passlib.context import CryptContext
import bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    password_hash = Column(String)  # Store encrypted password
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Product(BaseHistory):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    image = Column(String)
    in_stock = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', price={self.price})>"


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    overview = Column(Text)
    main_image_url = Column(String)
    status = Column(String, default='upcoming')
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    sections = relationship("ProjectSection", back_populates="project")


class ProjectSection(Base):
    __tablename__ = "projects_sections"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text)
    details = Column(Text)
    main_image_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    project = relationship("Project", back_populates="sections")


class Events(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    date = Column(String, nullable=False)  # Stores date as YYYY-MM-DD
    time = Column(String, nullable=False)
    location = Column(String, nullable=False)
    url = Column(String)
    imageUrl = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


# New Model for Order History in the separate database
class OrderHistory(BaseHistory):
    __tablename__ = "orders_history"

    id = Column(Integer, primary_key=True, index=True,
                autoincrement=True)  # This will serve as order_id
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    contact = Column(String, nullable=False)
    # ADDED: Title of the product ordered
    product_title = Column(String, nullable=False)
    # Total quantity of items in the order
    quantity = Column(Integer, nullable=False)
    total_amount = Column(Float, nullable=False)  # This will serve as total
    order_date = Column(DateTime(timezone=True), server_default=func.now())
    def __repr__(self):
        return f"<OrderHistory(id={self.id}, email='{self.email}', product='{self.product_title}')>"
