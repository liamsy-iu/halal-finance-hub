"""Islamic Finance Products Endpoints"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/products", tags=["products"])

class Product(BaseModel):
    id: int
    name: str
    arabic_name: str
    category: str
    description: str
    shariah_basis: str
    key_features: List[str]
    use_cases: List[str]
    risk_level: str
    scholarly_references: List[str]

# Islamic Finance Products Database
PRODUCTS = [
    Product(
        id=1,
        name="Murabaha",
        arabic_name="مرابحة",
        category="Trade-Based",
        description="A cost-plus financing structure where the bank purchases an asset and sells it to the client at cost plus an agreed profit margin. The client pays in installments over an agreed period.",
        shariah_basis="Based on the principle of Bay' (trade). Allah says: 'Allah has permitted trade and forbidden riba' (Quran 2:275). The Prophet (ﷺ) approved profit-based trade transactions.",
        key_features=[
            "Asset-based financing with actual ownership transfer",
            "Fixed profit margin disclosed upfront",
            "No interest - profit comes from trade markup",
            "Payment in installments allowed",
            "Asset must exist and be owned by seller before sale"
        ],
        use_cases=[
            "Home financing (Islamic mortgages)",
            "Vehicle financing",
            "Business equipment purchases",
            "Working capital for inventory"
        ],
        risk_level="Low to Medium",
        scholarly_references=[
            "AAOIFI Shariah Standard No. 8 on Murabaha",
            "Majallat al-Ahkam al-Adliyyah (Ottoman Civil Code)",
            "Contemporary fatwas by AAOIFI and OIC Fiqh Academy"
        ]
    ),
    Product(
        id=2,
        name="Ijara",
        arabic_name="إجارة",
        category="Lease-Based",
        description="An Islamic lease agreement where the bank purchases an asset and leases it to the client for an agreed rental payment. Ownership can transfer at the end (Ijara wa Iqtina) or remain with the lessor.",
        shariah_basis="Based on the principle of leasing (Ijara). The Prophet (ﷺ) said: 'Muslims are bound by their conditions.' Leasing is a well-established contract in Islamic jurisprudence.",
        key_features=[
            "Asset ownership remains with lessor during lease period",
            "Rental payments based on usufruct (right to use)",
            "Lessor bears ownership risks (major repairs)",
            "Lessee bears usage risks (maintenance)",
            "Can include purchase option at end (Ijara Muntahia Bittamleek)"
        ],
        use_cases=[
            "Property leasing (residential/commercial)",
            "Equipment leasing for businesses",
            "Aircraft and shipping finance",
            "Infrastructure project financing"
        ],
        risk_level="Low to Medium",
        scholarly_references=[
            "AAOIFI Shariah Standard No. 9 on Ijara",
            "OIC Fiqh Academy Resolution on Ijara Muntahia Bittamleek",
            "Islamic Fiqh texts on leasing contracts"
        ]
    ),
    Product(
        id=3,
        name="Musharaka",
        arabic_name="مشاركة",
        category="Partnership-Based",
        description="A partnership structure where two or more parties contribute capital to a business venture and share profits according to agreed ratios. Losses are shared according to capital contribution.",
        shariah_basis="Based on the principle of Shirkah (partnership). Allah says: 'And indeed, many partners oppress one another, except those who believe and do righteous deeds' (Quran 38:24), acknowledging the validity of partnership.",
        key_features=[
            "All partners contribute capital",
            "Profits shared by agreement, losses by capital ratio",
            "Active or passive participation allowed",
            "Joint ownership of partnership assets",
            "Diminishing Musharaka allows gradual ownership transfer"
        ],
        use_cases=[
            "Joint venture business financing",
            "Real estate development projects",
            "Home financing (Diminishing Musharaka)",
            "Start-up and SME financing"
        ],
        risk_level="Medium to High",
        scholarly_references=[
            "AAOIFI Shariah Standard No. 12 on Sharikah (Musharaka)",
            "Classical fiqh texts on Shirkah",
            "Contemporary banking practice guidelines"
        ]
    ),
    Product(
        id=4,
        name="Mudarabah",
        arabic_name="مضاربة",
        category="Partnership-Based",
        description="A partnership where one party (Rabb al-Mal) provides capital and the other (Mudarib) provides expertise and management. Profits are shared according to agreed ratio, losses borne by capital provider unless due to negligence.",
        shariah_basis="Based on the principle of profit-sharing partnership. The Companions practiced Mudarabah, and classical scholars unanimously accept its validity.",
        key_features=[
            "Capital provider is passive investor",
            "Manager provides expertise and labor",
            "Profits shared by agreement",
            "Losses borne by capital provider (unless negligence)",
            "Manager receives share only from profits"
        ],
        use_cases=[
            "Islamic investment funds",
            "Private equity and venture capital",
            "Islamic banking deposits",
            "Asset management"
        ],
        risk_level="Medium to High",
        scholarly_references=[
            "AAOIFI Shariah Standard No. 13 on Mudarabah",
            "Classical fiqh texts on Mudarabah contracts",
            "Islamic banking industry practice"
        ]
    ),
    Product(
        id=5,
        name="Salam",
        arabic_name="سلم",
        category="Trade-Based",
        description="A forward sale contract where the buyer pays the full price upfront for goods to be delivered at a specified future date. Commonly used in agricultural and commodity financing.",
        shariah_basis="Specifically permitted by the Prophet (ﷺ) who said: 'Whoever pays money in advance for dates should pay it for known specified measure and weight, for a known specified period' (Bukhari).",
        key_features=[
            "Full payment made at contract",
            "Delivery in future at specified date",
            "Commodity must be well-specified",
            "Cannot be used for gold, silver, or currencies",
            "Parallel Salam allowed for risk management"
        ],
        use_cases=[
            "Agricultural financing",
            "Commodity trade financing",
            "Manufacturing pre-orders",
            "Supply chain financing"
        ],
        risk_level="Medium",
        scholarly_references=[
            "AAOIFI Shariah Standard No. 10 on Salam",
            "Hadith on Salam in Sahih Bukhari",
            "Classical fiqh rulings on advance payment sales"
        ]
    ),
    Product(
        id=6,
        name="Istisna'",
        arabic_name="استصناع",
        category="Trade-Based",
        description="A manufacturing or construction contract where a buyer commissions a manufacturer to produce a specific item. Payment can be deferred, in installments, or a combination.",
        shariah_basis="Approved by Hanafi scholars and later adopted by other schools. Based on the principle of commissioned manufacturing, which serves genuine economic needs.",
        key_features=[
            "Used for manufacturing and construction",
            "Specifications must be clearly defined",
            "Flexible payment terms allowed",
            "Parallel Istisna' permitted",
            "Manufacturer bears construction risks"
        ],
        use_cases=[
            "Real estate development",
            "Infrastructure projects",
            "Ship and aircraft building",
            "Custom manufacturing orders"
        ],
        risk_level="Medium to High",
        scholarly_references=[
            "AAOIFI Shariah Standard No. 11 on Istisna'",
            "Hanafi jurisprudence on commissioned manufacturing",
            "OIC Fiqh Academy resolutions"
        ]
    ),
    Product(
        id=7,
        name="Wakalah",
        arabic_name="وكالة",
        category="Service-Based",
        description="An agency or representation contract where one party (principal) appoints another (agent) to act on their behalf. The agent may receive a fixed fee or performance-based compensation.",
        shariah_basis="Based on the concept of representation (Wakalah). The Prophet (ﷺ) appointed agents for various tasks, establishing the validity of agency contracts.",
        key_features=[
            "Agent acts on behalf of principal",
            "Fixed fee or performance fee allowed",
            "Agent must not exceed authority",
            "Principal bears investment risks",
            "Widely used in takaful (Islamic insurance)"
        ],
        use_cases=[
            "Investment management",
            "Takaful (Islamic insurance) operations",
            "Trade facilitation services",
            "Wealth management services"
        ],
        risk_level="Low to Medium",
        scholarly_references=[
            "AAOIFI Shariah Standard No. 23 on Agency",
            "Classical fiqh on Wakalah contracts",
            "Takaful industry standards"
        ]
    ),
    Product(
        id=8,
        name="Qard Hassan",
        arabic_name="قرض حسن",
        category="Benevolent",
        description="A benevolent interest-free loan given to help someone in need. The borrower is only obligated to return the principal amount. Encouraged as an act of charity and social welfare.",
        shariah_basis="Allah says: 'Who will lend to Allah a goodly loan' (Quran 2:245). The Prophet (ﷺ) said: 'Every loan is charity' (Ibn Majah).",
        key_features=[
            "Completely interest-free",
            "No profit or benefit to lender",
            "Used for social welfare purposes",
            "Borrower returns principal only",
            "Encouraged as act of charity"
        ],
        use_cases=[
            "Emergency personal loans",
            "Microfinance for poor",
            "Social welfare programs",
            "Community support initiatives"
        ],
        risk_level="Varies (based on borrower)",
        scholarly_references=[
            "Quranic verses on Qard Hassan",
            "Hadith on virtues of lending",
            "Islamic social finance literature"
        ]
    )
]

@router.get("/", response_model=List[Product])
async def get_all_products():
    """Get all Islamic finance products"""
    return PRODUCTS

@router.get("/categories")
async def get_categories():
    """Get all product categories"""
    categories = list(set(p.category for p in PRODUCTS))
    return {"categories": categories}

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: int):
    """Get a specific product by ID"""
    product = next((p for p in PRODUCTS if p.id == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/category/{category}")
async def get_products_by_category(category: str):
    """Get products by category"""
    products = [p for p in PRODUCTS if p.category.lower() == category.lower()]
    if not products:
        raise HTTPException(status_code=404, detail="Category not found")
    return products
