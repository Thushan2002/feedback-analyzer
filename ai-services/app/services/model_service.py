# app/services/model_service.py

from transformers import pipeline


class ModelService:

    def __init__(self):

        self.model = pipeline(
            "sentiment-analysis",
            model="distilbert-base-uncased-finetuned-sst-2-english"
        )

    def predict(self, text: str):

        result = self.model(text)

        return {
            "label": result[0]["label"],
            "score": result[0]["score"],
            "text": text
        }