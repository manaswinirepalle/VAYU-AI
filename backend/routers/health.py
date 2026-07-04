from fastapi import APIRouter

router = APIRouter()


@router.get("/lung-age")
def calculate_lung_age(age: int = 28, location: str = "Gajuwaka", hours_outdoors: float = 2.0):
    exposure_days = 14
    lung_age = age + int(exposure_days * 0.3) + int(hours_outdoors * 0.8)
    return {
        "age": age,
        "location": location,
        "hours_outdoors": hours_outdoors,
        "lung_age": lung_age,
        "message": "Your lungs are ageing faster than normal this month.",
        "who_comparison": "Above WHO exposure comfort threshold for sensitive groups",
    }
