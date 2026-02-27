# 📁 Hướng Dẫn Quản Lý Ảnh - KD PROFILE

## 🎯 Cấu Trúc Thư Mục

```
assets/images/
├── executive/          # Ảnh Executive Portraits
│   ├── 1.jpg
│   ├── 2.jpg
│   ├── 3.jpg
│   └── 4.jpg
│
├── corporate/          # Ảnh Corporate Profiles
│   ├── 1.jpg
│   ├── 2.jpg
│   ├── 3.jpg
│   └── 4.jpg
│
├── entrepreneur/       # Ảnh Entrepreneur Portraits
│   ├── 1.jpg
│   ├── 2.jpg
│   ├── 3.jpg
│   └── 4.jpg
│
├── influencer/         # Ảnh Personal Branding/Influencer
│   ├── 1.jpg
│   ├── 2.jpg
│   ├── 3.jpg
│   └── 4.jpg
│
├── before-after/       # Ảnh Before/After comparisons
│   ├── executive-before.jpg
│   ├── executive-after.jpg
│   ├── corporate-before.jpg
│   ├── corporate-after.jpg
│   ├── influencer-before.jpg
│   └── influencer-after.jpg
│
└── blog/              # Ảnh cho Blog/Categories
    ├── executive.jpg
    ├── corporate.jpg
    ├── entrepreneur.jpg
    ├── influencer.jpg
    ├── tips-1.jpg
    └── tips-2.jpg
```

## 📝 File Quản Lý Dữ Liệu: `assets/data.json`

File JSON chứa thông tin về tất cả ảnh. Cấu trúc:

```json
{
  "portfolio": {
    "executive": [...],
    "corporate": [...],
    "entrepreneur": [...],
    "influencer": [...]
  },
  "beforeAfter": [...],
  "blog": [...]
}
```

## 🔧 Cách Thêm Ảnh Mới

### 1️⃣ **Thêm ảnh vào Portfolio Gallery**

**Bước 1:** Copy ảnh vào thư mục tương ứng

```
Ví dụ: Copy file "5.jpg" vào assets/images/executive/
```

**Bước 2:** Cập nhật `assets/data.json`

Thêm object mới vào mảng tương ứng:

```json
{
  "portfolio": {
    "executive": [
      // ... existing items ...
      {
        "id": 5,
        "title": "New Executive Portrait",
        "subtitle": "CEO",
        "image": "assets/images/executive/5.jpg",
        "category": "executive"
      }
    ]
  }
}
```

### 2️⃣ **Thêm ảnh Before/After**

**Bước 1:** Copy 2 ảnh vào `assets/images/before-after/`

```
myexample-before.jpg
myexample-after.jpg
```

**Bước 2:** Cập nhật `assets/data.json`

```json
{
  "beforeAfter": [
    // ... existing items ...
    {
      "id": 4,
      "title": "My Example",
      "before": "assets/images/before-after/myexample-before.jpg",
      "after": "assets/images/before-after/myexample-after.jpg"
    }
  ]
}
```

### 3️⃣ **Thêm Blog Post / Portfolio Category**

**Bước 1:** Copy ảnh vào `assets/images/blog/`

**Bước 2:** Cập nhật `assets/data.json`

```json
{
  "blog": [
    // ... existing items ...
    {
      "id": 7,
      "title": "Tiêu Đề Blog / Danh Mục",
      "category": "Tên Danh Mục",
      "description": "Mô tả ngắn gọn",
      "image": "assets/images/blog/myimage.jpg",
      "link": "#portfolio-link"
    }
  ]
}
```

## 📌 Quy Tắc Đặt Tên File

- **Đặt tên rõ ràng, không dấu cách:** `executive-1.jpg` ✅ vs `Executive 1.jpg` ❌
- **Sử dụng chữ thường:** `portrait.jpg` ✅ vs `PORTRAIT.jpg` ❌
- **Format hình ảnh tốt:**
  - JPG (tối ưu hóa kích thước)
  - PNG (nếu cần transparent)
  - WebP (hiệu suất tốt nhất)

## 🚀 Cách Hoạt động

1. **image-loader.js** tự động:
   - Load dữ liệu từ `assets/data.json`
   - Render các ảnh vào các sections tương ứng
   - Setup gallery filters
   - Setup before/after sliders
   - Setup blog animations

2. **Tự động cập nhật** mà không cần sửa HTML/CSS

3. **Fallback images:** Nếu ảnh không tìm thấy, hiển thị placeholder

## ✏️ Sửa Thông Tin Ảnh

Để sửa title, subtitle, description:
1. Mở file `assets/data.json`
2. Tìm item cần sửa
3. Cập nhật trường tương ứng
4. Lưu file
5. Reload trang web

Ví dụ:
```json
{
  "id": 1,
  "title": "Executive Portrait [UPDATED]",
  "subtitle": "CEO & Founder [NEW]",
  "image": "assets/images/executive/1.jpg",
  "category": "executive"
}
```

## 🗑️ Xóa Ảnh

1. Xóa file ảnh khỏi thư mục
2. Xóa object tương ứng từ `assets/data.json`
3. Reload trang web

## 🖼️ Kích Thước Ảnh Khuyến Nghị

| Loại | Kích Thước | Tỷ Lệ Khía Cạnh |
|------|-----------|--------------|
| Portfolio Gallery | 800x800px | 1:1 |
| Before/After | 800x600px | 4:3 |
| Blog/Blog Cards | 800x500px | 16:10 |
| Thumbnails | 400x400px | 1:1 |

## 💡 Tips Tối Ưu Hóa

1. **Nén ảnh** trước khi upload:
   - Sử dụng TinyPNG, ImageOptim
   - Tiết kiệm dung lượng & tốc độ load

2. **Sử dụng WebP** cho tốc độ tốt nhất:
   - Nhỏ hơn JPG ~25%
   - Hỗ trợ rộng rãi trong browser mới

3. **Đặt tên hệ thống** để dễ quản lý:
   ```
   executive-ceo-john.jpg
   corporate-manager-team.jpg
   influencer-lifestyle-1.jpg
   ```

## ❓ Troubleshooting

**Q: Ảnh không hiển thị?**
- Kiểm tra đường dẫn file trong data.json
- Kiểm tra file ảnh có tồn tại không
- Commit lại trình duyệt (Ctrl+Shift+R)

**Q: Gallery filter không hoạt động?**
- Kiểm tra browser console (F12)
- Đảm bảo file image-loader.js được load
- Kiểm tra data.json syntax (sử dụng JSON validator)

**Q: Before/After slider không chạy?**
- Kiểm tra CSS được load đầy đủ
- Kiểm tra JavaScript không có lỗi

---

**Chúc bạn quản lý ảnh hiệu quả!** 🎉
