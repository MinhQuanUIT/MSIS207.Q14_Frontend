# Cấu Trúc Thư Mục Mới - React Project

## 📁 Tổ Chức Thư Mục

### 1. Pages (src/pages/)
Mỗi page được tổ chức trong folder riêng với cấu trúc:
```
pages/
├── HomePage/
│   ├── index.jsx          # Component chính
│   └── styles.js          # CSS-in-JS styles
├── AboutPage/
│   ├── index.jsx
│   └── styles.js
└── [PageName]/
    ├── index.jsx
    └── styles.js
```

**Ưu điểm:**
- ✅ Tách biệt logic và styles
- ✅ Dễ tìm và sửa code
- ✅ Import gọn: `import HomePage from '../pages/HomePage'`
- ✅ Styles có thể tái sử dụng

**Ví dụ styles.js:**
```javascript
export const styles = {
  container: {
    padding: 20,
    background: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 600
  }
}
```

**Ví dụ index.jsx:**
```jsx
import { styles } from './styles'

export default function HomePage() {
  return <div style={styles.container}>...</div>
}
```

### 2. Components (src/components/)
Tương tự pages, mỗi component trong folder riêng:
```
components/
├── Header/
│   ├── index.jsx
│   └── styles.js
├── CardComponent/
│   ├── index.jsx
│   └── styles.js
└── [ComponentName]/
    ├── index.jsx
    └── styles.js
```

### 3. Features (src/features/)
Giữ nguyên cấu trúc feature-based:
```
features/
├── auth/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── LoginPage.css
├── books/
│   ├── BookListPage.jsx
│   ├── BookDetailPage.jsx
│   └── BookDetailPage.css
```

## 🔄 Migration Plan (Hoàn Thành)

### ✅ Đã Hoàn Thành
- [x] Tạo HomePage/index.jsx + styles.js
- [x] Tạo AboutPage/index.jsx + styles.js
- [x] Cập nhật routes/AppRoutes.jsx
- [x] Xóa files cũ (Home.jsx, About.jsx)
- [x] Test - không có lỗi biên dịch

### 🎯 Trạng Thái Hiện Tại
- ✅ Cấu trúc pages đã clean, chỉ còn folders mới
- ✅ Không có code trùng lặp
- ✅ Tất cả imports đã cập nhật
- ✅ Web chạy không lỗi

## 🔀 Git Workflow An Toàn

### Trước Khi Commit

1. **Kiểm tra status:**
```powershell
git status
```

2. **Xem thay đổi:**
```powershell
git diff
```

3. **Pull code mới nhất từ remote (QUAN TRỌNG):**
```powershell
git pull origin main
```

### Giải Quyết Conflicts (Nếu Có)

**Kịch bản 1: Conflict khi pull**
```powershell
# Git sẽ báo conflict files
git status  # Xem files bị conflict (màu đỏ, có dấu "both modified")

# Mở file conflict, tìm các dòng:
# <<<<<<< HEAD
# ... code của bạn ...
# =======
# ... code từ remote ...
# >>>>>>> origin/main

# Sửa file: giữ lại code cần thiết, xóa các dấu <<<, ===, >>>

# Sau khi sửa xong:
git add .
git commit -m "Resolve merge conflicts"
```

**Kịch bản 2: Muốn giữ code hiện tại**
```powershell
git checkout --ours path/to/file     # Giữ code của bạn
git add path/to/file
```

**Kịch bản 3: Muốn dùng code từ remote**
```powershell
git checkout --theirs path/to/file   # Lấy code từ remote
git add path/to/file
```

### Commit Changes

```powershell
# Stage files
git add .

# Commit với message rõ ràng
git commit -m "refactor: restructure pages to PageName/index.jsx + styles.js pattern"

# Push lên GitHub
git push origin main
```

### Commit Message Conventions

```
feat: thêm tính năng mới
fix: sửa lỗi
refactor: tổ chức lại code (không thay đổi logic)
style: format code, CSS
docs: cập nhật documentation
test: thêm/sửa tests
chore: cập nhật dependencies, config
```

