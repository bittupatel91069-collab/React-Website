import React from "react";
import { VStack, HStack, Text } from "rsuite";

const Footer = () => (
  <VStack
    alignItems="center"
    spacing={16}
    style={{
      marginTop: 60,
      padding: "40px 20px",
      width: "100%",
      background: "#eef1ff",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    }}
  >
    <HStack
      spacing={80}
      justifyContent="space-between"
      alignItems="flex-start"
      wrap
      style={{
        width: "100%",
        padding: "22px 14px",
        margin: "0 auto",
      }}
    >
      {/* About Us */}
      <VStack spacing={10} alignItems="flex-start" style={{ width: 300 }}>
        <Text size={18} weight="bold">
          ✨ About Us
        </Text>
        <Text size={13} style={{ lineHeight: 1.6, color: "#4b5563" }}>
          We are a premium innerwear brand focused on comfort, quality, and
          confidence. Every piece is thoughtfully designed using soft,
          breathable fabrics so you feel relaxed and confident every day.
        </Text>
      </VStack>

      {/* Contact Us */}
      <VStack spacing={10} alignItems="flex-start" style={{ width: 260 }}>
        <Text size={18} weight="bold">
          📞 Contact Us
        </Text>
        <Text size={13} style={{ lineHeight: 1.8, color: "#4b5563" }}>
          📩 <b>Email:</b> prashant021987@gmail.com <br />
          📞 <b>Phone:</b> +91 78872 88749 <br />
          🕒 <b>Hours:</b> Mon–Fri, 10 AM – 5 PM
        </Text>
      </VStack>

      {/* Return Policy */}
      <VStack spacing={10} alignItems="flex-start" style={{ width: 320 }}>
        <HStack spacing={6} alignItems="center">
          <Text size={18} weight="bold">
            🔁 Return Policy
          </Text>
          <Text size={8} muted>
            (T & C Apply)
          </Text>
        </HStack>

        <Text size={13} style={{ lineHeight: 1.7, color: "#4b5563" }}>
          • Exchange will be allowed within 7 days after delivery. <br />
          • Product should be in original condition with tags. <br />
          • Intimate wear cannot be returned or exchanged due to hygiene
          reasons. <br />• For exchange, please contact us via email.
        </Text>
      </VStack>
    </HStack>

    <Text size={12} color="#333" style={{ marginTop: 12 }}>
      © {new Date().getFullYear()} COMPANY — All Rights Reserved
    </Text>
  </VStack>
);

export default Footer;
