# Hướng Dẫn Kết Nối Frontend - Backend

## 📌 Cấu Hình Backend

### 1. Clone Backend Repository
```bash
git clone https://github.com/MinhQuanUIT/MSIS207.Q14_Backend.git
cd MSIS207.Q14_Backend
```

### 2. Cài Đặt Dependencies
```bash
npm install
```

### 3. Cấu Hình Environment
Tạo file `.env` với nội dung:
```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/bookstore?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
PORT=9500
NODE_ENV=development
```

### 4. Chạy Seeder (Tạo Dữ Liệu Mẫu)

**Bước 1: Tạo Admin User**
```bash
# Mở file seeder.js, uncomment dòng: seedAdmin()
# Comment dòng: seedBooks()
node seeder.js
```

**Thông tin đăng nhập Admin:**
- Email: `admin@gmail.com`
- Password: `admin123`

**Bước 2: Tạo Books với Reviews**
```bash
# Mở file seeder.js, uncomment dòng: seedBooks()
# Comment dòng: seedAdmin()

# Tạo 50 sách (mặc định)
node seeder.js

# Hoặc tùy chỉnh số lượng (ví dụ 100 sách)
node seeder.js --num 100
```

### 5. Khởi Động Backend Server
```bash
# Development mode với nodemon
npm run dev

# Hoặc Production mode
npm start
```

Backend sẽ chạy tại: `http://localhost:9500`

---

## 🎨 Cấu Hình Frontend

### 1. Cài Đặt Dependencies (nếu chưa cài)
```bash
cd Bookshop_FE
npm install
```

### 2. API Base URL
Frontend đã được cấu hình để kết nối với backend:
- API Base URL: `http://localhost:9500/api`
- Có thể thay đổi trong file: `src/services/api.js`

### 3. Khởi Động Frontend
```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

---

## 🔗 Mapping Backend - Frontend

### Book Model Mapping
| Backend Field | Frontend Field | Ghi Chú |
|--------------|----------------|---------|
| `_id` | `_id` | MongoDB ObjectId |
| `title` | `title` | Tên sách |
| `author` | `author` | Tác giả |
| `price` | `price` | Giá sách |
| `sales` | `sold` | Frontend map `sales` → `sold` |
| `stock` | `stock` | Tồn kho |
| `inStock` | `inStock` | Boolean - còn hàng/hết hàng |
| `image` | `image` | URL hình ảnh |
| `description` | `description` | Mô tả |
| `reviews[]` | `reviews[]` | Mảng đánh giá |
| `averageRating` | `rating` | Rating trung bình (1-10) |

### API Response Format
Backend trả về format:
```json
{
  "success": true,
  "data": [...],
  "total": 100,
  "count": 20,
  "page": 1,
  "pages": 5,
  "message": "Success message"
}
```

Frontend xử lý:
```javascript
const data = response.data.data || response.data
const total = response.data.total || data.length
```

---

## 🚀 API Endpoints

### Public Endpoints (Không cần token)
```
GET  /                          # Homepage
POST /api/auth/register         # Đăng ký
POST /api/auth/login            # Đăng nhập  
GET  /api/books                 # Danh sách sách (có pagination)
GET  /api/books/:id             # Chi tiết sách
```

### Protected Endpoints (Cần Bearer Token)
```
GET    /api/auth/profile        # Thông tin user
POST   /api/books/:id/reviews   # Thêm review
POST   /api/orders              # Tạo đơn hàng
GET    /api/orders/my-orders    # Đơn hàng của tôi
GET    /api/orders/:id          # Chi tiết đơn hàng
PUT    /api/orders/:id/cancel   # Hủy đơn hàng
POST   /api/cart                # Thêm vào giỏ
GET    /api/cart                # Xem giỏ hàng
DELETE /api/cart/:bookId        # Xóa khỏi giỏ
```

### Admin Only Endpoints
```
POST   /api/books               # Tạo sách mới
PUT    /api/books/:id           # Cập nhật sách
DELETE /api/books/:id           # Xóa sách
GET    /api/orders/all          # Tất cả đơn hàng
PUT    /api/orders/:id/status   # Cập nhật trạng thái đơn
GET    /api/users               # Danh sách users
POST   /api/users               # Tạo user
DELETE /api/users/:id           # Xóa user
```

---

## 🔑 Authentication Flow

### 1. Login Request
```javascript
POST http://localhost:9500/api/auth/login
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

