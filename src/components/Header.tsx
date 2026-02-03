import React from "react";
import { Navbar, Text } from "rsuite";
import logo from "../../src/assets/logo/logo.png";

const Header = () => (
  <Navbar
    appearance="subtle"
    style={{
      position: "sticky",
      top: 0,
      width: "100%",
      zIndex: 20,
      padding: "12px 24px",
      backdropFilter: "blur(12px)",
      background: "rgba(255, 255, 255, 0.7)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    }}
  >
    <Navbar.Brand
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Skin Nest Beauty"
        style={{
          height: 36,
          width: 36,
          borderRadius: 8,
          objectFit: "cover",
        }}
      />

      {/* Brand Name */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "0.6px",
          color: "#1f2937",
        }}
      >
        SKIN NEST
        <span style={{ color: "#6366f1", marginLeft: 6 }}>BEAUTY</span>
      </Text>
    </Navbar.Brand>
  </Navbar>
);

export default Header;
