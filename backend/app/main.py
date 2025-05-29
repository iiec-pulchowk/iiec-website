from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from . import models
from .routers import users, products, projects


app = FastAPI(title="IIEC API", version="1.0.0")


@app.on_event("startup")
def on_startup():
    # models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)


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
