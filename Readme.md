# Backend Test - Circlegeo

## Running on your local machine

### Prerequisite :

- Node JS version 20.10.0 or latest
- MongoDB

### Installation guide

#### 1. Clone This Repository

```bash
git clone {REPOSITORY_SOURCE}
# example using https
git clone https://github.com/elseptiawan/circlegeo-test-backend.git
```

#### 2. Install All Dependencies

```bash
npm install
```

#### 3. Environment Configuration

```bash
- Copy .env.example to .env
- Fill all configuration in .env file
```

#### 4. Run Seeder

```bash
npm run seed
```

#### 5. Running Application

```bash
npm run start
```

### API Documentation

https://documenter.getpostman.com/view/25970017/2sA3e5f8gN

### Appplication Scope

#### Admin
- Data Admin menggunakan data seeder yang telah disediakan (email: admin@gmail.com, password: password123)
- Admin dapat melakukan login dengan email dan password yang telah disediakan
- Admin dapat melihat list pelanggan dan penjual
- Admin dapat memverifikasi akun pelanggan dan penjual

#### Penjual
- Penjual melakukan registrasi dengan mengisi form yang telah disediakan
- Penjual dapat melakukan login dengan email dan password yang telah didaftarkan
- Penjual dapat membuat toko jika akun sudah diverifikasi oleh admin
- Penjual hanya bisa memiliki satu toko
- Penjual dapat mengelola produk yang dijual
- Penjual dapat melihat list order yang masuk
- Penjual dapat mengubah status order menjadi dikirim kepada pelanggan

#### Pelanggan
- Pelanggan melakukan registrasi dengan mengisi form yang telah disediakan
- Pelanggan dapat melakukan login dengan email dan password yang telah didaftarkan
- Pelanggan dapat melihat list produk yang ada
- Pelanggan dapat melihat list produk terdekat berdasarkan lokasi pelanggan
- Untuk produk terdekat hanya menampilkan produk yang memiliki jarak kurang dari 10 km
- Pelanggan dapat melakukan order produk
- Pelanggan dapat melihat list order yang telah dibuat
- pelanggan dapat mengubah status order menjadi selesai
- pelanggan hanya bisa memesan satu jenis produk dalam satu order
- pelanggan tidak bisa membatalkan pesanan yang telah dibuat

