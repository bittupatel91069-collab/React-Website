import React from "react";
import { HStack, Card, VStack, Button, Text } from "rsuite";
import { ShoppingCart } from "lucide-react";
import { cardData } from "../cardData.ts";

const STAR_COLOR = "rgb(193, 100, 82)";
const STAR_EMPTY = "#e5e7eb";

interface ProductGridProps {
  onOrder: (product: any) => void;
  onImageClick: (images: string[]) => void;
}

export const getDiscountedPrice = (p: any) => {
  if (!p.discount) return p.price;
  return Math.floor(p.price * (1 - p.discount / 100));
};

const renderStars = (rating: number) => {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <span style={{ color: STAR_COLOR, fontSize: 14 }}>
      {"★".repeat(full)}
      {hasHalf && (
        <span style={{ position: "relative", display: "inline-block" }}>
          <span style={{ color: STAR_EMPTY }}>★</span>
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "50%",
              overflow: "hidden",
              color: STAR_COLOR,
            }}
          >
            ★
          </span>
        </span>
      )}
      {"☆".repeat(empty)}
    </span>
  );
};

const ProductGrid: React.FC<ProductGridProps> = ({ onOrder, onImageClick }) => (
  <HStack
    wrap
    spacing={32}
    justifyContent="center"
    style={{ marginTop: 36, width: "100%" }}
  >
    {cardData.map((p) => (
      <Card
        key={p.id}
        style={{
          width: 250,
          borderRadius: 22,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 24px rgba(60,80,255,0.25)",
          cursor: "pointer",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
        }}
        className="product-card"
      >
        <img
          src={p.images[0]}
          style={{ width: "100%", height: 150, objectFit: "cover" }}
          onClick={() => onImageClick(p.images)}
        />
        <VStack spacing={8} style={{ padding: "14px 10px" }}>
          <Text
            size={15}
            weight="bold"
            style={{ fontFamily: "'Gloock', serif" }}
          >
            {p.title}
          </Text>
          {/* Price + Rating */}
          <HStack
            justifyContent="space-between"
            align="center"
            style={{ width: "100%" }}
          >
            {getDiscountedPrice(p) ? (
              <VStack spacing={2} align="start">
                <Text size={10}>Pack of 2</Text>

                <Text
                  size={11}
                  weight="bold"
                  style={{
                    color: "#16a34a",
                    background: "#dcfce7",
                    padding: "2px 6px",
                    borderRadius: 6,
                    width: "fit-content",
                  }}
                >
                  {p.discount}% OFF
                </Text>

                <HStack spacing={6} align="center">
                  <Text
                    size={13}
                    style={{
                      color: "#9ca3af",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{p.price}
                  </Text>

                  <Text size={16} weight="bold" style={{ color: "#111827" }}>
                    ₹{getDiscountedPrice(p)}
                  </Text>
                </HStack>
              </VStack>
            ) : (
              <Text size={16} weight="bold" style={{ color: "#6b7280" }}>
                ₹{p.price}
              </Text>
            )}

            <HStack spacing={6}>
              {renderStars(p.rating)}
              <Text size={12} style={{ color: "#6b7280" }}>
                {p.reviews} reviews
              </Text>
            </HStack>
          </HStack>
          <Button
            appearance="primary"
            startIcon={<ShoppingCart size={18} />}
            onClick={() => onOrder(p)}
            style={{ borderRadius: 10 }}
          >
            Order
          </Button>
        </VStack>
      </Card>
    ))}
  </HStack>
);

export default ProductGrid;
