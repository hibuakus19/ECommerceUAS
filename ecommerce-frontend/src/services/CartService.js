import axios from "axios"; // Pastikan import axios

const API_URL = "http://localhost:8080/products";

class CartService {
    // Simpan item ke keranjang (Berdasarkan Username)
    addToCart(product, count = 1) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return; 

        const cartKey = `cart_${user.username}`;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            // JANGAN CUMA += 1, TAPI += count
            existingItem.quantity += count; 
        } else {
            // Masukkan quantity sesuai count
            cart.push({ ...product, quantity: count }); 
        }

        localStorage.setItem(cartKey, JSON.stringify(cart));
    }

    // Ambil semua item di keranjang
    getCartItems() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return [];
        
        const cartKey = `cart_${user.username}`;
        return JSON.parse(localStorage.getItem(cartKey)) || [];
    }

    // Hapus item dari keranjang
    removeFromCart(productId) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const cartKey = `cart_${user.username}`;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        return cart; // Kembalikan cart terbaru
    }

    // Kosongkan keranjang (misal setelah Checkout)
    clearCart() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;
        localStorage.removeItem(`cart_${user.username}`);
    }

    checkout(cartItems) {
        const payload = cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity
        }));

        return axios.post(API_URL + "/checkout", payload);
    }
}

const cartService = new CartService();
export default cartService;