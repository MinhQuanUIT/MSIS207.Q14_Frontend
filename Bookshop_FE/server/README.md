# Mock Backend Server

Mock server đơn giản để test frontend mà không cần backend thật.

## Khởi Chạy

**Terminal 1 - Mock Backend:**
```powershell
node c:\Users\quanm\MSIS207.Q14_Frontend\Bookshop_FE\server\mock-server.cjs
```

**Terminal 2 - Frontend:**
```powershell
cd c:\Users\quanm\MSIS207.Q14_Frontend\Bookshop_FE
npm run dev
```

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Đăng ký tài khoản
  ```json
  {
    "name": "Nguyễn Văn A",
    "email": "test@example.com",
    "phone": "0123456789",
    "password": "123456"
  }
  ```

- **POST** `/api/auth/login` - Đăng nhập
  ```json
  {
    "email": "test@example.com",
    "password": "123456"
  }
  ```

- **GET** `/api/auth/me` - Lấy thông tin user hiện tại (cần token)

### Books

- **GET** `/api/books` - Lấy danh sách sách
  - Query params: `search`, `category`, `page`, `limit`

- **GET** `/api/books/:id` - Lấy chi tiết sách

### Cart

- **GET** `/api/cart` - Lấy giỏ hàng (cần token)
- **POST** `/api/cart/items` - Thêm sản phẩm vào giỏ (cần token)

## Test Đăng Ký

1. Mở http://localhost:5174/register
2. Điền thông tin:
   - Họ tên: `Nguyễn Văn A`
   - Email: `test@gmail.com`
   - Số điện thoại: `0123456789`
   - Mật khẩu: `123456`
   - Xác nhận: `123456`
3. Click "Đăng ký"
4. Nếu thành công → chuyển đến trang login
5. Thử đăng ký lại với cùng email → báo lỗi "Email đã được sử dụng!"

## Test Đăng Nhập

1. Mở http://localhost:5174/login
2. Nhập email: `test@gmail.com`, password: `123456`
3. Click "Đăng nhập"
4. Nếu thành công → lưu token vào localStorage

## Kiểm Tra Logs

Mở terminal chạy mock server để xem logs:
- `📝 Registration request:` - có request đăng ký
- `✅ User registered successfully:` - đăng ký thành công
- `📊 Total users:` - tổng số user đã đăng ký
- `🔐 Login request:` - có request đăng nhập
- `✅ User logged in:` - đăng nhập thành công

## Debug Frontend

**DevTools Console:**
- Mở F12 → Console
- Xem log: `Registration error:` (nếu có lỗi)

**DevTools Network:**
- Mở F12 → Network
- Xem request `POST /api/auth/register`
- Kiểm tra Request Payload (không có `confirmPassword`)
- Kiểm tra Response (status 201 nếu thành công, 400 nếu lỗi)

## Dữ Liệu Mẫu

Server đã load 3 cuốn sách mẫu:
- Clean Code (Robert C. Martin)
- Design Patterns (Gang of Four)
- The Pragmatic Programmer (Andrew Hunt)

## Lưu Ý

- Dữ liệu lưu trong RAM (in-memory), restart server sẽ mất hết
- Token là mock token, chỉ để test
- Password không được hash (chỉ để demo)
- CORS đã được enable cho tất cả origins
