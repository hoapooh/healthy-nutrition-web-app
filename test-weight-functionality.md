# Weight Functionality Test Guide

## Overview

The weight functionality has been implemented across the product system. Here's what has been added:

## Changes Made

### 1. Cart Types Updated (`src/types/cart.ts`)

- Added `weight` (in grams) and `pricePerKg` fields to `CartItem`
- Updated `AddToCartPayload` and `UpdateCartItemPayload` to include weight information

### 2. Weight Utilities (`src/utils/weight-utils.ts`)

- `formatWeight(grams)` - Converts grams to display format (kg or g)
- `calculatePriceByWeight(pricePerKg, weightInGrams)` - Calculates price based on weight
- `getDefaultWeight(availableWeights)` - Gets default weight (1kg if available, otherwise largest)

### 3. Cart Slice Updated (`src/store/slices/cart-slice.ts`)

- Cart items now support different weights of the same product
- Added `updateCartItemWeight` action for changing weight in cart
- Price automatically recalculates when weight changes

### 4. Product Info Component (`src/features/client/product/ui/components/product-info.tsx`)

- Added weight selection buttons
- Price updates dynamically based on selected weight
- Shows weight in "Add to Cart" confirmation

### 5. Product Card Component (`src/features/client/product/ui/components/product-card.tsx`)

- Automatically uses default weight (1kg if available, otherwise largest)
- Shows price for selected weight
- "Add to Cart" includes weight information

### 6. Cart Item Component (`src/features/client/cart/ui/components/cart-item.tsx`)

- Displays current weight of each item
- Allows changing weight directly in cart
- Price updates automatically when weight changes

## How It Works

### Product Weights

Products now have a `weights` array in grams, e.g., `[300, 500, 1000]` representing 300g, 500g, and 1kg options.

### Pricing

- The `price` field in Product represents the price per 1kg
- Actual price is calculated: `(pricePerKg * weightInGrams) / 1000`
- Example: If price is $20/kg and user selects 500g, final price = $10

### Cart Behavior

- Each weight variant of a product is treated as a separate cart item
- Users can have the same product in different weights in their cart
- Weight can be changed directly in the cart, recalculating the price

## Testing Steps

### 1. Product Detail Page

1. Go to any product detail page
2. You should see weight selection buttons (300g, 500g, 1kg)
3. Select different weights and observe price changes
4. Add to cart with different weights

### 2. Product List Page

1. Products automatically show price for default weight (1kg or largest available)
2. "Add to Cart" adds 1kg (or default) to cart

### 3. Cart Page

1. View cart items - each shows its weight
2. Change weight using the weight selection buttons
3. Price should update automatically
4. Different weights of same product appear as separate items

## Sample Product Data Structure

```json
{
  "id": "prod-1",
  "name": "Whey Protein",
  "price": 50.0, // Price per 1kg
  "weights": [300, 500, 1000], // Available weights in grams
  "imageUrls": ["..."]
  // ... other fields
}
```

## Sample Cart Item Structure

```json
{
  "id": "cart_1234_prod-1_1000",
  "productId": "prod-1",
  "name": "Whey Protein",
  "price": 50.0, // Calculated price for selected weight
  "quantity": 2,
  "weight": 1000, // Selected weight in grams
  "pricePerKg": 50.0 // Base price per kg
  // ... other fields
}
```

This implementation provides a complete weight selection system that integrates seamlessly with the existing cart and product functionality.
