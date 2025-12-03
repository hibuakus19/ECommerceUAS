import React, { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import productService from "../services/ProductService";
import AuthService from "../services/AuthService"; // Import AuthService

export default function Navbar({ searchInput, setSearchInput, setSearchQuery }) {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined); // State user

  // Cek apakah ada user login saat Navbar dimuat
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    
    // Load products for search suggestion
    productService.getProducts().then((res) => setProducts(res.data || []));
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/login");
  };

  // ... (Bagian Search Logic Biarkan Saja Seperti Sebelumnya) ...
  useEffect(() => {
    if (!searchInput || searchInput.trim() === "") {
      setSuggestions([]);
      setSearchQuery(""); 
      return;
    }
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [searchInput, products, setSearchQuery]);

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    setSuggestions([]);
    navigate("/"); 
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  return (
    <div style={{ background: "#fa541c", padding: "12px 25px", display: "flex", gap: 16, alignItems: "center" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", cursor: "pointer", color: "#fff" }}
        onClick={() => { setSearchInput(""); setSearchQuery(""); navigate("/"); }}
      >
        RealBarca
      </Typography>

      <div style={{ position: "relative", width: "50%" }}>
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "none", outline: "none", fontSize: "16px" }}
        />
        <IconButton onClick={handleSearchSubmit} sx={{ position: "absolute", right: "5px", top: "1px", color: "#fa541c" }}>
          <SearchIcon />
        </IconButton>
        
        {/* Suggestion Box logic tetap sama... */}
        {suggestions.length > 0 && (
          <div style={{ background: "#fff", position: "absolute", top: "50px", width: "100%", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.2)", zIndex: 1000 }}>
            {suggestions.map((s) => (
               <div key={s.id} style={{padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee"}}
                onClick={() => { setSearchInput(s.name); setSearchQuery(s.name); setSuggestions([]); navigate("/"); }}
              >
                🔍 {s.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <Box sx={{ marginLeft: "auto", display: "flex", gap: 2, alignItems: "center" }}>
        
        {/* LOGIC LOGIN / LOGOUT */}
        {currentUser ? (
          <>
            <Typography variant="body2" sx={{color: "white", fontWeight: "bold"}}>
              Hi, {currentUser.username} ({currentUser.role})
            </Typography>
            <Button variant="outlined" sx={{ color: "white", borderColor: "white" }} onClick={logOut}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant="text" sx={{ color: "white" }} onClick={() => navigate("/login")}>
            Daftar / Login
          </Button>
        )}

        <IconButton sx={{ color: "white" }} onClick={() => navigate("/cart")}>
            <ShoppingCartIcon />
        </IconButton>
      </Box>
    </div>
  );
}