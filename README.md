# 📖 README - Hệ Thống Quản Lý Ảnh Tự Động

## 🎯 Tổng Quan

Hệ thống này cho phép bạn:
- ✅ Copy ảnh vào các thư mục `assets/images/`
- ✅ Cập nhật file `assets/data.json`
- ✅ **Tự động render** ảnh lên website mà không cần sửa HTML/CSS
- ✅ Dễ dàng **thêm/sửa/xóa** ảnh
- ✅ Quản lý portfolio, blog, before/after centrally

---

## 📂 Cấu Trúc Thư Mục

```
d:\GIT\KDP\
├── assets/
│   ├── images/
│   │   ├── executive/          # 🎬 Ảnh Executive
│   │   ├── corporate/          # 💼 Ảnh Corporate
│   │   ├── entrepreneur/       # 🚀 Ảnh Entrepreneur
│   │   ├── influencer/         # ⭐ Ảnh Influencer
│   │   ├── before-after/       # 🔄 Before/After comparisons
│   │   └── blog/               # 📝 Ảnh Blog/Categories
│   ├── icons/
│   └── data.json               # 📋 Dữ liệu tập trung
│
├── css/
│   └── styles.css
│
├── js/
│   ├── script.js
│   └── image-loader.js         # 🔧 Tự động load ảnh từ JSON
│
├── index.html
├── HUONG_DAN_ANH.md           # 📘 Hướng dẫn chi tiết
└── README.md                   # 📄 File này
```

---

## 🚀 Bắt Đầu Nhanh

### 1️⃣ **Chuẩn Bị Ảnh**

Chuẩn bị ảnh của bạn:
- **Executive:** 4+ ảnh (1600x1600px hoặc 800x800px)
- **Corporate:** 4+ ảnh
- **Entrepreneur:** 4+ ảnh
- **Influencer:** 4+ ảnh
- **Before/After:** Cặp ảnh (before + after)
- **Blog:** 6+ ảnh thumbnail

### 2️⃣ **Đặt Ảnh Vào Thư Mục**

```
📂 assets/images/executive/
   ├─ 1.jpg
   ├─ 2.jpg
   ├─ 3.jpg
   └─ 4.jpg
```

### 3️⃣ **Cập Nhật `assets/data.json`**

Mở file `assets/data.json` và thêm:

```json
{
  "portfolio": {
    "executive": [
      {
        "id": 1,
        "title": "CEO Portrait",
        "subtitle": "Tech Startup Founder",
        "image": "assets/images/executive/1.jpg",
        "category": "executive"
      },
      // ... more items
    ]
  }
}
```

### 4️⃣ **Reload Website**

Lưu file → Refresh trình duyệt (Ctrl+R)

✨ **Xong! Ảnh tự động hiển thị!**

---

## 📝 Format Data.json Chi Tiết

### Portfolio (Gallery)

```json
{
  "portfolio": {
    "executive": [
      {
        "id": 1,                                    // ID duy nhất
        "title": "Executive Portrait",             // Tiêu đề ảnh
        "subtitle": "CEO & Founder",              // Mô tả ngắn
        "image": "assets/images/executive/1.jpg", // Đường dẫn ảnh
        "category": "executive"                    // Danh mục (filter)
      }
    ],
    "corporate": [...],
    "entrepreneur": [...],
    "influencer": [...]
  }
}
```

### Before/After

```json
{
  "beforeAfter": [
    {
      "id": 1,
      "title": "Executive Portrait",
      "before": "assets/images/before-after/exec-before.jpg",
      "after": "assets/images/before-after/exec-after.jpg"
    }
  ]
}
```

### Blog/Categories

```json
{
  "blog": [
    {
      "id": 1,
      "title": "Bộ Sưu Tập Executive",
      "category": "Executive",           // Classify tag
      "description": "40+ ảnh chuyên...", // Mô tả chi tiết
      "image": "assets/images/blog/executive.jpg",
      "link": "#executive-portfolio"     // Link đên section
    }
  ]
}
```

---

## 🎬 Cách Thêm Ảnh Mới

### Thêm vào Portfolio Gallery

**Bước 1:** Copy ảnh vào thư mục
```
📂 assets/images/executive/
   └─ my-new-photo.jpg
```

