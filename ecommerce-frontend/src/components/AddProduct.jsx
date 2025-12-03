import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import AuthService from '../services/AuthService';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (!user || user.role !== "ADMIN") {
            alert("Akses Ditolak! Hanya Admin yang boleh masuk sini.");
            navigate("/");
        }
    }, [navigate]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const saveProduct = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert("Wajib upload gambar!");
            return;
        }

        try {
            // 1. Upload Gambar dulu
            const uploadResponse = await ProductService.uploadImage(selectedFile);
            const imageUrlFromBackend = uploadResponse.data.url;

            // 2. Simpan Produk dengan URL gambar
            const productData = {
                name,
                price: parseFloat(price),
                stock: parseInt(stock),
                description,
                imageUrl: imageUrlFromBackend // Field ini harus sesuai dengan Product.java
            };

            await ProductService.createProduct(productData);
            alert("Produk berhasil disimpan!");
            navigate('/'); 

        } catch (error) {
            console.error("Error:", error);
            alert("Gagal menyimpan produk.");
        }
    };

    return (
        <Card style={{ maxWidth: 500, margin: "50px auto", padding: "20px" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>➕ Tambah Produk</Typography>
                <form onSubmit={saveProduct}>
                    <TextField fullWidth label="Nama Produk" margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
                    <TextField fullWidth label="Harga" type="number" margin="normal" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <TextField fullWidth label="Stok" type="number" margin="normal" value={stock} onChange={(e) => setStock(e.target.value)} required />
                    <TextField fullWidth label="Deskripsi" margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} />
                    
                    <Box mt={2} mb={2}>
                        <Typography variant="body2">Gambar Produk:</Typography>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                    </Box>

                    <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#fa541c" }}>
                        Simpan
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddProduct;