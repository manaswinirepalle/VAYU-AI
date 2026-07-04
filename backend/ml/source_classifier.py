class SourceClassifier:
    def classify(self, aqi: int, city: str = "Vizag"):
        if aqi > 220:
            return {
                "primary": "Industry",
                "confidence": 0.81,
                "explanation": "Dense traffic and port-linked industrial activity are elevating particulate exposure.",
            }
        if aqi > 150:
            return {
                "primary": "Vehicles",
                "confidence": 0.74,
                "explanation": "Vehicle exhaust and congestion are the dominant source in this neighbourhood.",
            }
        return {
            "primary": "Dust",
            "confidence": 0.62,
            "explanation": "Residual dust and construction are the most visible contributors.",
        }
