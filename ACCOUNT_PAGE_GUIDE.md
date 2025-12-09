# 📄 Account Page Documentation

## Tổng Quan

Account Page là trang quản lý thông tin cá nhân của người dùng, được tích hợp đầy đủ với backend API.

## Đường Dẫn

```
/account
```

## Tính Năng

### 1. Tab Thông Tin Cá Nhân

#### Hiển Thị Thông Tin
- **Avatar**: Icon người dùng với màu xanh
- **Tên người dùng**: Lấy từ `user.name`
- **Email**: Lấy từ `user.email`
- **Vai trò**: Hiển thị badge "ADMIN" nếu `user.role === 'admin'`

#### Thông Tin Chi Tiết (Descriptions)
- Họ tên
- Email
- Số điện thoại (hiển thị "Chưa cập nhật" nếu null)
- Vai trò (Admin/Người dùng)
- Trạng thái (Active/Inactive với tag màu)

#### Form Cập Nhật
**Trường dữ liệu:**
- `name`: Họ tên (required, max 50 ký tự)
- `phone`: Số điện thoại (optional, 10 chữ số)

**Validation:**
```javascript
name: [
  { required: true, message: 'Vui lòng nhập họ tên' },
  { max: 50, message: 'Họ tên không được quá 50 ký tự' }
]

phone: [
  { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có 10 chữ số' }
]
```

**API Call:**
```javascript
PUT /api/users/:userId
Body: { name, phone }
Response: { success: true, data: updatedUser }
```

### 2. Tab Đơn Hàng Của Tôi

#### Lazy Loading
- Chỉ fetch orders khi user click vào tab lần đầu
- Sử dụng `handleTabChange` để trigger API call

#### Trạng Thái Hiển Thị

**Loading State:**
```jsx
<Spin />
<p>Đang tải đơn hàng...</p>
```

**Empty State:**
```jsx
<ShoppingOutlined />
<p>Bạn chưa có đơn hàng nào</p>
```

**Table Columns:**
- Mã đơn (`orderId`)
- Ngày đặt (`date` - formatted as `DD/MM/YYYY`)
- Số sản phẩm (`items.length`)
- Tổng tiền (formatted với `.toLocaleString('vi-VN')`)
- Trạng thái với color tag:
  - `pending`: Gold - "Chờ xử lý"
  - `paid`: Blue - "Đã thanh toán"
  - `delivered`: Green - "Đã giao hàng"
  - `cancelled`: Red - "Đã hủy"

**API Call:**
```javascript
GET /api/orders/my-orders
Response: {
  message: 'Your orders retrieved successfully',
  count: 3,
  orders: [
    {
      _id: '...',
      user: '...',
      items: [{book, qty, price}],
      totalPrice: 350000,
      status: 'delivered',
      createdAt: '2024-12-01T...'
    }
  ]
}
```

### 3. Tab Đổi Mật Khẩu

#### Form Fields
- `currentPassword`: Mật khẩu hiện tại (required)
- `newPassword`: Mật khẩu mới (required, min 6 ký tự)
- `confirmPassword`: Xác nhận mật khẩu (phải khớp với newPassword)

#### Validation
```javascript
newPassword: [
  { required: true, message: 'Vui lòng nhập mật khẩu mới' },
  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
]

confirmPassword: [
  { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('newPassword') === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'))
    },
  })
]
```

#### API Call
```javascript
PUT /api/users/:userId
Body: { password: newPassword }
Response: { success: true, data: updatedUser }
```

**Note:** Backend chỉ cần `password` field, không cần `currentPassword`

## Backend Integration

