from pydantic import BaseModel

class AssessmentRequest(BaseModel):

    Age: int
    Gender: str
    Country: str
    Student_Working_Status: str

    Daily_Social_Media_Hours: float
    Screen_Time_Hours: float
    Night_Scrolling_Frequency: float
    Online_Gaming_Hours: float

    Content_Type_Preference: str

    Exercise_Frequency_per_Week: float
    Daily_Sleep_Hours: float
    Caffeine_Intake_Cups: float
    Study_Work_Hours_per_Day: float

    Overthinking_Score: float
    Anxiety_Score: float
    Mood_Stability_Score: float
    Social_Comparison_Index: float
    Sleep_Quality_Score: float
    Motivation_Level: float
    Emotional_Fatigue_Score: float