**Ví dụ:**
```powershell
git commit -m "refactor: migrate HomePage and AboutPage to folder structure"
git commit -m "feat: add CSS-in-JS styles pattern for all pages"
git commit -m "docs: update project structure documentation"
```

## 🛡️ Tránh Conflicts

### 1. **Luôn Pull Trước Khi Làm Việc**
```powershell
git pull origin main
```

### 2. **Commit Thường Xuyên**
- Commit sau mỗi feature nhỏ
- Commit message rõ ràng
- Không commit quá nhiều thay đổi cùng lúc

### 3. **Sử Dụng Branches (Tốt Nhất)**
```powershell
# Tạo branch mới cho restructure
git checkout -b refactor/folder-structure

# Làm việc, commit
git add .
git commit -m "refactor: restructure pages folder"

# Push branch
git push origin refactor/folder-structure

# Sau đó tạo Pull Request trên GitHub để review và merge
```

### 4. **Backup Trước Khi Thay Đổi Lớn**
```powershell
# Tạo branch backup
git branch backup/before-restructure

# Hoặc commit trước
git add .
git commit -m "checkpoint: before major restructure"
```

## 🚨 Xử Lý Lỗi Thường Gặp

### Lỗi: "Your local changes would be overwritten"
```powershell
# Stash changes tạm thời
git stash

# Pull code mới
git pull origin main

# Apply lại changes
git stash pop

# Nếu có conflict, giải quyết như trên
```

### Lỗi: "Failed to push - rejected"
```powershell
# Remote có code mới hơn, cần pull trước
git pull origin main

# Giải quyết conflicts (nếu có)
# Sau đó push lại
git push origin main
```

### Lỗi: "Divergent branches"
```powershell
# Cấu hình merge strategy
git config pull.rebase false  # Dùng merge (khuyến nghị cho team)

# Hoặc
git config pull.rebase true   # Dùng rebase (cho solo dev)

# Sau đó pull lại
git pull origin main
```

## 📊 Current Structure (Clean)

### ✅ Cấu Trúc Hiện Tại
```
src/
├── pages/
│   ├── HomePage/
│   │   ├── index.jsx         ✅ Component chính
│   │   └── styles.js         ✅ CSS-in-JS
│   └── AboutPage/
│       ├── index.jsx         ✅ Component chính
│       └── styles.js         ✅ CSS-in-JS
├── features/
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── LoginPage.css
│   ├── books/
│   │   ├── BookListPage.jsx
│   │   ├── BookDetailPage.jsx
│   │   └── BookDetailPage.css
│   ├── cart/
│   │   └── CartPage.jsx
│   └── admin/
│       ├── DashboardPage.jsx
│       └── BooksManagementPage.jsx
└── components/
    ├── CardComponent/
    ├── SliderComponent/
    ├── NavbarComponent/
    └── layout/
        └── Header/
```

### ❌ Files Đã Xóa
- ~~src/pages/Home.jsx~~ (đã migrate → HomePage/index.jsx)
- ~~src/pages/About.jsx~~ (đã migrate → AboutPage/index.jsx)

### ✅ Lợi Ích
- Không còn code trùng lặp
- Cấu trúc rõ ràng, dễ quản lý
- Import paths nhất quán

## 🎯 Next Steps

1. **Test ứng dụng:**
```powershell
npm run dev
```

2. **Kiểm tra các routes:**
- http://localhost:5174/ (HomePage)
- http://localhost:5174/about (AboutPage)

3. **Commit changes:**
```powershell
git add .
git commit -m "refactor: migrate pages to folder structure with CSS-in-JS"
git pull origin main  # LUÔN PULL TRƯỚC
git push origin main
```

## 📞 Support

Nếu gặp conflicts hoặc lỗi Git:
1. Chụp màn hình lỗi
2. Chạy `git status` để xem trạng thái
3. ĐỪNG force push (`git push -f`) trừ khi chắc chắn

---

**Lưu ý:** File này được tạo tự động khi restructure project. Cập nhật theo tiến độ thực tế.
