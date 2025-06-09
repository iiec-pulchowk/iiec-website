from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, engine_history
from app import models
from app.routers import users, products, projects, events, orders

app = FastAPI(title="IIEC API", version="1.0.0")

@app.on_event("startup")
def on_startup():
    # models.Base.metadata.drop_all(bind=engine) # For primary DB
    models.Base.metadata.create_all(bind=engine)  # For primary DB
    # models.BaseHistory.metadata.drop_all(bind = engine_history)
    models.BaseHistory.metadata.create_all(
        bind=engine_history)  # For history DB

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(products.router)
app.include_router(projects.router)
app.include_router(events.router)
app.include_router(orders.router)  # Include the new orders router

# Add a root endpoint for testing
@app.get("/")
def read_root():
    return {"message": "IIEC API is running!"}

# This is important for Vercel
# Vercel will look for 'app' variable