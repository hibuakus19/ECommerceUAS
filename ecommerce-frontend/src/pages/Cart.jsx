import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import CartService from "../services/CartService";
import { Typography, Box, Button, Paper, Grid, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      alert("Silakan login terlebih dahulu!");
      navigate("/login");
    } else {
      loadCart();
    }
  }, [navigate]);

  const loadCart = () => {
    const items = CartService.getCartItems();
    setCartItems(items);
    
    // Hitung Total Harga
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const handleDelete = (id) => {
    const updatedCart = CartService.removeFromCart(id);
    setCartItems(updatedCart);
    // Hitung ulang total
    const total = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const handleCheckout = async () => {
      if(!window.confirm(`Total bayar Rp ${totalPrice.toLocaleString("id-ID")}. Bayar sekarang?`)) {
          return;
      }

      try {
          await CartService.checkout(cartItems);
          CartService.clearCart();
          alert("Pembayaran Berhasil! Stok sudah dikurangi.");
          setCartItems([]);
          setTotalPrice(0);
          
          // Opsional: Kembali ke home
          navigate("/");

      } catch (error) {
          // 4. Jika error (misal stok habis)
          console.error(error);
          // Ambil pesan error dari backend jika ada
          const errorMsg = error.response?.data || "Terjadi kesalahan saat checkout.";
          alert("Gagal Checkout: " + errorMsg);
      }
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ padding: "30px", textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="#fa541c">🛒 Keranjang Belanja</Typography>
        <Paper sx={{ p: 5, mt: 3, background: "#f9f9f9" }}>
            <Typography variant="h6" color="text.secondary">Keranjang Anda masih kosong.</Typography>
            <Button variant="contained" sx={{ mt: 2, background: "#fa541c" }} onClick={() => navigate("/")}>
                Mulai Belanja
            </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "30px", maxWidth: 1000, margin: "0 auto" }}>
      <Typography variant="h4" fontWeight="bold" color="#fa541c" gutterBottom>
        🛒 Keranjang Belanja
      </Typography>

      <Grid container spacing={3}>
        {/* LIST BARANG */}
        <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
                <Paper key={item.id} sx={{ p: 2, mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                             {item.quantity} x Rp {item.price.toLocaleString("id-ID")}
                        </Typography>
                    </Box>
                    <Typography variant="h6" color="#fa541c" fontWeight="bold">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </Typography>
                    <IconButton color="error" onClick={() => handleDelete(item.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Paper>
            ))}
        </Grid>

        {/* SUMMARY HARGA */}
        <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Ringkasan Belanja</Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography>Total Harga</Typography>
                    <Typography fontWeight="bold">Rp {totalPrice.toLocaleString("id-ID")}</Typography>
                </Box>
                <Button fullWidth variant="contained" sx={{ background: "#fa541c", py: 1.5 }} onClick={handleCheckout}>
                    Checkout Sekarang
                </Button>
            </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}