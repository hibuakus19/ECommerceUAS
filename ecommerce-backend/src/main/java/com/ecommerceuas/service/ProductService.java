package com.ecommerceuas.service;

import com.ecommerceuas.model.Product;
import com.ecommerceuas.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id)
                .map(p -> {
                    p.setName(updatedProduct.getName());
                    p.setPrice(updatedProduct.getPrice());
                    p.setStock(updatedProduct.getStock());
                    return productRepository.save(p);
                })
                .orElse(null);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Transactional
    public void checkout(List<Map<String, Object>> items) {
        for (Map<String, Object> item : items) {
            Long productId = ((Number) item.get("id")).longValue();
            Integer quantity = ((Number) item.get("quantity")).intValue();

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Produk tidak ditemukan: ID " + productId));

            if (product.getStock() < quantity) {
                throw new RuntimeException("Stok tidak cukup untuk produk: " + product.getName());
            }

            product.setStock(product.getStock() - quantity);
            productRepository.save(product);
        }
    }
}