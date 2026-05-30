from sqlalchemy import Column, Integer, String, Float, Date
from app.core.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id               = Column(Integer, primary_key=True, index=True)
    # Core investor / fund info (mapped from real CSV columns)
    investor_name    = Column(String, index=True)       # INV_NAME
    pan_number       = Column(String, index=True)       # PAN
    mutual_fund      = Column(String, index=True)       # SCHEME
    amc_code         = Column(String, nullable=True)    # AMC_CODE
    folio_no         = Column(String, nullable=True)    # FOLIO_NO
    scheme_type      = Column(String, nullable=True)    # SCHEME_TYPE
    location         = Column(String, nullable=True)    # LOCATION
    tax_status       = Column(String, nullable=True)    # TAX_STATUS
    # Transaction data
    transaction_date = Column(Date, index=True)         # TRADDATE
    amount           = Column(Float)                    # AMOUNT
    nav              = Column(Float)                    # PURPRICE
    units            = Column(Float)                    # UNITS
