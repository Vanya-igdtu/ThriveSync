from pydantic import BaseModel


class ShapFeature(BaseModel):
    feature: str
    impact: float
    direction: str