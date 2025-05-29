from sqlalchemy.orm import Session
from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(email=user.email, name=user.name)
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
    return db.query(models.Project).filter(models.Project.id == project_id).first()


def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Project).offset(skip).limit(limit).all()


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
        for field, value in update_data.items():
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
