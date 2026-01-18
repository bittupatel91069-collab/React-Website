import React from "react";
import { HStack, Card, VStack, Button, Text } from "rsuite";
import { ShoppingCart } from "lucide-react";
import { cardData } from "../cardData.ts";

interface ProductGridProps {
  onOrder: (product: any) => void;
  onImageClick: (images: string[]) => void;
}

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
        <VStack spacing={10} style={{ padding: "14px 10px" }}>
          <Text size={18} weight="bold">
            {p.title}
          </Text>
          <Text
            size={12}
            color="#5f6675"
            maxLines={2}
            style={{ wordWrap: "break-word" }}
          >
            {p.desc}
          </Text>
          <Text size={16} weight="medium" color="#2e7d32">
            ₹{p.price}
          </Text>
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
