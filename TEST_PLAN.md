# 🧪 Test Plan - Kết nối Frontend với Backend

## Mục tiêu
Kiểm tra Frontend đã kết nối thành công với Backend API

---

## ✅ Pre-requisites (Điều kiện tiên quyết)

- [ ] Backend đang chạy trên port 9500
- [ ] MongoDB đã kết nối thành công
- [ ] Đã chạy seeder tạo dữ liệu mẫu (`node seeder.js`)
- [ ] Frontend đang chạy trên port 5174

---

## 📝 Test Cases

### 1️⃣ Test Authentication (Đăng nhập/Đăng ký)

#### TC1.1: Đăng ký tài khoản mới
**Steps:**
1. Truy cập: http://localhost:5174/register
2. Nhập thông tin:
   - Họ tên: `Test User`
   - Email: `testuser@gmail.com`
   - Số điện thoại: `0123456789`
   - Mật khẩu: `123456`
   - Xác nhận mật khẩu: `123456`
3. Click "Đăng ký"

**Expected Result:**
- ✅ API Call: `POST http://localhost:9500/api/auth/register`
- ✅ Status: 201 Created
- ✅ Response: `{token: "...", role: "user"}`
- ✅ Redirect về trang chủ hoặc hiển thị thông báo thành công
- ✅ localStorage có `token` và `role`

**Check:**
```javascript
// Mở Console (F12) và gõ:
localStorage.getItem('token')
localStorage.getItem('role')
```

---

#### TC1.2: Đăng nhập với Admin (từ seeder)
**Steps:**
1. Truy cập: http://localhost:5174/login
2. Nhập:
   - Email: `admin@gmail.com`
   - Password: `admin123`
3. Click "Đăng nhập"

**Expected Result:**
- ✅ API Call: `POST http://localhost:9500/api/auth/login`
- ✅ Status: 200 OK
- ✅ Response: `{token: "...", role: "admin"}`
- ✅ Header hiển thị tên user thay vì "Tài khoản"
- ✅ Dropdown menu có "Quản trị" (chỉ admin)

---

#### TC1.3: Kiểm tra token invalid
**Steps:**
1. Xóa token: `localStorage.clear()`
2. Truy cập: http://localhost:5174/account

**Expected Result:**
- ✅ Redirect về `/login`
- ✅ Hiển thị message: "Vui lòng đăng nhập để tiếp tục"

---

### 2️⃣ Test Books API (Danh sách sách)

#### TC2.1: Load danh sách sách
**Steps:**
1. Truy cập: http://localhost:5174/books

**Expected Result:**
- ✅ API Call: `GET http://localhost:9500/api/books`
- ✅ Status: 200 OK
- ✅ Response: `{success: true, data: [...], total: 50, count: 10}`
- ✅ Hiển thị 10 cuốn sách đầu tiên (từ seeder)
- ✅ Có pagination phân trang

**Check Console:**
```
Network → books → Preview tab
```

---

#### TC2.2: Tìm kiếm sách
**Steps:**
1. Ở trang `/books`
2. Nhập vào ô search: `Harry Potter`
3. Click nút tìm kiếm

**Expected Result:**
- ✅ API Call: `GET http://localhost:9500/api/books?search=Harry%20Potter`
- ✅ Status: 200 OK
- ✅ Chỉ hiển thị sách có từ "Harry Potter" trong title/author

---

#### TC2.3: Sắp xếp sách
**Steps:**
1. Ở trang `/books`
2. Click dropdown "Sắp xếp"
3. Chọn "Giá: Thấp đến cao"

**Expected Result:**
- ✅ API Call: `GET http://localhost:9500/api/books?sort=price`
- ✅ Sách hiển thị theo giá tăng dần

---

### 3️⃣ Test Account Page (Trang tài khoản)

#### TC3.1: Xem thông tin profile
**Steps:**
1. Đăng nhập với `admin@gmail.com`
2. Click dropdown user → "Tài khoản của tôi"
3. Hoặc truy cập: http://localhost:5174/account

