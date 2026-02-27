# ⚡ Bắt Đầu Nhanh - Tự Động Hóa Data.json

## 🎯 Quy Trình Siêu Nhanh

### **Bước 1: Copy Ảnh**
```
📂 assets/images/executive/ → Copy 4 ảnh: 1.jpg, 2.jpg, 3.jpg, 4.jpg
📂 assets/images/corporate/ → Copy 4 ảnh
📂 assets/images/entrepreneur/ → Copy ảnh
📂 assets/images/influencer/ → Copy ảnh
📂 assets/images/before-after/ → Copy cặp: exec-before.jpg + exec-after.jpg
📂 assets/images/blog/ → Copy 6 ảnh
```

### **Bước 2: Chạy Tự Động**
```bash
cd d:\GIT\KDP
node auto-generate-data.js
```

### **Bước 3: Xong! ✨**
```
Refresh website → Ảnh tự động hiển thị
```

---

## 📋 Đặt Tên Ảnh Đúng Cách

| Loại | Quy Tắc | Ví Dụ |
|------|---------|-------|
| **Portfolio** | Đơn giản | `1.jpg, 2.jpg, 3.jpg, 4.jpg` |
| **Before/After** | `{tên}-before.jpg` + `{tên}-after.jpg` | `exec-before.jpg` + `exec-after.jpg` |
| **Blog** | Tên category | `executive.jpg, corporate.jpg` |

---

## 🤖 Tính Năng Tự Động

✅ Auto-sinh ID (1, 2, 3, ...)
✅ Auto-tạo title thông minh
✅ Auto-pair before/after
✅ Auto-detect blog categories
✅ Auto-sinh subtitle theo loại

---

## 📞 Lệnh Hay Dùng

```bash
# Tạo/cập nhật data.json
node auto-generate-data.js

# Xem file được tạo
type assets/data.json

# Kiểm tra thư mục ảnh
dir assets/images
```

---

## ⚠️ Điều Cần Biết

- Script sẽ **ghi đè data.json** cũ
- Nên chỉnh title/subtitle **sau** khi auto-generate
- Hoặc auto-generate → sửa → refresh website

---

## 🎓 Hướng Dẫn Chi Tiết

Xem file: **[AUTO_GENERATE_GUIDE.md](AUTO_GENERATE_GUIDE.md)**

---

**Chỉ 1 lệnh! Không cần tay edit JSON! 🚀**