### 2. Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "admin"
}
```

### 3. Sử Dụng Token
```javascript
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Frontend tự động thêm token vào headers thông qua axios interceptor trong `src/services/api.js`

---

## 📊 Book Search & Filter

### Backend Hỗ Trợ Query Params
- `page` - Trang hiện tại (default: 1)
- `limit` - Số sách mỗi trang (default: 10)
- `search` - Tìm kiếm theo title, author, description
- `sort` - Sắp xếp: `-createdAt` (mới nhất), `price`, `-price`, `-sales`, `-averageRating`

### Ví Dụ Request
```
GET http://localhost:9500/api/books?page=1&limit=20&search=harry&sort=-sales
```

### Frontend Filter Mapping
| Frontend sortBy | Backend sort |
|----------------|--------------|
| `price-asc` | `price` |
| `price-desc` | `-price` |
| `sales` | `-sales` |
| `rating` | `-averageRating` |
| `newest` | `-createdAt` |

---

## 🛒 Order Management Flow

### Tạo Đơn Hàng
```javascript
POST /api/orders
{
  "items": [
    {
      "book": "BOOK_ID_HERE",
      "qty": 2
    }
  ],
  "shippingInfo": {
    "address": "123 Main St",
    "city": "Ho Chi Minh",
    "postalCode": "70000",
    "country": "Vietnam"
  }
}
```

**Auto-update khi tạo đơn:**
- ✅ `stock` giảm theo số lượng đặt
- ✅ `sales` tăng theo số lượng đặt
- ✅ `inStock` cập nhật thành `false` nếu stock = 0

### Hủy Đơn Hàng (chỉ pending orders)
```javascript
PUT /api/orders/:orderId/cancel
```

**Auto-update khi hủy đơn:**
- ✅ `stock` tăng lại (hoàn trả)
- ✅ `sales` giảm lại
- ✅ `inStock` cập nhật thành `true` nếu stock > 0

---

## ⚠️ Lưu Ý Quan Trọng

### 1. CORS
Backend đã cấu hình CORS cho phép frontend kết nối. Nếu gặp lỗi CORS, kiểm tra `server.js`:
```javascript
app.use(cors())
```

### 2. Token Expiration
JWT token có thời hạn **5 giờ**. Sau đó cần login lại.

### 3. Password Requirements
- Tối thiểu 6 ký tự
- Backend hash password bằng bcryptjs

### 4. MongoDB Connection
Đảm bảo MONGO_URI trong `.env` đúng và database đã được kết nối.

### 5. Stock Management
- Backend TỰ ĐỘNG quản lý stock khi tạo/hủy đơn hàng
- Frontend KHÔNG cần gửi stock/sales trong request order

---

## 🔧 Troubleshooting

### Backend không khởi động
```bash
# Kiểm tra MongoDB connection
# Kiểm tra PORT 9500 đã được sử dụng chưa
netstat -ano | findstr :9500

# Kill process nếu cần
taskkill /PID <PID> /F
```

### 401 Unauthorized
- Kiểm tra token đã lưu trong localStorage
- Kiểm tra token chưa expired (5h)
- Login lại để lấy token mới

### 403 Forbidden
- Endpoint này cần admin role
- Login với account admin: `admin@gmail.com` / `admin123`

### Frontend không tải được sách
- Kiểm tra backend đã chạy chưa (http://localhost:9500)
- Kiểm tra đã chạy seeder chưa
- Xem Console để debug

---

## 📚 Tài Liệu Backend Chi Tiết

Xem file `API_GUIDE.md` trong backend repository để biết thêm chi tiết về:
- Tất cả endpoints
- Request/Response examples
- Database schema
- Stock management flow
- Troubleshooting tips

---

## ✅ Checklist Khởi Chạy

- [ ] Clone backend repository
- [ ] Cài đặt dependencies backend (`npm install`)
- [ ] Tạo file `.env` với MONGO_URI, JWT_SECRET
- [ ] Chạy seeder tạo admin (`seedAdmin()`)
- [ ] Chạy seeder tạo books (`seedBooks()`)
- [ ] Khởi động backend server (`npm run dev`) - port 9500
- [ ] Cài đặt dependencies frontend (`npm install`)
- [ ] Khởi động frontend (`npm run dev`) - port 5173
- [ ] Truy cập http://localhost:5173
- [ ] Login với admin@gmail.com / admin123
- [ ] Test các chức năng

---

**Backend Repository:** https://github.com/MinhQuanUIT/MSIS207.Q14_Backend

**Frontend đã được cấu hình sẵn để kết nối với backend!** 🎉
