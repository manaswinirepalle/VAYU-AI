from pathlib import Path


def load_documents():
    base = Path(__file__).resolve().parent.parent / "data" / "ncap_cpcb_docs"
    docs = []
    for path in base.glob("**/*"):
        if path.is_file() and path.suffix.lower() in {".txt", ".md", ".pdf"}:
            docs.append(path.read_text(encoding="utf-8", errors="ignore"))
    if not docs:
        docs.append("CPCB advisories recommend limiting outdoor exertion when AQI exceeds 150 for sensitive groups.")
    return docs
