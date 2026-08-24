from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models import Task
from app.schemas import TaskCreate, TaskUpdate
from typing import Optional

def get_tasks(db: Session, status: Optional[str] = None, search: Optional[str] = None):
    query = db.query(Task)
    if status == "active":
        query = query.filter(Task.completed == False)
    elif status == "completed":
        query = query.filter(Task.completed == True)
    
    if search:
        search_filter = f"%{search}%"
        query = query.filter(or_(Task.title.ilike(search_filter), Task.description.ilike(search_filter)))
        
    return query.order_by(Task.created_at.desc()).all()

def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()

def create_task(db: Session, task: TaskCreate):
    db_task = Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, task_id: int, task: TaskUpdate):
    db_task = get_task(db, task_id)
    if not db_task:
        return None
    
    update_data = task.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)
        
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)
    if not db_task:
        return False
    
    db.delete(db_task)
    db.commit()
    return True
