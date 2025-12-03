import { useEffect, useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import productService from "../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    productService.getProducts().then((response) => {
      const data = response.data.find((p) => p.id === Number(id));
      setProduct(data);
    });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProduct = (e) => {
    e.preventDefault();
    productService.updateProduct(id, product).then(() => {
      alert("Product updated successfully!");
      navigate("/");
    });
  };

  return (
    <Card style={{ width: 400, margin: "50px auto", padding: "10px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          ✏️ Edit Product
        </Typography>

        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Stock"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          margin="normal"
        />

        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: "20px", backgroundColor: "#fa541c" }}
          onClick={updateProduct}
        >
          Update
        </Button>
      </CardContent>
    </Card>
  );
}