### User Model (Backend)
```javascript
{
  _id: ObjectId,
  name: String (required, max 50),
  email: String (required, unique),
  phone: String (optional, 10 digits),
  password: String (hashed, min 6),
  role: 'user' | 'admin' (default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### API Endpoints Used

#### 1. Get Profile
```bash
GET /api/auth/profile
Headers: Authorization: Bearer <token>
Response: {
  success: true,
  data: {
    _id: '...',
    name: 'Nguyễn Văn A',
    email: 'user@gmail.com',
    phone: '0123456789',
    role: 'user',
    isActive: true
  }
}
```

#### 2. Update Profile
```bash
PUT /api/users/:userId
Headers: Authorization: Bearer <token>
Body: {
  name: 'Nguyễn Văn B',
  phone: '0987654321'
}
Response: {
  success: true,
  data: { ...updatedUser }
}
```

#### 3. Get My Orders
```bash
GET /api/orders/my-orders
Headers: Authorization: Bearer <token>
Response: {
  message: 'Your orders retrieved successfully',
  count: 3,
  orders: [...]
}
```

## State Management

### Local State
```javascript
const [user, setUser] = useState(null)           // User profile data
const [orders, setOrders] = useState([])         // Orders list
const [loading, setLoading] = useState(true)     // Profile loading
const [ordersLoading, setOrdersLoading] = useState(false) // Orders loading
```

### Redux State (Read Only)
```javascript
const currentUser = useSelector((state) => state.auth.user)
// Used for initial authentication check
```

## Lifecycle

1. **Component Mount**
   - `useEffect` runs
   - Calls `fetchProfile()`
   - Sets loading state
   - Updates form initial values

2. **Tab Change to Orders**
   - User clicks "Đơn hàng của tôi" tab
   - `handleTabChange('2')` fires
   - If `orders.length === 0`, calls `fetchOrders()`
   - Shows loading spinner
   - Displays orders table

3. **Profile Update**
   - User edits form
   - Clicks "Cập nhật thông tin"
   - Validates fields
   - Calls `handleUpdateProfile(values)`
   - API PUT request
   - Updates local state
   - Shows success message

4. **Password Change**
   - User fills password form
   - Validates: min 6 chars, confirm match
   - Calls `handleChangePassword(values)`
   - API PUT with `{password: newPassword}`
   - Resets form
   - Shows success message

## Error Handling

### Profile Fetch Error
```javascript
catch (error) {
  console.error('Error fetching profile:', error)
  message.error('Không thể tải thông tin người dùng')
}
```

### Orders Fetch Error
```javascript
catch (error) {
  console.error('Error fetching orders:', error)
  message.error('Không thể tải danh sách đơn hàng')
}
```

### Update Profile Error
```javascript
catch (error) {
  console.error('Error updating profile:', error)
  message.error('Cập nhật thông tin thất bại')
}
```

### Change Password Error
```javascript
catch (error) {
  console.error('Error changing password:', error)
  message.error('Đổi mật khẩu thất bại')
}
```

## UI/UX Features

### Loading States
- Profile loading: Full page spinner with "Đang tải thông tin..."
- Orders loading: Spinner in card with "Đang tải đơn hàng..."

### Empty States
- No orders: Shopping icon + "Bạn chưa có đơn hàng nào"

### Success Messages
- Update profile: "Cập nhật thông tin thành công!"
- Change password: "Đổi mật khẩu thành công!"

### Responsive Design
- Desktop: 3 tabs side by side
- Mobile (<768px): Stacked layout

## Testing

### Test Cases

1. **Profile Load**
   - ✅ Fetches data from `/api/auth/profile`
   - ✅ Displays user name, email, phone, role, status
   - ✅ Shows loading spinner during fetch

2. **Profile Update**
   - ✅ Validates name (required, max 50)
   - ✅ Validates phone (10 digits, optional)
   - ✅ Sends PUT request to `/api/users/:id`
   - ✅ Updates local state
   - ✅ Shows success message

3. **Orders Tab**
   - ✅ Lazy loads on first tab switch
   - ✅ Fetches from `/api/orders/my-orders`
   - ✅ Transforms data for table
   - ✅ Shows empty state if no orders
   - ✅ Displays status tags with correct colors

4. **Password Change**
   - ✅ Validates new password (min 6)
   - ✅ Validates confirm password (must match)
   - ✅ Sends PUT with {password: newPassword}
   - ✅ Resets form on success
   - ✅ Shows success message

## File Structure

```
src/
├── features/
│   └── account/
│       ├── AccountPage.jsx      # Main component
│       └── AccountPage.css      # Styling
├── services/
│   ├── user.service.js          # User API calls
│   └── order.service.js         # Order API calls
└── routes/
    └── AppRoutes.jsx            # Route definition
```

## Dependencies

```json
{
  "react": "^18.x",
  "react-redux": "^9.x",
  "antd": "^5.x",
  "axios": "^1.x"
}
```

## Navigation

### From Header
```jsx
<Dropdown menu={{ items: userMenuItems }}>
  {isAuthenticated && (
    <Link to="/account">Tài khoản của tôi</Link>
  )}
</Dropdown>
```

### Direct URL
```
http://localhost:5173/account
```

## Future Enhancements

- [ ] Order detail modal
- [ ] Cancel order button for pending orders
- [ ] Upload avatar image
- [ ] Email verification before password change
- [ ] Activity log/history
- [ ] Address management with multiple addresses
- [ ] Notification preferences
