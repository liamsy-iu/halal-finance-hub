"""Sukuk models"""
from sqlalchemy import Column, Integer, String, Text, Numeric, Date
from app.database import Base

class Sukuk(Base):
    __tablename__ = "sukuk"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    issuer = Column(String)
    structure_type = Column(String)  # ijara, murabaha, musharaka, etc.
    issue_size = Column(Numeric(15, 2))
    currency = Column(String)
    maturity_date = Column(Date)
    profit_rate = Column(Numeric(5, 2))
    underlying_asset = Column(Text)
    shariah_advisor = Column(String)
    description = Column(Text)
