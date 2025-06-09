from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    return crud.create_project(db=db, project=project)


@router.get("/", response_model=List[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = crud.get_projects(db, skip=skip, limit=limit)
    return projects


@router.get("/{project_id}", response_model=schemas.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


@router.put("/{project_id}", response_model=schemas.Project)
def update_project(
    project_id: int,
    project_update: schemas.ProjectUpdate,
    db: Session = Depends(get_db)
):
    db_project = crud.update_project(
        db, project_id=project_id, project_update=project_update)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = crud.delete_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}


# Project Sections endpoints
@router.post("/{project_id}/sections", response_model=schemas.ProjectSection)
def create_project_section(
    project_id: int,
    section: schemas.ProjectSectionCreate,
    db: Session = Depends(get_db)
):
    # Verify project exists
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Set the project_id from URL
    section.project_id = project_id
    return crud.create_project_section(db=db, section=section)


@router.get("/{project_id}/sections", response_model=List[schemas.ProjectSection])
def read_project_sections(
    project_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    # Verify project exists
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    sections = crud.get_project_sections(db, project_id=project_id, skip=skip, limit=limit)
    return sections


@router.get("/sections/{section_id}", response_model=schemas.ProjectSection)
def read_project_section(section_id: int, db: Session = Depends(get_db)):
    db_section = crud.get_project_section(db, section_id=section_id)
    if db_section is None:
        raise HTTPException(status_code=404, detail="Project section not found")
    return db_section


@router.put("/sections/{section_id}", response_model=schemas.ProjectSection)
def update_project_section(
    section_id: int,
    section_update: schemas.ProjectSectionUpdate,
    db: Session = Depends(get_db)
):
    db_section = crud.update_project_section(
        db, section_id=section_id, section_update=section_update)
    if db_section is None:
        raise HTTPException(status_code=404, detail="Project section not found")
    return db_section


@router.delete("/sections/{section_id}")
def delete_project_section(section_id: int, db: Session = Depends(get_db)):
    db_section = crud.delete_project_section(db, section_id=section_id)
    if db_section is None:
        raise HTTPException(status_code=404, detail="Project section not found")
    return {"message": "Project section deleted successfully"}