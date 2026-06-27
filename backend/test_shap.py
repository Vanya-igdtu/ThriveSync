import joblib
import pandas as pd

from app.services.shap_service import ShapService


# Load pipeline
burnout_pipeline = joblib.load(
    "../models/burnout_model.pkl"
)

# Create service
shap_service = ShapService(
    burnout_pipeline
)

# Load dataset
df = pd.read_csv(
    "../data/genz_mental_wellness_synthetic_dataset.csv"
)

# Burnout model features
X_burnout = df.drop(
    ["Burnout_Risk", "Wellbeing_Index"],
    axis=1
)

# Take one sample
sample_df = X_burnout.iloc[[0]]

print("INPUT SAMPLE")
print(sample_df.head())

print("\nTOP FEATURES\n")

print(
    burnout_pipeline.named_steps["model"].classes_
)

top_features = shap_service.get_top_features(
    sample_df,
    top_n=5
)

for feature in top_features:
    print(feature)

