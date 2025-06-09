import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "postgresql://username:password@localhost/iiec_db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    HISTORY_DATABASE_URL: str = os.getenv(
        "HISTORY_DATABASE_URL", "sqlite:///./history.db"  # Provide a default value
    )

    class Config:
        env_file = ".env"  # Make sure your .env file has HISTORY_DATABASE_URL


settings = Settings()
