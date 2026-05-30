from pydantic import BaseModel
from typing import Optional

class InvestorSummaryResponse(BaseModel):
    investor_name: str
    mutual_fund: str
    total_amount: float
    total_units: float

    model_config = {"from_attributes": True}

class FundSummaryResponse(BaseModel):
    mutual_fund: str
    investor_name: str
    amount: float
    units: float

    model_config = {"from_attributes": True}

class InvestorResponse(BaseModel):
    investor_name: str
    pan_number: str
    total_investment: float

    model_config = {"from_attributes": True}

class MutualFundOverallResponse(BaseModel):
    mutual_fund: str
    total_amount: float
    total_units: float
    average_nav: float

    model_config = {"from_attributes": True}

class HealthResponse(BaseModel):
    status: str
