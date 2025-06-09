from sqlalchemy.orm import Session, selectinload
from typing import Optional, List  # Added Optional and List
from app import models, schemas
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_password_hash(password: str):
    return pwd_context.hash(password)

def create_user(db: Session, user: schemas.UserCreate):
    # Hash the password before storing
    hashed_password = get_password_hash(user.password)
    
    db_user = models.User(
        email=user.email, 
        name=user.name,
        password_hash=hashed_password  # Add the hashed password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()


def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()


def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(
        name=product.name,
        description=product.description,
        price=product.price,
        image=product.image,
        in_stock=product.in_stock
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def update_product(db: Session, product_id: int, product_update: schemas.ProductUpdate):
    db_product = db.query(models.Product).filter(
        models.Product.id == product_id).first()
    if db_product:
        update_data = product_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_product, field, value)
        db.commit()
        db.refresh(db_product)
    return db_product


def delete_product(db: Session, product_id: int):
    db_product = db.query(models.Product).filter(
        models.Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product


# Project CRUD operations
def get_project(db: Session, project_id: int):
    return db.query(models.Project).options(selectinload(models.Project.sections)).filter(models.Project.id == project_id).first()


def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Project).options(selectinload(models.Project.sections)).offset(skip).limit(limit).all()


def create_project(db: Session, project: schemas.ProjectCreate):
    db_project = models.Project(
        name=project.name,
        description=project.description,
        overview=project.overview,
        main_image_url=project.main_image_url,
        status=project.status
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def update_project(db: Session, project_id: int, project_update: schemas.ProjectUpdate):
    db_project = db.query(models.Project).filter(
        models.Project.id == project_id).first()
    if db_project:
        update_data = project_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_project, field, value)
        db.commit()
        db.refresh(db_project)
    return db_project


def delete_project(db: Session, project_id: int):
    db_project = db.query(models.Project).filter(
        models.Project.id == project_id).first()
    if db_project:
        db.delete(db_project)
        db.commit()
    return db_project


# ProjectSection CRUD operations
def get_project_section(db: Session, section_id: int):
    return db.query(models.ProjectSection).filter(models.ProjectSection.id == section_id).first()


def get_project_sections(db: Session, project_id: int = None, skip: int = 0, limit: int = 100):
    query = db.query(models.ProjectSection)
    if project_id:
        query = query.filter(models.ProjectSection.project_id == project_id)
    return query.offset(skip).limit(limit).all()


def create_project_section(db: Session, section: schemas.ProjectSectionCreate):
    db_section = models.ProjectSection(
        project_id=section.project_id,
        title=section.title,
        description=section.description,
        details=section.details,
        main_image_url=section.main_image_url
    )
    db.add(db_section)
    db.commit()
    db.refresh(db_section)
    return db_section


def update_project_section(db: Session, section_id: int, section_update: schemas.ProjectSectionUpdate):
    db_section = db.query(models.ProjectSection).filter(
        models.ProjectSection.id == section_id).first()
    if db_section:
        update_data = section_update.dict(exclude_unset=True)
        # Ensure main_image_url is correctly handled if present in update_data
        if 'main_image_url' in update_data:
            setattr(db_section, 'main_image_url',
                    update_data['main_image_url'])

        for field, value in update_data.items():
            # Avoid trying to set main_image_url again if already handled or other fields
            if hasattr(db_section, field):  # Check if attribute exists
                setattr(db_section, field, value)
        db.commit()
        db.refresh(db_section)
    return db_section


def delete_project_section(db: Session, section_id: int):
    db_section = db.query(models.ProjectSection).filter(
        models.ProjectSection.id == section_id).first()
    if db_section:
        db.delete(db_section)
        db.commit()
    return db_section


# Event CRUD operations
def get_event(db: Session, event_id: int):
    return db.query(models.Events).filter(models.Events.id == event_id).first()


def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Events).offset(skip).limit(limit).all()


def create_event(db: Session, event: schemas.EventCreate):
    db_event = models.Events(
        title=event.title,
        description=event.description,
        date=event.date,
        time=event.time,
        location=event.location,
        url=event.url,
        imageUrl=event.imageUrl
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


def update_event(db: Session, event_id: int, event_update: schemas.EventUpdate):
    db_event = db.query(models.Events).filter(
        models.Events.id == event_id).first()
    if db_event:
        update_data = event_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_event, field, value)
        db.commit()
        db.refresh(db_event)
    return db_event


def delete_event(db: Session, event_id: int):
    db_event = db.query(models.Events).filter(
        models.Events.id == event_id).first()
    if db_event:
        db.delete(db_event)
        db.commit()
    return db_event


# OrderHistory CRUD operations (using the history database)
def create_order_history(db: Session, order: schemas.OrderHistoryCreate) -> models.OrderHistory:
    db_order = models.OrderHistory(
        full_name=order.full_name,
        email=order.email,
        contact=order.contact,
        product_title=order.product_title,  # ADDED
        quantity=order.quantity,
        total_amount=order.total_amount
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def get_order_history(db: Session, order_id: int) -> Optional[models.OrderHistory]:
    return db.query(models.OrderHistory).filter(models.OrderHistory.id == order_id).first()


def get_orders_history(db: Session, skip: int = 0, limit: int = 100) -> List[models.OrderHistory]:
    return db.query(models.OrderHistory).order_by(models.OrderHistory.order_date.desc()).offset(skip).limit(limit).all()


def update_order_history(db: Session, order_id: int, order_update: schemas.OrderHistoryUpdate) -> Optional[models.OrderHistory]:
    db_order = db.query(models.OrderHistory).filter(
        models.OrderHistory.id == order_id).first()
    if db_order:
        update_data = order_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_order, key, value)
        db.commit()
        db.refresh(db_order)
    return db_order


def delete_order_history(db: Session, order_id: int) -> Optional[models.OrderHistory]:
    db_order = db.query(models.OrderHistory).filter(
        models.OrderHistory.id == order_id).first()
    if db_order:
        db.delete(db_order)
        db.commit()
    return db_order
