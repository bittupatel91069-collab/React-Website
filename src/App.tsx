import React, { useState, useRef } from "react";
import { VStack, Text } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Header from "./components/Header.tsx";
import Banner from "./components/Banner.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import Footer from "./components/Footer.tsx";
import OrderModal from "./components/OrderModal.tsx";
import ImageViewer from "./components/ImageViewer.tsx";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [formValue, setFormValue] = useState<any>({
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [formError, setFormError] = useState({});
  const formRef = useRef<any>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<any[]>([]);

  // Handlers for product grid and modal
  const buy = (p: any) => {
    setSelected(p);
    setOpen(true);
  };

  const openGallery = (imgs: string[]) => {
    setViewerImages(imgs.map((i) => ({ original: i })));
    setViewerOpen(true);
  };

  const submit = async () => {
    if (formRef.current) {
      const isValid = formRef.current.check();
      if (!isValid) {
        toast.error("Please fill all required fields correctly.", {
          position: "bottom-center",
          className: "error-toast-container",
          hideProgressBar: true,
          autoClose: 3000,
        });
        return;
      }
    }
    // Send data to Google Sheets
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyYWy8xm6AjJBZBOGPuJRlOeNVjWieM7m8xZ2bMVsUfTI7hEjyXPt2noiV6b1BRI5HOkA/exec",
        {
          method: "POST",
          mode: "no-cors", // Google Apps Script requires no-cors for public endpoints
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValue),
        }
      );
    } catch (error) {
      toast.error("❌ Failed to place order.", {
        position: "bottom-center",
        className: "error-toast-container",
        hideProgressBar: true,
        autoClose: 3000,
      });
    }
    setOpen(false);
    toast.success("🎉 Order placed successfully!", {
      position: "bottom-center",
      className: "success-toast-container",
      hideProgressBar: true,
      autoClose: 3000,
    });
  };

  return (
    <VStack
      spacing={0}
      alignItems="center"
      style={{
        width: "100%",
        background: "linear-gradient(120deg,#dfe6ff,#ccd4ff 40%,#b6c0ff)",
        paddingBottom: 120,
      }}
    >
      <Header />
      <Banner />
      <VStack spacing={4} style={{ marginTop: 30 }}>
        <Text as="h1" size={40} weight="bold" align="center">
          Trending Innerwear ✨
        </Text>
        <Text as="p" size={17} color="#5b6372" align="center">
          Tap image to zoom and view all angles
        </Text>
      </VStack>
      <ProductGrid onOrder={buy} onImageClick={openGallery} />
      <Footer />
      <OrderModal
        open={open}
        selected={selected}
        formValue={formValue}
        setFormValue={setFormValue}
        formError={formError}
        setFormError={setFormError}
        formRef={formRef}
        onClose={() => setOpen(false)}
        onSubmit={submit}
      />
      <ImageViewer
        open={viewerOpen}
        images={viewerImages}
        onClose={() => setViewerOpen(false)}
      />
      <ToastContainer /> {/* <-- Add this line */}
    </VStack>
  );
};

export default App;
