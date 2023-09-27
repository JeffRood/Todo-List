from fastapi import APIRouter
from models.product import ProductModel, CreateProduct
from services.product import ProductService
from typing import List

router = APIRouter(
    prefix="/products",
    tags=["product"]
)

@router.post("/create", response_model=CreateProduct)
async def create_product(product: CreateProduct):
    return await ProductService().create_product(product)

@router.get("/{product_id}", response_model=ProductModel)
async def read_product(product_id: int):
    return await ProductService().read_product(product_id)

@router.get("", response_model=List[ProductModel])
async def read_products(skip: int = 0, limit: int = 10):
    return await ProductService().read_products(skip, limit)

@router.put("/{product_id}", response_model=ProductModel)
async def update_product(product_id: int, product: ProductModel):
    return await ProductService().update_product(product_id, product)

@router.delete("/{product_id}")
async def delete_product(product_id: int):
    return await ProductService().delete_product(product_id)