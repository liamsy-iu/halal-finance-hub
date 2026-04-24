"""Stock screening criteria models"""
from sqlalchemy import Column, Integer, String, Text, Numeric
from app.database import Base

class ScreeningCriteria(Base):
    __tablename__ = "screening_criteria"
    
    id = Column(Integer, primary_key=True, index=True)
    criterion_name = Column(String)
    category = Column(String)  # business, financial, etc.
    description = Column(Text)
    threshold_value = Column(Numeric(5, 2))
    methodology = Column(String)  # AAOIFI, Dow Jones, etc.
    is_active = Column(Integer, default=True)
