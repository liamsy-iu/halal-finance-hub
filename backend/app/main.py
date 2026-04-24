"""Halal Finance Hub API"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from dotenv import load_dotenv
from app.routers import screening, products, sukuk
import os

load_dotenv()

app = FastAPI(
    title="Halal Finance Hub API",
    description="Educational platform for Islamic finance products and ethical screening",
    version="1.0.0",
    root_path="",
)

# Trust proxy headers for HTTPS
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])

# CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(screening.router)
app.include_router(products.router)
app.include_router(sukuk.router)

@app.get("/")
async def root():
    return {
        "message": "Halal Finance Hub API",
        "version": "1.0.0",
        "endpoints": {
            "screening": "/screening",
            "products": "/products",
            "sukuk": "/sukuk"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
