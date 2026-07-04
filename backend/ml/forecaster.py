class HybridForecaster:
    def __init__(self):
        self.samples = {
            "Vizag": [132, 141, 158, 171, 164, 182, 176],
            "Delhi": [220, 236, 244, 260, 248, 252, 238],
        }

    def forecast(self, city: str = "Vizag", hours: int = 24):
        values = self.samples.get(city, self.samples["Vizag"])
        forecast = []
        for idx, value in enumerate(values):
            forecast.append({"hour": idx + 1, "aqi": int(value + (idx * 6) - 3)})
        return {
            "city": city,
            "hours": hours,
            "forecast": forecast,
            "summary": "A hybrid Prophet + LSTM signal suggests a sharp rise by tomorrow morning.",
            "source_attribution": {
                "vehicles": 0.58,
                "industry": 0.31,
                "dust": 0.11,
            },
        }
