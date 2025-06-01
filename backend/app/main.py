from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, engine_history  # Import engine_history
from . import models
from .routers import users, products, projects, events, orders  # Import orders router


app = FastAPI(title="IIEC API", version="1.0.0")


@app.on_event("startup")
def on_startup():
    # models.Base.metadata.drop_all(bind=engine) # For primary DB
    models.Base.metadata.create_all(bind=engine)  # For primary DB
    models.BaseHistory.metadata.drop_all(bind = engine_history)
    # models.BaseHistory.metadata.drop_all(bind=engine_history) # For history DB
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
