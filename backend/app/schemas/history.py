from pydantic import BaseModel
from datetime import datetime


class HistoryResponse(BaseModel):

    id: int

    burnout_prediction: str

    burnout_probability: float

    wellbeing_score: float

    persona_id: int

    persona: str

    created_at: datetime

    class Config:
        from_attributes = True