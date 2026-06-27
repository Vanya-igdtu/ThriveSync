from app.services.persona_service import persona_service

sample = {
    "Daily_Social_Media_Hours": 7,
    "Screen_Time_Hours": 10,
    "Night_Scrolling_Frequency": 8,
    "Online_Gaming_Hours": 2,
    "Exercise_Frequency_per_Week": 1,
    "Daily_Sleep_Hours": 5,
    "Study_Work_Hours_per_Day": 9,
    "Anxiety_Score": 8,
    "Motivation_Level": 4
}

print(persona_service.predict(sample))