**Expected Result:**
- ✅ API Call: `GET http://localhost:9500/api/auth/profile`
- ✅ Status: 200 OK
- ✅ Response: `{success: true, data: {name, email, phone, role, isActive}}`
- ✅ Hiển thị đúng thông tin user
- ✅ Có badge "ADMIN" nếu role = admin

---

#### TC3.2: Cập nhật thông tin
**Steps:**
1. Ở tab "Thông tin cá nhân"
2. Sửa:
   - Họ tên: `Admin Updated`
   - Số điện thoại: `0999888777`
3. Click "Cập nhật thông tin"

**Expected Result:**
- ✅ API Call: `PUT http://localhost:9500/api/users/:userId`
- ✅ Body: `{name: "Admin Updated", phone: "0999888777"}`
- ✅ Status: 200 OK
- ✅ Hiển thị message: "Cập nhật thông tin thành công!"
- ✅ Thông tin hiển thị đã đổi

---

#### TC3.3: Xem đơn hàng
**Steps:**
1. Click tab "Đơn hàng của tôi"

**Expected Result:**
- ✅ API Call: `GET http://localhost:9500/api/orders/my-orders`
- ✅ Status: 200 OK
- ✅ Nếu chưa có đơn: Hiển thị "Bạn chưa có đơn hàng nào"
- ✅ Nếu có đơn: Hiển thị table với orderId, date, total, status

---

### 4️⃣ Test Admin Panel (Trang quản trị)

#### TC4.1: Truy cập admin (chỉ admin)
**Steps:**
1. Đăng nhập với `admin@gmail.com`
2. Truy cập: http://localhost:5174/admin

**Expected Result:**
- ✅ Load trang admin thành công
- ✅ Hiển thị sidebar menu

---

#### TC4.2: Quản lý sách
**Steps:**
1. Ở admin, click "Quản lý sách"

**Expected Result:**
- ✅ API Call: `GET http://localhost:9500/api/books?limit=1000`
- ✅ Hiển thị table với tất cả sách
- ✅ Có nút "Thêm sách mới", "Sửa", "Xóa"

---

#### TC4.3: User không phải admin không vào được
**Steps:**
1. Đăng ký user mới (không phải admin)
2. Truy cập: http://localhost:5174/admin

**Expected Result:**
- ✅ Bị chặn hoặc redirect
- ✅ Hiển thị thông báo "Access denied"

---

## 🔍 Debugging Tips

### Nếu thấy "Backend not available, using mock auth"
→ Backend chưa chạy hoặc sai port

**Fix:**
```bash
cd C:\Users\quanm\MSIS207.Q14_Backend
npm run dev
```

### Nếu thấy 401 Unauthorized
→ Token hết hạn hoặc không hợp lệ

**Fix:**
```javascript
localStorage.clear()
// Đăng nhập lại
```

### Nếu thấy 500 Internal Server Error
→ Backend có lỗi, check terminal backend

**Fix:** Xem log trong terminal backend

### Nếu CORS error
→ Backend chưa enable CORS cho localhost:5174

**Fix:** Kiểm tra backend có `app.use(cors())` chưa

---

## 📊 Test Summary Template

```
✅ PASS | TC1.1: Đăng ký tài khoản mới
✅ PASS | TC1.2: Đăng nhập admin
✅ PASS | TC2.1: Load danh sách sách
❌ FAIL | TC2.2: Tìm kiếm sách - Backend trả về 500
✅ PASS | TC3.1: Xem profile
...
```

---

## 🎯 Kết luận

**Frontend kết nối thành công với Backend khi:**
- ✅ Tất cả API calls có status 200/201
- ✅ Không thấy log "Backend not available, using mock"
- ✅ Dữ liệu hiển thị từ backend (không phải mock)
- ✅ Token được lưu vào localStorage
- ✅ Protected routes hoạt động đúng

**Nếu có bất kỳ ❌ FAIL nào → Cần fix trước khi deploy!**
