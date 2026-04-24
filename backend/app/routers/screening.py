"""AAOIFI Stock Screening Endpoints"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/screening", tags=["screening"])

class ScreeningRequest(BaseModel):
    ticker: str

class CriteriaResult(BaseModel):
    name: str
    value: float
    threshold: float
    passed: bool
    description: str

class ScreeningResult(BaseModel):
    ticker: str
    company_name: str
    is_compliant: bool
    overall_status: str
    criteria: list[CriteriaResult]
    
# Mock financial data (replace with real API later)
MOCK_DATA = {
    "AAPL": {
        "name": "Apple Inc.",
        "total_assets": 352755000000,
        "total_debt": 111088000000,
        "cash": 62639000000,
        "revenue": 394328000000,
        "interest_income": 3750000000,
        "impermissible_income": 1200000000,
    },
    "MSFT": {
        "name": "Microsoft Corporation",
        "total_assets": 411976000000,
        "total_debt": 79404000000,
        "cash": 104757000000,
        "revenue": 211915000000,
        "interest_income": 2585000000,
        "impermissible_income": 800000000,
    },
    "TSLA": {
        "name": "Tesla Inc.",
        "total_assets": 106618000000,
        "total_debt": 9574000000,
        "cash": 22185000000,
        "revenue": 96773000000,
        "interest_income": 156000000,
        "impermissible_income": 50000000,
    }
}

def calculate_aaoifi_compliance(ticker: str):
    """Calculate AAOIFI Shariah compliance"""
    
    if ticker.upper() not in MOCK_DATA:
        raise HTTPException(status_code=404, detail=f"Stock {ticker} not found")
    
    data = MOCK_DATA[ticker.upper()]
    
    # AAOIFI Criteria:
    # 1. Total Debt / Market Cap or Total Assets < 33%
    # 2. Interest Income / Total Income < 5%
    # 3. Impermissible Income / Total Income < 5%
    
    # Calculate ratios
    debt_ratio = (data["total_debt"] / data["total_assets"]) * 100
    interest_ratio = (data["interest_income"] / data["revenue"]) * 100
    impermissible_ratio = (data["impermissible_income"] / data["revenue"]) * 100
    
    criteria = [
        CriteriaResult(
            name="Debt Ratio",
            value=round(debt_ratio, 2),
            threshold=33.0,
            passed=debt_ratio < 33,
            description="Total debt must be less than 33% of total assets"
        ),
        CriteriaResult(
            name="Interest Income Ratio",
            value=round(interest_ratio, 2),
            threshold=5.0,
            passed=interest_ratio < 5,
            description="Interest-based income must be less than 5% of total revenue"
        ),
        CriteriaResult(
            name="Impermissible Revenue Ratio",
            value=round(impermissible_ratio, 2),
            threshold=5.0,
            passed=impermissible_ratio < 5,
            description="Income from prohibited activities must be less than 5% of total revenue"
        ),
    ]
    
    all_passed = all(c.passed for c in criteria)
    
    return ScreeningResult(
        ticker=ticker.upper(),
        company_name=data["name"],
        is_compliant=all_passed,
        overall_status="✅ Halal - Compliant" if all_passed else "❌ Not Compliant",
        criteria=criteria
    )

@router.post("/screen", response_model=ScreeningResult)
async def screen_stock(request: ScreeningRequest):
    """Screen a stock against AAOIFI Shariah compliance criteria"""
    return calculate_aaoifi_compliance(request.ticker)

@router.get("/")
async def screening_info():
    """Get information about AAOIFI screening methodology"""
    return {
        "methodology": "AAOIFI Shariah Standards",
        "criteria": [
            {
                "name": "Debt Ratio",
                "threshold": "< 33%",
                "description": "Total debt must be less than 33% of total assets"
            },
            {
                "name": "Interest Income",
                "threshold": "< 5%",
                "description": "Interest-based income must be less than 5% of total revenue"
            },
            {
                "name": "Impermissible Revenue",
                "threshold": "< 5%",
                "description": "Income from prohibited activities must be less than 5% of total revenue"
            }
        ],
        "supported_stocks": ["AAPL", "MSFT", "TSLA"]
    }
