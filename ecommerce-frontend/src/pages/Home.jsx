import { useEffect, useState } from "react";
import productService from "../services/ProductService";
import { Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔥 Rekomendasi Untuk Kamu</h2>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}