from app.database.models import PredictionHistory


def save_prediction(
    db,
    burnout_prediction,
    burnout_probability,
    wellbeing_score,
    persona_id,
    persona
):

    record = PredictionHistory(
        burnout_prediction=burnout_prediction,
        burnout_probability=burnout_probability,
        wellbeing_score=wellbeing_score,
        persona_id=persona_id,
        persona=persona
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return record

def get_prediction_history(db):

    return db.query(
        PredictionHistory
    ).order_by(
        PredictionHistory.created_at.desc()
    ).all()