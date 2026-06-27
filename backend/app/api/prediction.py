import pandas as pd

from fastapi import APIRouter
from app.config.persona_features import PERSONA_FEATURES
from app.schemas.request import AssessmentRequest
from app.schemas.response import PredictionResponse

from app.services.model_service import ModelService
from app.services.recommendation_service import RecommendationService
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.crud import save_prediction
from typing import List

from app.database.crud import (
    save_prediction,
    get_prediction_history
)

from app.schemas.history import HistoryResponse



router = APIRouter()

@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(
    data: AssessmentRequest,
    db: Session = Depends(get_db)
):
    
    df = pd.DataFrame(
        [data.model_dump()]
    )

    burnout_explanation = (
        ModelService
        .shap_service
        .get_top_features(
            df,
            top_n=5
        )
    )
    burnout_pred = (
        ModelService
        .burnout_model
        .predict(df)[0]
    )

    burnout_prob = (
        ModelService
        .burnout_model
        .predict_proba(df)[0]
        .max()
    )

    wellbeing_score = (
        ModelService
        .wellbeing_model
        .predict(df)[0]
    )

    persona_df = df[PERSONA_FEATURES]

    persona_scaled = (
        ModelService
        .persona_scaler
        .transform(persona_df)
    )

    persona_id = (
        ModelService
        .persona_model
        .predict(persona_scaled)[0]
    )

    persona_name = (
        ModelService
        .persona_names[persona_id]
    )

    recommendations = (
        RecommendationService.generate(
            burnout_prediction=str(burnout_pred),
            wellbeing_score=float(wellbeing_score),
            persona=persona_name
        )
    )

    save_prediction(
        db=db,
        burnout_prediction=str(burnout_pred),
        burnout_probability=float(burnout_prob),
        wellbeing_score=float(wellbeing_score),
        persona_id=int(persona_id),
        persona=persona_name
    )

    return PredictionResponse(
        burnout_prediction=str(burnout_pred),
        burnout_probability=float(burnout_prob),
        wellbeing_score=float(wellbeing_score),
        persona_id=int(persona_id),
        persona=persona_name,
        recommendations=recommendations,
        burnout_explanation=
        burnout_explanation
    )

@router.get(
    "/history",
    response_model=list[HistoryResponse]
)
def get_history(
    db: Session = Depends(get_db)
):

    return get_prediction_history(db)