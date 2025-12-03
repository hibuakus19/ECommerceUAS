import React, { useState } from "react";
import AuthService from "../services/AuthService";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password);
      window.location.href = "/"; 
    } catch (error) {
      alert("Login Gagal! Periksa username atau password.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2} fontWeight="bold" textAlign="center">
          🔑 Login RealBarca
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, background: "#fa541c" }}
          >
            Masuk
          </Button>
        </form>
        <Typography variant="body2" textAlign="center" mt={2}>
          {/* Gunakan tag <a> biasa agar navigasi ke register lancar */}
          Belum punya akun? <a href="/register" style={{color: "#fa541c", textDecoration: "none"}}>Daftar disini</a>
        </Typography>
      </Paper>
    </Box>
  );
}