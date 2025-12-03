import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";    
import Register from "./pages/Register";
import Cart from "./pages/Cart";

export default function App() {
  // state untuk input sementara dan query final
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Navbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchQuery={setSearchQuery}
      />

      <Routes>
        <Route path="/" element={<ProductList searchQuery={searchQuery} />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}