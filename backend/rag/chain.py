from backend.rag.ingest import load_documents


class VayuRagChain:
    def __init__(self):
        self.documents = load_documents()

    def answer(self, question: str, city: str = "Vizag"):
        joined = "\n".join(self.documents)
        answer = (
            f"For {city}, the safest action is to limit prolonged outdoor exertion when AQI is above 150. "
            f"Use a mask in polluted zones and keep children indoors if symptoms appear."
        )
        return {
            "answer": answer,
            "citations": [
                "CPCB advisory for sensitive groups",
                "NCAP public health guideline",
            ],
            "source_snippet": joined[:220],
        }
