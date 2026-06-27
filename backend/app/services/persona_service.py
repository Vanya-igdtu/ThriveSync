from pathlib import Path
import joblib
import pandas as pd

from app.config.persona_features import PERSONA_FEATURES


BASE_DIR = Path(__file__).resolve().parents[3]

MODELS_DIR = BASE_DIR / "models"


class PersonaService:

    def __init__(self):

        self.model = joblib.load(
            MODELS_DIR / "persona_model.pkl"
        )

        self.scaler = joblib.load(
            MODELS_DIR / "persona_scaler.pkl"
        )

        self.persona_names = joblib.load(
            MODELS_DIR / "persona_names.pkl"
        )

    def predict(self, user_data):

        X = pd.DataFrame(
            [[user_data[col] for col in PERSONA_FEATURES]],
            columns=PERSONA_FEATURES
        )

        X_scaled = self.scaler.transform(X)

        cluster = self.model.predict(X_scaled)[0]

        return {
            "persona_id": int(cluster),
            "persona": self.persona_names[cluster]
        }


persona_service = PersonaService()
