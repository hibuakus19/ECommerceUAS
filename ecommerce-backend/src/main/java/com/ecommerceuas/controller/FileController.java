package com.ecommerceuas.controller;

import com.ecommerceuas.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadFile(@RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();

        try {
            String fileName = fileService.uploadFile(file);
            String fileUrl = "http://localhost:9000/test-bucket/" + fileName; 

            response.put("fileName", fileName);
            response.put("url", fileUrl);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // Agar error muncul di console log backend
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}