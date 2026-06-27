class RecommendationService:

    @staticmethod
    def generate(
        burnout_prediction,
        wellbeing_score,
        persona
    ):

        recommendations = []

        if burnout_prediction == "High Risk":
            recommendations.append(
                "Take a 5-10 minute break after every hour of work."
            )

        if wellbeing_score < 60:
            recommendations.append(
                "Aim for at least 7 hours of sleep daily."
            )

        if persona == "Burnout-Prone Doomscroller":
            recommendations.append(
                "Reduce late-night social media scrolling."
            )

        if persona == "Balanced Achiever":
            recommendations.append(
                "Maintain your current balance and healthy routines."
            )

        if len(recommendations) == 0:
            recommendations.append(
                "Keep maintaining your healthy digital habits."
            )

        return recommendations