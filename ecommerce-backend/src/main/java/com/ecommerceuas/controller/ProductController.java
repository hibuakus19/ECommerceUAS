package com.ecommerceuas.controller;

import com.ecommerceuas.model.Product;
import com.ecommerceuas.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/products") // <--- UBAH INI (sebelumnya /files)
// @CrossOrigin dihapus agar ikut aturan global CorsConfig
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        System.out.println("Received product: " + product);
        return productService.saveProduct(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Product updated = productService.updateProduct(id, updatedProduct);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product with ID " + id + " deleted!";
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody List<Map<String, Object>> items) {
        try {
            productService.checkout(items);
            return ResponseEntity.ok("Checkout berhasil! Stok berkurang.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}