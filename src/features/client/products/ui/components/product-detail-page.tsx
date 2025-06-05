"use client";
import { useParams, useRouter } from "next/navigation";
import { productsData } from "@/features/client/home/data/products-data";
import React, { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);

  const product = productsData.find((p) => p.id === productId);

  if (!product)
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        Không tìm thấy sản phẩm!
        <br />
        <button
          style={{
            marginTop: 16,
            padding: "8px 20px",
            borderRadius: 8,
            border: "1px solid #43A047",
            background: "#fff",
            color: "#43A047",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => router.back()}
        >
          Quay lại
        </button>
      </div>
    );

  const related = productsData.filter(
    (p) => p.brand === product.brand && p.id !== product.id,
  );
  const [qty, setQty] = useState(1);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      {/* Phần trên */}
      <div
        style={{
          display: "flex",
          gap: 40,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 12px 32px 12px",
          flexWrap: "wrap",
        }}
      >
        {/* Ảnh */}
        <div
          style={{
            flex: "0 0 50%",
            minWidth: 400,
            maxWidth: 600,
            height: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fafafa",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Thông tin */}
        <div style={{ flex: 1, minWidth: 320 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 20,
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: 8,
            }}
          >
            {product.name}
          </h2>
          <div
            style={{
              color: "#FF2D2D",
              fontWeight: 700,
              fontSize: 28,
              marginBottom: 18,
            }}
          >
            {product.price.toLocaleString()}đ
          </div>
          {/* Đánh giá sao */}
          <div style={{ marginBottom: 16 }}>
            <StarRating value={product.rating ?? 4} />
          </div>
          {/* Số lượng */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 22,
            }}
          >
            <button
              style={{
                width: 32,
                height: 32,
                fontSize: 22,
                border: "1px solid #43A047",
                background: "#fff",
                color: "#43A047",
                borderRadius: 6,
                fontWeight: 600,
                cursor: qty > 1 ? "pointer" : "not-allowed",
              }}
              disabled={qty === 1}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                minWidth: 32,
                textAlign: "center",
              }}
            >
              {qty}
            </span>
            <button
              style={{
                width: 32,
                height: 32,
                fontSize: 22,
                border: "1px solid #43A047",
                background: "#fff",
                color: "#43A047",
                borderRadius: 6,
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => setQty((q) => q + 1)}
            >
              +
            </button>
          </div>
          {/* Nút thêm vào giỏ/mua ngay */}
          <div style={{ display: "flex", gap: 18, marginBottom: 20 }}>
            <button
              style={{
                padding: "12px 36px",
                border: "none",
                borderRadius: 8,
                background: "#43A047",
                color: "#fff",
                fontWeight: 700,
                fontSize: 17,
                cursor: "pointer",
                letterSpacing: 0.5,
              }}
            >
              ADD TO CART
            </button>
            <button
              style={{
                padding: "12px 36px",
                border: "none",
                borderRadius: 8,
                background: "#FF2D2D",
                color: "#fff",
                fontWeight: 700,
                fontSize: 17,
                cursor: "pointer",
                letterSpacing: 0.5,
              }}
            >
              BUY IT
            </button>
          </div>
        </div>
      </div>

      {/* Mô tả & Thương hiệu */}
      <div
        style={{
          maxWidth: 950,
          margin: "40px auto 0 auto",
          padding: "0 12px 32px 12px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "flex-start",
            marginBottom: 40,
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: 90,
              height: 90,
              objectFit: "contain",
              borderRadius: 10,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>
              Detail
            </div>
            <div
              style={{ fontSize: 16, color: "#333" }}
              dangerouslySetInnerHTML={{ __html: product.description ?? "" }}
            />
            <div style={{ marginTop: 10 }}></div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            alignItems: "center",
            borderTop: "1px solid #e0e0e0",
            paddingTop: 24,
            marginBottom: 36,
          }}
        >
          <img
            src={product.brandImg}
            alt={product.brand}
            style={{
              width: 90,
              height: 90,
              objectFit: "contain",
              borderRadius: 10,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>
              BRAND
            </div>
            <div style={{ fontSize: 16, color: "#333" }}>
              {product.brandDesc}
            </div>
            <div style={{ marginTop: 10 }}></div>
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto 36px auto",
          padding: "0 12px",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18 }}>
          RELATED PRODUCTS
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            overflowX: "auto",
            paddingBottom: 10,
          }}
        >
          {related.map((item) => (
            <div
              key={item.id}
              style={{
                minWidth: 200,
                border: "1px solid #e0e0e0",
                borderRadius: 12,
                padding: 18,
                background: "#fff",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                flex: "0 0 210px",
              }}
              onClick={() => router.push(`/products/${item.id}`)}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: 90,
                  height: 90,
                  objectFit: "contain",
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              />
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#222",
                  marginBottom: 4,
                }}
              >
                {item.name}
              </div>
              <div style={{ color: "#43A047", fontWeight: 700, fontSize: 16 }}>
                {item.price.toLocaleString()}đ
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Component đánh giá sao
function StarRating({ value = 4 }: { value: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((idx) => (
        <Star key={idx} filled={idx <= value} />
      ))}
      <span style={{ marginLeft: 8, color: "#666", fontWeight: 500 }}>
        {value}/5
      </span>
    </div>
  );
}
function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      fill={filled ? "#FFC107" : "#ddd"}
      viewBox="0 0 24 24"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
