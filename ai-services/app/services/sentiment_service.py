from app.services.model_service import ModelService

class SentimentService:

    def __init__(self):
        self.model_service = ModelService()

    def analyze(self, text: str) -> dict:
        prediction = self.model_service.predict(text)
        return {
            "label": prediction["label"],
            "score": prediction["score"],
            "text": text,
        }
