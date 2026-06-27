from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.database import Base


class PredictionHistory(Base):

    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)

    burnout_prediction = Column(String)

    burnout_probability = Column(Float)

    wellbeing_score = Column(Float)

    persona_id = Column(Integer)

    persona = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )