from fastapi import APIRouter
from fastapi.responses import Response

router = APIRouter()


@router.get("/generate")
def generate_report(city: str = "Vizag"):
    pdf_bytes = b"%PDF-1.4\n1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n4 0 obj<< /Length 44 >>stream\nBT /F1 18 Tf 50 100 Td (VAYU.AI report for " + city.encode() + b") Tj ET\nendstream\nendobj\n5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\nxref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000062 00000 n \n0000000119 00000 n \n0000000207 00000 n \n0000000302 00000 n \ntrailer<< /Root 1 0 R /Size 6 >>\nstartxref\n0\n%%EOF"
    return Response(content=pdf_bytes, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename={city.lower()}-report.pdf"})
