import joblib
from pathlib import Path
from app.services.shap_service import ShapService
BASE_DIR = Path(__file__).resolve().parents[3]

MODELS_DIR = BASE_DIR / "models"


class ModelService:

    burnout_model = None
    wellbeing_model = None
    persona_model = None
    persona_scaler = None
    persona_names = None
    shap_service = None

    @classmethod
    def load_models(cls):

        cls.burnout_model = joblib.load(
            MODELS_DIR / "burnout_model.pkl"
        )

        cls.shap_service = ShapService(
            cls.burnout_model
        )
        
        cls.wellbeing_model = joblib.load(
            MODELS_DIR / "wellbeing_model.pkl"
        )

        cls.persona_model = joblib.load(
            MODELS_DIR / "persona_model.pkl"
        )

        cls.persona_scaler = joblib.load(
            MODELS_DIR / "persona_scaler.pkl"
        )

        cls.persona_names = joblib.load(
            MODELS_DIR / "persona_names.pkl"
        )

        print("✅ All ML models loaded successfully!")