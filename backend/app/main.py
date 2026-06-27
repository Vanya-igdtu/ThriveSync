from fastapi import FastAPI
from app.services.model_service import ModelService
from app.api.prediction import router as prediction_router
from app.database.database import engine
from app.database.models import Base
from fastapi.middleware.cors import CORSMiddleware 
Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    ModelService.load_models()
    print("✅ Models Loaded")
@app.get("/")
def home():
    return {"message": "Backend Running"}

app.include_router(
    prediction_router,
    prefix="/api"
)
