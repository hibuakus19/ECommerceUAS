import { Box, Button } from "@mui/material";

const categories = ["Elektronik", "Fashion", "Buku", "Kesehatan", "Gaming", "Dapur", "Mainan"];

export default function CategoryBar() {
  return (
    <Box sx={{ display: "flex", gap: "10px", padding: "10px", background: "#fff", borderBottom: "1px solid #ddd" }}>
      {categories.map((cat, index) => (
        <Button key={index} variant="outlined" size="small">
          {cat}
        </Button>
      ))}
    </Box>
  );
}