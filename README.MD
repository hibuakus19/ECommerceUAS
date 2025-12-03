# 🛍️ RealBarca E-Commerce (UAS Project)

**RealBarca** adalah aplikasi web E-Commerce Full Stack yang dikembangkan sebagai Proyek Akhir (UAS). Aplikasi ini memungkinkan pengguna untuk melihat produk, berbelanja (Checkout), dan memungkinkan Admin untuk mengelola inventaris produk dengan keamanan berbasis Role.

Proyek ini mengimplementasikan konsep **Microservices**, **Cloud Storage**, **REST API**, dan **Business Process Management (BPM)**.

---

## 🚀 Tech Stack

### Backend (Java Spring Boot)

- **Framework:** Spring Boot 4.0.0
- **Language:** Java JDK 21
- **Database:** MySQL (via Hibernate/Spring Data JPA)
- **Security:** Spring Security (DaoAuthenticationProvider + BCrypt)
- **Cloud Storage:** MinIO (S3 Compatible Object Storage)
- **Build Tool:** Maven

### Frontend (React.js)

- **Framework:** React 19.2.0
- **Styling:** Material UI (MUI)
- **HTTP Client:** Axios
- **State Management:** React Hooks & LocalStorage

### Tools & BPM

- **BPMN Modeling:** Bizagi Modeler (Exported to BPEL/XML)
- **IDE:** VS Code

---

## 🔥 Fitur Utama

### 1. Hak Akses (Role-Based Access Control)

- **Guest:** Hanya bisa melihat daftar produk dan detail produk.
- **User (Pembeli):** Bisa menambahkan barang ke keranjang (_Add to Cart_) dan melakukan _Checkout_.
- **Admin (Penjual):** Memiliki akses penuh CRUD (Create, Read, Update, Delete) produk dan upload gambar.

### 2. Manajemen Produk & Stok

- Upload gambar produk ke Cloud Storage (MinIO).
- Sistem pengurangan stok otomatis saat _Checkout_.
- Validasi stok saat memasukkan barang ke keranjang.

### 3. Keranjang Belanja (Cart)

- Menambah item dengan jumlah tertentu (+ / -).
- Menghitung total harga secara dinamis.
- Checkout simulasi dengan validasi stok di backend.

### 4. Implementasi BPM (Business Process Management)

- Alur logika bisnis (Checkout) didesain menggunakan BPMN di Bizagi.
- Diimplementasikan ke dalam kode Java (`ProductService.java`).

---

## 🛠️ Instalasi & Cara Menjalankan

Ikuti langkah-langkah ini untuk menjalankan proyek di komputer lokal.

### Prasyarat

- Java JDK 21
- Node.js & NPM
- MySQL Server
- MinIO Server (Running di port 9000)

### Cara Menjalankan Project

Untuk Instalasi
- Masuk Ke folder Project, Masuk ke root ECommerceUAS\ecommerce-backend lalu jalankan mvn clean install di terminal VSCode ,dan
- Masuk Ke folder Project, Masuk ke root ECommerceUAS\ecommerce-frontend lalu jalankan npm install di terminal VSCode


Pastikan MySQL 9.1.0 dan MinIO 2022-12-12T19-27-27Z sudah berjalan. Buat database kosong bernama `ecommerce` dan buat bucket minio kosong bernama `bucket-test`.

Untuk Menjalankan MYSQL

- Buka CMD masuk ke folder mysql/bin jalankan mysqld

Untuk Menjalankan Minio

- Buka CMD masuk ke folder minio yang sudah ada file minio.exe lalu jalankan minio.exe server C:\minio\data

Buka file `src/main/resources/application.properties` pastika isinya seperti berikut ini:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=password_mysql_anda

# Hibernate
spring.jpa.hibernate.ddl-auto=update

# MinIO Configuration (Cloud Storage)
minio.url=http://localhost:9000
minio.accessKey=minioadmin
minio.secretKey=minioadmin
minio.bucket=test-bucket
```
Untuk Menjalankan Spring-Boot
- Masuk Ke folder Project, Masuk ke root ECommerceUAS\ecommerce-backend lalu jalankan mvn spring-boot:run di terminal VSCode

Untuk Menjalankan ReactJs
- Masuk Ke folder Project, Masuk ke root ECommerceUAS\ecommerce-frontend lalu jalankan npm start di terminal VSCode
