import React, { useEffect, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import PillNav from "./components/PillNav";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductCarousel from "./components/ProductCarousel";
import Banner from "./components/Banner";
import AppDownload from "./components/AppDownload";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import { CartProvider } from "./context/CartContext";
import { PRODUCTS } from "./data/products";
import AdminPage from "./pages/AdminPage";
import AdminDashboard from "./pages/AdminDashboard";

import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";

const App = () => {
  useEffect(() => {
    document.title = "The Culinary Curator | Premium Food Ordering";
  }, []);

  const location = useLocation();

  const productSections = useMemo(
    () => ({
      specials: PRODUCTS.filter(p => p.category === "Specials"),
      priceDrop: PRODUCTS.filter(p => p.category === "Price Drop"),
      arrivals: PRODUCTS.filter(p => p.category === "New Arrivals"),
      popular: PRODUCTS.filter(p => p.category === "Popular" || !p.category), // Defaulting some to popular
      trending: PRODUCTS.filter(p => p.trending),
    }),
    [location.pathname]
  );

  const isAdminRoute = location.pathname.startsWith("/arrifoods/control/admin");

  return (
    <CartProvider>
      <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed scroll-smooth overflow-x-hidden">
        <Toast />
        {!isAdminRoute && (
          <PillNav
            logo="https://cdn-icons-png.flaticon.com/512/3448/3448636.png"
            logoAlt="The Culinary Curator"
            items={[
              { label: "Home", href: "/" },
              { label: "Categories", href: "/categories" },
              { label: "The Journal", href: "/blog" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ]}
            activeHref={location.pathname}
            baseColor="#a04100"
            pillColor="#ffffff"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#1c1b1b"
            className="max-md:w-full"
            initialLoadAnimation={false}
          />
        )}

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Hero />
                  <div id="categories">
                    <Categories />
                  </div>
                  <div id="offers">
                    <ProductCarousel title="Special For You" items={productSections.specials} />
                    <ProductCarousel title="Price Drop" items={productSections.priceDrop} />
                  </div>
                  <ProductCarousel title="New Arrivals" items={productSections.arrivals} />
                  <ProductCarousel title="Popular" items={productSections.popular} />
                  <ProductCarousel title="Trending" items={productSections.trending} />
                  <Banner />
                </PageTransition>
              }
            />
            <Route path="/categories" element={<PageTransition><CategoryPage /></PageTransition>} />
            <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
            <Route path="/success" element={<PageTransition><SuccessPage /></PageTransition>} />
            <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
            <Route path="/profile/:tab?" element={<PageTransition><ProfilePage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/arrifoods/control/admin" element={<PageTransition><AdminPage /></PageTransition>} />
            <Route path="/arrifoods/control/admin/dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
          </Routes>
        </AnimatePresence>

        {!isAdminRoute && <Footer />}
      </div>
    </CartProvider>
  );
};

export default App;