**Bước 2:** Cập nhật `assets/data.json`
```json
{
  "portfolio": {
    "executive": [
      // ... existing items ...
      {
        "id": 5,
        "title": "My New Executive",
        "subtitle": "VP Sales",
        "image": "assets/images/executive/my-new-photo.jpg",
        "category": "executive"
      }
    ]
  }
}
```

**Bước 3:** Lưu & Refresh ✅

---

## 📊 Danh Sách Các Danh Mục

| Danh Mục | Folder | Filter | Ví Dụ |
|----------|--------|--------|-------|
| Executive | `executive/` | `executive` | CEO, Founder, Director |
| Corporate | `corporate/` | `corporate` | Manager, Employee, Team |
| Entrepreneur | `entrepreneur/` | `entrepreneur` | Startup, Founder, SME |
| Influencer | `influencer/` | `influencer` | Content Creator, Blogger |
| Blog | `blog/` | N/A | Category images |
| Before/After | `before-after/` | N/A | Comparison pairs |

---

## ✏️ Sửa Thông Tin Ảnh

Chỉ cần sửa file `assets/data.json`:

```json
// Trước:
{
  "title": "CEO Portrait",
  "subtitle": "Founder"
}

// Sau:
{
  "title": "Chief Executive Officer Portrait",
  "subtitle": "Tech Startup Founder & Investor"
}
```

Lưu → Refresh → **Cập nhật ngay!** 🎉

---

## 🗑️ Xóa Ảnh

1. **Xóa file ảnh** khỏi thư mục
2. **Xóa entry** từ `assets/data.json`
3. **Lưu & Refresh**

---

## 🖼️ Kích Thước Ảnh Tối Ưu

| Loại | Kích Thước | Tỷ Lệ | Format |
|------|-----------|-------|--------|
| **Portfolio** | 800x800 | 1:1 | JPG/WebP |
| **Before/After** | 800x600 | 4:3 | JPG |
| **Blog Thumbnail** | 800x500 | 16:10 | JPG |
| **Preview** | 400x400 | 1:1 | JPG |

**💡 Tip:** Nén ảnh với TinyPNG trước khi upload!

---

## ⚙️ Cách Hoạt động (Technical)

1. **Khi trang load:**
   - `image-loader.js` fetch dữ liệu từ `assets/data.json`
   - Tạo HTML elements động cho mỗi ảnh
   - Gắn event listeners (filters, sliders, etc.)

2. **Tối ưu:**
   - Lazy loading images
   - Onerror fallback cho missing images
   - Smooth transitions & animations

3. **Lợi ích:**
   - Không cần sửa HTML
   - Không cần sửa CSS
   - Chỉnh trung tâm từ 1 file JSON
   - Dễ scale lên khi thêm ảnh

---

## 🐛 Troubleshooting

| Vấn đề | Nguyên nhân | Giải pháp |
|--------|-----------|----------|
| ❌ Ảnh không hiển thị | Đường dẫn sai | Kiểm tra path trong JSON |
| ❌ Gallery không filter | Syntax JSON sai | Validate JSON (jsonlint.com) |
| ❌ Before/After không load | CSS bị override | Check browser DevTools |
| ⚠️ Load chậm | Ảnh quá lớn | Nén ảnh (<500KB mỗi file) |

---

## 📱 Responsive

Website tự động responsive cho:
- 📱 Mobile (< 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (> 1024px)

Ảnh sẽ tự scale theo screen size!

---

## 🔒 Best Practices

✅ **Làm:**
- Đặt tên file rõ ràng: `executive-01.jpg`
- Validate JSON trước update
- Backup `data.json` trước sửa lớn
- Sử dụng relative paths

❌ **Không làm:**
- Sửa HTML trực tiếp (edit JSON)
- Đổi tên thư mục (sẽ break paths)
- Upload ảnh quá lớn (> 2MB)
- Để dấu cách trong tên file

---

## 📞 Support

Nếu có vấn đề:
1. Kiểm tra **HUONG_DAN_ANH.md** chi tiết
2. Validate JSON tại **jsonlint.com**
3. Kiểm tra browser console (F12 > Console)
4. Xem network request (F12 > Network)

---

**Chúc bạn quản lý ảnh dễ dàng! 🚀**

*Tạo ngày: 27/02/2026*
*Version: 1.0*
"# kdp" 
