import React, { useState, useRef } from "react";
import { VStack, Text } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Header from "./components/Header.tsx";
import Banner from "./components/Banner.tsx";
import ProductGrid, { getDiscountedPrice } from "./components/ProductGrid.tsx";
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
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    product: selected?.title || "",
    price: selected?.price != null ? `₹${selected.price}` : "-",
  });
  const [formError, setFormError] = useState({});
  const formRef = useRef<any>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Handlers for product grid and modal
  const buy = (p: any) => {
    const discounted = getDiscountedPrice(p);
    setSelected(p);
    setFormValue({
      name: "",
      email: "",
      mobile: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      product: p.title || "",
      price: discounted != null ? discounted : p.price,
    });
    setOpen(true);
  };

  const openGallery = (imgs: string[]) => {
    setViewerImages(
      imgs.map((i) => ({
        original: i,
        thumbnail: i,
      }))
    );
    setViewerOpen(true);
  };

  const submit = async () => {
    if (formRef.current && !formRef.current.check()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    setLoading(true);
    try {
      console.log("formValue-------->", formValue);
      const body = new URLSearchParams(formValue).toString();

      await fetch(
        "https://script.google.com/macros/s/AKfycbzEOGM6V739124Uy3a2rSit1TAbf5W-HfD1B4BCqP5cfxUEJfgrrJz0rew0Iu1QcKZKjg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        }
      );

      setOpen(false);
      toast.success("🎉 Order placed successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
      <Banner onImageClick={openGallery} />
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
        loading={loading}
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
