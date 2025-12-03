import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/ProductService";
import { 
  Box, 
  Typography, 
  Button, 
  CardMedia, 
  Grid, 
  Paper, 
  Divider,
  IconButton, 
  TextField  
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartService from "../services/CartService";
import AuthService from "../services/AuthService";
import AddIcon from '@mui/icons-material/Add'; 
import RemoveIcon from '@mui/icons-material/Remove';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    productService.getProducts().then((res) => {
      const item = res.data.find((p) => p.id === parseInt(id));
      setProduct(item);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  // FUNGSI BARU: Tambah Jumlah
  const handleIncrease = () => {
    if (quantity < product.stock) {
        setQuantity(prev => prev + 1);
    }
  };

  // FUNGSI BARU: Kurang Jumlah
  const handleDecrease = () => {
    if (quantity > 1) {
        setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
      const user = AuthService.getCurrentUser();
      if (!user) {
          alert("Silakan login dulu untuk belanja!");
          navigate("/login");
          return;
      }
      CartService.addToCart(product, quantity);
      
      if(window.confirm("Barang masuk keranjang! Mau lihat keranjang?")) {
          navigate("/cart");
      }
  };

  // FUNGSI TAMBAHAN: Beli Sekarang (Langsung ke Cart)
  const handleBuyNow = () => {
      const user = AuthService.getCurrentUser();
      if (!user) {
          alert("Silakan login dulu untuk belanja!");
          navigate("/login");
          return;
      }
      // Masukkan ke cart lalu PAKSA pindah halaman
      CartService.addToCart(product, quantity);
      navigate("/cart");
  };

  if (loading) return <h2 style={{textAlign:'center', marginTop: 50}}>Loading...</h2>;
  if (!product) return <h2 style={{textAlign:'center', marginTop: 50}}>Produk tidak ditemukan 😢</h2>;

  return (
    <Box sx={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* Tombol Kembali */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/')}
        sx={{ marginBottom: 2, color: "#fa541c" }}
      >
        Kembali
      </Button>

      <Paper elevation={3} sx={{ padding: "20px", borderRadius: "12px" }}>
        <Grid container spacing={4}>
          
          {/* BAGIAN KIRI: GAMBAR */}
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              sx={{ 
                width: "100%", 
                height: "auto", 
                borderRadius: "10px", 
                border: "1px solid #eee",
                maxHeight: "500px",
                objectFit: "contain"
              }}
              image={product.imageUrl || "https://via.placeholder.com/300x300?text=No+Image"}
              alt={product.name}
            />
          </Grid>

          {/* BAGIAN KANAN: INFORMASI */}
          <Grid item xs={12} md={7}>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 1 }}>
              {product.name}
            </Typography>

            <Box sx={{ background: "#fafafa", padding: "15px", borderRadius: "8px", marginBottom: 2 }}>
              <Typography variant="h4" sx={{ color: "#d0011b", fontWeight: "bold" }}>
                Rp {product.price?.toLocaleString("id-ID")}
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={3}>
                <Typography color="text.secondary">Stok</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{product.stock} buah</Typography>
              </Grid>
              
              <Grid item xs={3}>
                <Typography color="text.secondary">Kategori</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>Umum</Typography> 
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 3, marginTop: 2 }}>
                <Typography>Jumlah:</Typography>
                <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px" }}>
                    <IconButton onClick={handleDecrease} disabled={quantity <= 1}>
                        <RemoveIcon />
                    </IconButton>
                    <TextField 
                        value={quantity}
                        variant="standard"
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        sx={{ width: "40px", input: { textAlign: "center", fontWeight: "bold" } }}
                    />
                    <IconButton onClick={handleIncrease} disabled={quantity >= product.stock}>
                        <AddIcon />
                    </IconButton>
                </Box>
                <Typography variant="caption" color="text.secondary">
                    (Tersisa {product.stock} buah)
                </Typography>
            </Box>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
              Deskripsi Produk
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: "pre-line", color: "#555" }}>
              {product.description || "Tidak ada deskripsi untuk produk ini."}
            </Typography>

            <Box sx={{ marginTop: 4, display: "flex", gap: 2 }}>
              <Button 
                variant="outlined" 
                size="large"
                startIcon={<ShoppingCartIcon />}
                sx={{ 
                  color: "#fa541c", 
                  borderColor: "#fa541c",
                  '&:hover': { backgroundColor: "#fff5f0", borderColor: "#fa541c" }
                }}
                onClick={handleAddToCart}
              >
                Masukkan Keranjang
              </Button>

              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  background: "#fa541c",
                  '&:hover': { backgroundColor: "#d9420c" }
                }}
                onClick={handleBuyNow} // Saya hubungkan ke fungsi baru
              >
                Beli Sekarang
              </Button>
            </Box>

          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}