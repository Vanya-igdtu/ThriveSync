from pydantic import BaseModel
from app.schemas.shap import ShapFeature
class PredictionResponse(BaseModel):
    burnout_prediction: str
    burnout_probability: float
    wellbeing_score: float

    persona_id: int
    persona: str
    recommendations: list[str]
    burnout_explanation: list[ShapFeature]