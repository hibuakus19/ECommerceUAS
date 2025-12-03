import { useEffect, useState } from "react";
import productService from "../services/ProductService";
import AuthService from "../services/AuthService"; // Import AuthService
import { useNavigate } from "react-router-dom";
import {
  Grid, Card, CardContent, Typography, CardActions, Button, CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ProductList({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined); // State untuk user
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Cek siapa yang login
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    // 2. Load produk
    loadProducts();
  }, []);

  // ... (useEffect untuk search biarkan sama) ...
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setFiltered(products);
      return;
    }
    const q = searchQuery.toLowerCase();
    const result = products.filter((p) => (p.name || "").toLowerCase().includes(q));
    setFiltered(result);
  }, [searchQuery, products]);

  const loadProducts = () => {
    productService.getProducts().then((response) => {
      setProducts(response.data || []);
      setFiltered(response.data || []);
    });
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      productService.deleteProduct(id)
        .then(() => loadProducts())
        .catch((err) => {
           alert("Gagal menghapus! Anda mungkin bukan Admin.");
           console.error(err);
        });
    }
  };

  // Cek apakah user adalah ADMIN
  const isAdmin = currentUser && currentUser.role === "ADMIN";

  return (
    <div style={{ padding: "30px" }}>
      <Typography variant="h4" gutterBottom style={{ color: "#fa541c" }}>
        🛍 Product List
      </Typography>

      {/* TAMPILKAN TOMBOL ADD HANYA JIKA ADMIN */}
      {isAdmin && (
        <Button variant="contained" onClick={() => navigate("/add-product")}
          sx={{ backgroundColor: "#fa541c", marginBottom: "20px" }}>
          ➕ Add Product
        </Button>
      )}

      {filtered.length === 0 ? (
        <Typography variant="h6" style={{ textAlign: "center", marginTop: 50, color: "#888" }}>
          ❌ Product Not Found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filtered.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card 
                style={{ borderRadius: "12px", cursor: "pointer" }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={product.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"} 
                  alt={product.name}
                  style={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="text.secondary">Rp {product.price?.toLocaleString?.("id-ID")}</Typography>
                  <Typography variant="body2">Stock: {product.stock}</Typography>
                </CardContent>

                {/* TAMPILKAN TOMBOL EDIT/DELETE HANYA JIKA ADMIN */}
                {isAdmin && (
                  <CardActions>
                    <Button variant="outlined" size="small" startIcon={<EditIcon />}
                      sx={{ color: "#fa541c", borderColor: "#fa541c" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit-product/${product.id}`);
                      }}
                    >
                      Edit
                    </Button>

                    <Button variant="contained" size="small" color="error" startIcon={<DeleteIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}