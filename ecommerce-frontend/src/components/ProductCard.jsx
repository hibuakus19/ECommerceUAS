import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    return (
    <Card sx={{ width: 200, cursor: "pointer" }}
    onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardMedia
        component="img"
        height="150"
        image={product.imageUrl} // Perbaikan sintaks di sini
        alt={product.name}
      />
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        <Typography color="red">
          Rp {product.price.toLocaleString("id-ID")}
        </Typography>
      </CardContent>
    </Card>
  );
}