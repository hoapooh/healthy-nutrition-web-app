"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { productsData } from "@/features/client/home/data/products-data";

const categories = [
  "All",
  ...Array.from(new Set(productsData.map((p) => p.category))),
];
const brands = [
  "All",
  ...Array.from(new Set(productsData.map((p) => p.brand))),
];
const priceOptions = [
  "All",
  "Under 100,000đ",
  "100,000đ – 300,000đ",
  "Over 300,000đ",
];

type SortType = "default" | "priceAsc" | "priceDesc" | "nameAsc" | "nameDesc";

export default function ProductsPage() {
  const [sort, setSort] = useState<SortType>("default");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState("All");
  const router = useRouter();

  let filtered = productsData
    .filter((product) => category === "All" || product.category === category)
    .filter((product) => brand === "All" || product.brand === brand)
    .filter((product) => {
      if (price === "Under 100,000đ") return product.price < 100000;
      if (price === "100,000đ – 300,000đ")
        return product.price >= 100000 && product.price <= 300000;
      if (price === "Over 300,000đ") return product.price > 300000;
      return true;
    });

  filtered = filtered.slice().sort((a, b) => {
    if (sort === "priceAsc") return a.price - b.price;
    if (sort === "priceDesc") return b.price - a.price;
    if (sort === "nameAsc") return a.name.localeCompare(b.name);
    if (sort === "nameDesc") return b.name.localeCompare(a.name);
    return a.id - b.id;
  });

  return (
    <main
      style={{
        padding: 24,
        background: "#fff",
        minHeight: "100vh",
        fontFamily: "inherit",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 32,
          marginBottom: 32,
          letterSpacing: 1,
        }}
      >
        ALL PRODUCTS
      </h1>
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 32,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Dropdown
          label="Sort"
          value={sort}
          onChange={(v) => setSort(v as SortType)}
          options={[
            { value: "default", label: "Default" },
            { value: "priceAsc", label: "Price: Low to High" },
            { value: "priceDesc", label: "Price: High to Low" },
            { value: "nameAsc", label: "Name: A-Z" },
            { value: "nameDesc", label: "Name: Z-A" },
          ]}
        />
        <Dropdown
          label="Category"
          value={category}
          onChange={setCategory}
          options={categories.map((c) => ({ value: c, label: c }))}
        />
        <Dropdown
          label="Brand"
          value={brand}
          onChange={setBrand}
          options={brands.map((b) => ({ value: b, label: b }))}
        />
        <Dropdown
          label="Price"
          value={price}
          onChange={setPrice}
          options={priceOptions.map((p) => ({ value: p, label: p }))}
        />
        <button
          style={{
            background: "#fff",
            border: "1px solid #43A047",
            color: "#43A047",
            borderRadius: 8,
            padding: "0 16px",
            marginLeft: 8,
            fontWeight: 600,
            cursor: "pointer",
            height: 40,
            minWidth: 120,
          }}
          onClick={() => {
            setSort("default");
            setCategory("All");
            setBrand("All");
            setPrice("All");
          }}
        >
          Clear all
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24,
        }}
      >
        {filtered.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: 12,
              padding: 20,
              background: "#fff",
              textAlign: "center",
              transition: "box-shadow 0.2s",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              height: 330,
            }}
            tabIndex={0}
            role="button"
            aria-label={`View details of ${product.name}`}
            onClick={() => router.push(`/products/${product.id}`)}
          >
            <div
              style={{
                width: "100%",
                height: 160,
                marginBottom: 18,
                borderRadius: 10,
                background: "#f8f8f8",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/160x160?text=No+Image")
                }
              />
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                minHeight: 48,
                margin: "12px 0",
                color: "#222",
                letterSpacing: 0.5,
                flex: 1,
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                color: "#43A047",
                fontWeight: 700,
                fontSize: 18,
                marginBottom: 4,
              }}
            >
              {product.price.toLocaleString()}{" "}
              <span style={{ fontWeight: 400, fontSize: 16 }}>đ</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#888",
              fontSize: 18,
              padding: 40,
            }}
          >
            No suitable products found.
          </div>
        )}
      </div>
    </main>
  );
}

function Dropdown({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        fontWeight: 500,
        minWidth: 180,
      }}
    >
      <span style={{ marginBottom: 4, color: "#222" }}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #43A047",
          fontSize: 15,
          background: "#fff",
          color: "#222",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
