import shap
import numpy as np

class ShapService:

    def __init__(
        self,
        burnout_pipeline
    ):
        self.pipeline = burnout_pipeline

        self.preprocessor = burnout_pipeline.named_steps[
            "preprocessor"
        ]

        self.model = burnout_pipeline.named_steps[
            "model"
        ]

        self.feature_names = (
            self.preprocessor.get_feature_names_out()
        )

        self.explainer = shap.TreeExplainer(
            self.model
        )

    def explain(self,df):
        X_transformed = self.preprocessor.transform(
            df
        )

        shap_values = self.explainer.shap_values(
            X_transformed
        )

        return shap_values, X_transformed
    
    def get_top_features(self,df,top_n=5):
        shap_values, X_transformed = self.explain(df)

        prediction = self.model.predict(
            X_transformed
        )[0]

        class_index = list(
            self.model.classes_
        ).index(
            prediction
        )

        values = shap_values[
            0,
            :,
            class_index
        ]

        feature_impacts = []

        for feature, impact in zip(
            self.feature_names,
            values
        ):
            feature_impacts.append(
                {
                    "feature": self.clean_feature_name(
                    feature
                    ),
                    "impact": round(
                        float(impact),
                        4
                    ),
                    "direction": (
                        "increased risk"
                        if impact > 0
                        else "decreased risk"
                    )
                }
            )

        feature_impacts = sorted(
            feature_impacts,
            key=lambda x: abs(x["impact"]),
            reverse=True
        )

        return feature_impacts[:top_n]
    

    def clean_feature_name(self,feature):
        feature = feature.replace(
            "num__",
            ""
        )

        feature = feature.replace(
            "cat__",
            ""
        )

        feature = feature.replace(
            "_",
            " "
        )

        return feature