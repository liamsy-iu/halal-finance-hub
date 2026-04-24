"""Islamic Finance Product models"""
from sqlalchemy import Column, Integer, String, Text, Boolean, ARRAY
from app.database import Base

class FinanceProduct(Base):
    __tablename__ = "finance_products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)  # murabaha, ijara, musharaka, etc.
    description = Column(Text)
    shariah_basis = Column(Text)
    risk_level = Column(String)
    is_approved = Column(Boolean, default=True)
    features = Column(ARRAY(String))
    scholarly_references = Column(ARRAY(String))
