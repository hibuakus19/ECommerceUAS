import axios from "axios";

const API_URL = "http://localhost:8080/products";
const UPLOAD_URL = "http://localhost:8080/files/upload";

// Fungsi pembantu untuk membuat Header Otentikasi
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username && user.password) {
        // Basic Auth format: "Basic base64(username:password)"
        const token = btoa(user.username + ":" + user.password);
        return { Authorization: 'Basic ' + token };
    } else {
        return {};
    }
};

class ProductService {
  // GET Public (Tidak butuh header)
  getProducts() {
    return axios.get(API_URL);
  }

  // CREATE (Butuh Header)
  createProduct(product) {
    return axios.post(API_URL, product, { headers: getAuthHeader() });
  }

  // UPDATE (Butuh Header)
  updateProduct(id, product) {
    return axios.put(`${API_URL}/${id}`, product, { headers: getAuthHeader() });
  }

  // DELETE (Butuh Header)
  deleteProduct(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
  }

  // UPLOAD GAMBAR (Butuh Header)
  uploadImage(imageFile) {
    let formData = new FormData();
    formData.append("file", imageFile);
    
    // Gabungkan Header Auth + Header File
    const headers = { 
        ...getAuthHeader(), 
        "Content-Type": "multipart/form-data" 
    };

    return axios.post(UPLOAD_URL, formData, { headers: headers });
  }
}

const productService = new ProductService();
export default productService;