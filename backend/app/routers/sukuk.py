"""Sukuk (Islamic Bonds) Endpoints"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import date

router = APIRouter(prefix="/sukuk", tags=["sukuk"])

class SukukStructure(BaseModel):
    id: int
    name: str
    arabic_name: str
    structure_type: str
    description: str
    how_it_works: List[str]
    underlying_asset: str
    shariah_basis: str
    risk_profile: str
    key_features: List[str]
    example_issuances: List[str]

class SukukIssuance(BaseModel):
    id: int
    name: str
    issuer: str
    structure_type: str
    issue_size_usd: float
    currency: str
    issue_date: str
    maturity_date: str
    profit_rate: float
    underlying_asset: str
    shariah_advisor: str
    rating: Optional[str]
    use_of_proceeds: str

# Sukuk Structures Database
SUKUK_STRUCTURES = [
    SukukStructure(
        id=1,
        name="Sukuk Al-Ijara",
        arabic_name="صكوك الإجارة",
        structure_type="Lease-Based",
        description="The most common sukuk structure based on leasing. The issuer sells assets to sukuk holders, then leases them back. Rental payments provide the periodic returns, and assets are bought back at maturity.",
        how_it_works=[
            "Issuer sells assets (real estate, equipment, etc.) to Special Purpose Vehicle (SPV)",
            "SPV issues sukuk certificates representing ownership in the assets",
            "Investors buy sukuk certificates, becoming co-owners of the assets",
            "Issuer leases back the assets from SPV and pays rental",
            "Rental income is distributed to sukuk holders as periodic returns",
            "At maturity, issuer buys back assets at predetermined price"
        ],
        underlying_asset="Tangible assets like real estate, aircraft, equipment, infrastructure",
        shariah_basis="Based on Ijara (leasing) contract. Permissible as long as assets are Shariah-compliant and lease terms are clearly defined. Cannot lease gold, silver, or currencies.",
        risk_profile="Low to Medium - secured by tangible assets",
        key_features=[
            "Asset-backed with true sale requirement",
            "Ownership of assets transfers to investors",
            "Rental income provides returns",
            "Purchase undertaking at maturity",
            "Most widely used sukuk structure globally"
        ],
        example_issuances=[
            "Malaysia's sovereign Ijara sukuk programs",
            "Dubai's Nakheel sukuk (pre-2009 restructuring)",
            "Saudi Arabia government Ijara sukuk",
            "Islamic Development Bank Ijara sukuk"
        ]
    ),
    SukukStructure(
        id=2,
        name="Sukuk Al-Murabaha",
        arabic_name="صكوك المرابحة",
        structure_type="Trade-Based",
        description="Based on cost-plus-profit sale. The issuer purchases commodities and sells them to investors at cost plus markup, with deferred payment. Less common for long-term issuances.",
        how_it_works=[
            "SPV purchases commodities from supplier",
            "SPV sells commodities to issuer at cost plus profit margin",
            "Payment is deferred and paid in installments",
            "Sukuk certificates represent receivables from this sale",
            "Investors receive periodic payments from issuer's installments",
            "Structure typically used for short-term financing"
        ],
        underlying_asset="Commodities (metals, oil, agricultural products)",
        shariah_basis="Based on Murabaha (cost-plus sale) contract. The Prophet (ﷺ) approved trade with disclosed profit margins. Asset must exist and be owned before resale.",
        risk_profile="Low to Medium - backed by commodity trade receivables",
        key_features=[
            "Short to medium-term maturity",
            "Fixed returns known upfront",
            "Represents debt obligation after initial sale",
            "Commodity trade must be genuine",
            "Less flexible for long-term financing"
        ],
        example_issuances=[
            "Bahrain government Murabaha sukuk",
            "Some corporate working capital sukuk",
            "Short-term liquidity management instruments"
        ]
    ),
    SukukStructure(
        id=3,
        name="Sukuk Al-Musharaka",
        arabic_name="صكوك المشاركة",
        structure_type="Partnership-Based",
        description="Based on partnership where sukuk holders and issuer jointly own project assets. Profits distributed according to agreed ratio, losses by capital contribution.",
        how_it_works=[
            "Issuer and SPV form partnership (Musharaka) for specific project",
            "Both parties contribute capital to the partnership",
            "Sukuk certificates represent ownership shares in partnership",
            "Partnership undertakes business activity or project",
            "Profits distributed according to pre-agreed ratio",
            "Losses shared according to capital contribution",
            "Diminishing Musharaka: issuer gradually buys out investors' share"
        ],
        underlying_asset="Partnership assets - projects, real estate development, business ventures",
        shariah_basis="Based on Shirkah/Musharaka (partnership). Companions of the Prophet (ﷺ) practiced partnerships. Profits shared by agreement, losses by capital ratio.",
        risk_profile="Medium to High - true equity participation",
        key_features=[
            "Equity-based structure with profit/loss sharing",
            "Returns not guaranteed - depend on project performance",
            "Active or passive partnership allowed",
            "Diminishing Musharaka common for asset acquisition",
            "More Shariah-compliant but less predictable returns"
        ],
        example_issuances=[
            "Pakistan International Sukuk (Musharaka/Ijara hybrid)",
            "Real estate development Musharaka sukuk",
            "Infrastructure project partnership sukuk"
        ]
    ),
    SukukStructure(
        id=4,
        name="Sukuk Al-Mudarabah",
        arabic_name="صكوك المضاربة",
        structure_type="Partnership-Based",
        description="Based on profit-sharing partnership where investors provide capital (Rabb al-Mal) and issuer provides management expertise (Mudarib). Profits shared by ratio, losses borne by investors unless due to negligence.",
        how_it_works=[
            "Investors provide capital to SPV (Rabb al-Mal/capital provider)",
            "Issuer manages capital as Mudarib (entrepreneur/manager)",
            "Sukuk certificates represent ownership in Mudarabah capital",
            "Mudarib invests capital in Shariah-compliant business",
            "Profits distributed according to pre-agreed ratio",
            "Losses borne entirely by investors (unless Mudarib negligent)",
            "Mudarib receives profit share only, no guaranteed fee"
        ],
        underlying_asset="Mudarabah investment portfolio - businesses, projects, assets managed by Mudarib",
        shariah_basis="Based on Mudarabah contract practiced by Companions. Capital provider bears loss, manager provides expertise. Both share profits by agreement.",
        risk_profile="Medium to High - equity-like returns, investors bear losses",
        key_features=[
            "True profit-sharing structure",
            "Manager has no capital contribution",
            "Investors are passive, manager is active",
            "Returns depend on business performance",
            "Manager liable only for negligence or misconduct"
        ],
        example_issuances=[
            "Islamic banking Mudarabah deposit certificates",
            "Investment fund Mudarabah sukuk",
            "Project finance Mudarabah structures"
        ]
    ),
    SukukStructure(
        id=5,
        name="Sukuk Al-Salam",
        arabic_name="صكوك السلم",
        structure_type="Trade-Based",
        description="Based on forward sale where payment is made upfront for goods delivered later. Used mainly for agricultural and commodity financing.",
        how_it_works=[
            "SPV collects funds from sukuk investors",
            "SPV enters Salam contract with issuer (farmer/producer)",
            "SPV pays full price upfront for future delivery of commodities",
            "Issuer commits to deliver specified goods at future date",
            "At maturity, issuer delivers commodities to SPV",
            "SPV sells commodities in market and returns capital plus profit to investors"
        ],
        underlying_asset="Agricultural products, commodities (wheat, dates, oil, metals)",
        shariah_basis="Specifically permitted by Prophet (ﷺ): 'Whoever pays in advance for dates should pay for known measure, known weight, for known period' (Bukhari).",
        risk_profile="Medium - commodity price risk and delivery risk",
        key_features=[
            "Full payment at contract inception",
            "Delivery at specified future date",
            "Commodity must be clearly specified",
            "Cannot be gold, silver, or currencies",
            "Parallel Salam allowed for risk mitigation"
        ],
        example_issuances=[
            "Bahrain government Salam sukuk (historical)",
            "Agricultural sector financing sukuk",
            "Commodity producers' sukuk"
        ]
    ),
    SukukStructure(
        id=6,
        name="Sukuk Al-Istisna'",
        arabic_name="صكوك الاستصناع",
        structure_type="Trade-Based",
        description="Based on manufacturing/construction contract where sukuk proceeds finance construction or manufacturing of specified asset. Buyer pays manufacturer to construct specific item according to specifications.",
        how_it_works=[
            "SPV issues sukuk to raise funds from investors",
            "SPV enters Istisna' contract with contractor to build asset",
            "Contractor builds/manufactures asset per specifications",
            "Payments made in installments as construction progresses",
            "Upon completion, asset sold or leased to generate returns",
            "Investors receive returns from asset sale or lease income"
        ],
        underlying_asset="Assets under construction - buildings, infrastructure, aircraft, ships",
        shariah_basis="Approved by Hanafi school and later accepted by others. Based on commissioned manufacturing contract serving genuine economic needs.",
        risk_profile="Medium to High - construction/delivery risk",
        key_features=[
            "Used for infrastructure and manufacturing",
            "Specifications must be clearly defined",
            "Flexible payment terms",
            "Parallel Istisna' permitted",
            "Construction risk borne by manufacturer"
        ],
        example_issuances=[
            "Infrastructure development sukuk",
            "Real estate construction sukuk",
            "Aircraft manufacturing sukuk",
            "Port and highway construction sukuk"
        ]
    ),
    SukukStructure(
        id=7,
        name="Sukuk Al-Wakala",
        arabic_name="صكوك الوكالة",
        structure_type="Agency-Based",
        description="Based on agency contract where issuer acts as agent (Wakeel) to invest sukuk proceeds on behalf of investors. Agent receives fee and may guarantee returns.",
        how_it_works=[
            "Investors appoint issuer as agent (Wakeel) via SPV",
            "Issuer receives sukuk proceeds to invest in Shariah-compliant assets",
            "Agent invests funds according to agreed investment strategy",
            "Investment returns distributed to sukuk holders",
            "Agent receives agency fee (fixed or performance-based)",
            "Issuer may provide purchase undertaking or guarantee"
        ],
        underlying_asset="Diversified investment portfolio managed by agent",
        shariah_basis="Based on Wakalah (agency) contract. Prophet (ﷺ) appointed agents for various tasks, establishing validity of representation.",
        risk_profile="Low to High - depends on underlying investments",
        key_features=[
            "Flexible investment mandate",
            "Agent accountability to investors",
            "Can combine with other structures",
            "Popular for hybrid sukuk",
            "May include guarantees or purchase undertakings"
        ],
        example_issuances=[
            "GCC sovereign Wakala sukuk",
            "Corporate Wakala sukuk with guarantees",
            "Hybrid Wakala-Ijara structures"
        ]
    ),
    SukukStructure(
        id=8,
        name="Hybrid Sukuk",
        arabic_name="الصكوك المختلطة",
        structure_type="Multi-Contract",
        description="Combines multiple Islamic contracts (Ijara, Wakala, Musharaka, etc.) in single sukuk structure to achieve specific financing objectives and risk profiles.",
        how_it_works=[
            "Structure incorporates multiple Shariah contracts",
            "Each contract serves specific purpose in overall structure",
            "Common combinations: Ijara-Wakala, Musharaka-Ijara",
            "Allows customization for specific needs",
            "Provides flexibility in asset allocation and returns",
            "Must ensure all underlying contracts are Shariah-compliant"
        ],
        underlying_asset="Mixed assets - combination of leased assets, partnership assets, managed funds",
        shariah_basis="Each component contract must individually comply with Shariah. Overall structure must not violate Islamic principles through combination.",
        risk_profile="Varies - depends on component contracts and asset mix",
        key_features=[
            "Greater structural flexibility",
            "Can optimize risk-return profile",
            "Allows diverse asset backing",
            "More complex Shariah compliance review",
            "Commonly used by sophisticated issuers"
        ],
        example_issuances=[
            "Saudi Arabia sovereign sukuk (Wakala-Murabaha hybrid)",
            "Malaysia's diverse hybrid sukuk programs",
            "Corporate multi-asset sukuk"
        ]
    )
]

# Sample Sukuk Issuances
SUKUK_ISSUANCES = [
    SukukIssuance(
        id=1,
        name="Saudi Arabia Sovereign Sukuk",
        issuer="Kingdom of Saudi Arabia",
        structure_type="Wakala",
        issue_size_usd=2500000000,
        currency="USD",
        issue_date="2024-01-15",
        maturity_date="2029-01-15",
        profit_rate=5.25,
        underlying_asset="Diversified government assets",
        shariah_advisor="Multiple international Shariah boards",
        rating="A1 (Moody's)",
        use_of_proceeds="General government expenditure and infrastructure development"
    ),
    SukukIssuance(
        id=2,
        name="IDB Trust Services Sukuk",
        issuer="Islamic Development Bank",
        structure_type="Ijara",
        issue_size_usd=1500000000,
        currency="USD",
        issue_date="2023-09-20",
        maturity_date="2028-09-20",
        profit_rate=4.85,
        underlying_asset="IDB-owned real estate and equipment",
        shariah_advisor="IDB Shariah Board",
        rating="AAA (S&P)",
        use_of_proceeds="Development projects in member countries"
    ),
    SukukIssuance(
        id=3,
        name="Malaysia Sovereign Sukuk",
        issuer="Government of Malaysia",
        structure_type="Ijara-Wakala Hybrid",
        issue_size_usd=1000000000,
        currency="MYR",
        issue_date="2024-03-10",
        maturity_date="2034-03-10",
        profit_rate=4.50,
        underlying_asset="Government assets and infrastructure",
        shariah_advisor="Securities Commission Malaysia Shariah Advisory Council",
        rating="A3 (Moody's)",
        use_of_proceeds="Infrastructure development and fiscal management"
    )
]

@router.get("/structures", response_model=List[SukukStructure])
async def get_sukuk_structures():
    """Get all sukuk structures"""
    return SUKUK_STRUCTURES

@router.get("/structures/{structure_id}", response_model=SukukStructure)
async def get_sukuk_structure(structure_id: int):
    """Get specific sukuk structure by ID"""
    structure = next((s for s in SUKUK_STRUCTURES if s.id == structure_id), None)
    if not structure:
        raise HTTPException(status_code=404, detail="Sukuk structure not found")
    return structure

@router.get("/issuances", response_model=List[SukukIssuance])
async def get_sukuk_issuances():
    """Get sample sukuk issuances"""
    return SUKUK_ISSUANCES

@router.get("/types")
async def get_sukuk_types():
    """Get all sukuk types"""
    types = list(set(s.structure_type for s in SUKUK_STRUCTURES))
    return {"types": types}
