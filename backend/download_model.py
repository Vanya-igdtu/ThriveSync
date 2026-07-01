from pathlib import Path
import urllib.request
import os

BASE_DIR = Path(__file__).resolve().parents[1]
MODELS_DIR = BASE_DIR / "models"
MODELS_DIR.mkdir(exist_ok=True)

MODEL_PATH = MODELS_DIR / "wellbeing_model.pkl"

# Replace this with your GitHub Release Asset URL
MODEL_URL = "https://github.com/Vanya-igdtu/ThriveSync/releases/download/v1.0/wellbeing_model.pkl"

if MODEL_PATH.exists():
    print("wellbeing_model.pkl already exists.")
else:
    print("Downloading wellbeing_model.pkl...")
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
    print("Download complete.")