package com.ecommerceuas.controller;

import com.ecommerceuas.model.User;
import com.ecommerceuas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // FITUR DAFTAR (REGISTER)
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username sudah dipakai!");
        }

        // Enkripsi password sebelum simpan
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Default role jika tidak diisi
        if (user.getRole() == null) {
            user.setRole("USER"); 
        }

        userRepository.save(user);
        return ResponseEntity.ok("Registrasi berhasil!");
    }

    // FITUR LOGIN SEDERHANA
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Cek kecocokan password
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login berhasil!");
                response.put("username", user.getUsername());
                response.put("role", user.getRole());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body("Username atau Password salah!");
    }
}