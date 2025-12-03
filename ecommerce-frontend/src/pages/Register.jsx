import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { Box, TextField, Button, Typography, Paper, MenuItem } from "@mui/material";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Default role USER
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(username, password, role);
      alert("Registrasi Berhasil! Silakan Login.");
      navigate("/login");
    } catch (error) {
      alert("Registrasi Gagal! Username mungkin sudah dipakai.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2} fontWeight="bold" textAlign="center">
          📝 Daftar Akun Baru
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {/* Pilihan Role (Untuk Demo Projek ini saja) */}
          <TextField
            select
            fullWidth
            label="Daftar Sebagai"
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="USER">Pembeli (User)</MenuItem>
            <MenuItem value="ADMIN">Penjual (Admin)</MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, background: "#fa541c" }}
          >
            Daftar Sekarang
          </Button>
        </form>
      </Paper>
    </Box>
  );
}