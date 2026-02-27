# 📚 Tài Liệu Toàn Diện Hệ Thống KD PROFILE

## 🎯 Nội Dung Chính

0. **[QUICK_START.md](QUICK_START.md)** ⚡ - **TRONG 3 PHÚT!**
1. **[AUTO_GENERATE_GUIDE.md](AUTO_GENERATE_GUIDE.md)** 🤖 - Hướng dẫn tự động hóa chi tiết
2. **[COMPARISON.md](COMPARISON.md)** 📊 - So sánh tự tay vs tự động
3. **[README.md](README.md)** 📖 - Tổng quan hệ thống
4. **[EMAIL_SETUP.md](EMAIL_SETUP.md)** 📧 - Cấu hình gửi email
5. **[HUONG_DAN_ANH.md](HUONG_DAN_ANH.md)** 🖼️ - Hướng dẫn ảnh (cũ, không dùng)

---

## 🚀 Bắt Đầu Trong 5 Phút

### **5️⃣ Bước Đơn Giản**

```
1. 📁 Copy ảnh vào thư mục (assets/images/)
   ├── executive/1.jpg, 2.jpg, 3.jpg, 4.jpg
   ├── corporate/1.jpg, 2.jpg, ...
   ├── entrepreneur/...
   ├── influencer/...
   ├── before-after/exec-before.jpg + exec-after.jpg
   └── blog/executive.jpg, corporate.jpg, ...

2. 🖥️ Mở PowerShell / Terminal tại d:\GIT\KDP

3. ⚡ Chạy lệnh:
   node auto-generate-data.js

4. 🌐 Refresh website (Ctrl+R)

5. ✨ Hoàn tất! Ảnh tự động hiển thị
```

---

## 📋 File Cấu Trúc Dự Án

```
d:\GIT\KDP\
│
├── 📄 index.html                     ← Website chính
├── 📁 css/styles.css                 ← Styling
├── 📁 js/
│   ├── script.js                     ← Logic chung
│   └── image-loader.js               ← Load ảnh từ JSON
│
├── 📁 assets/
│   ├── data.json                     ← 📊 Dữ liệu tập trung
│   └── images/
│       ├── executive/                ← 🎬 Ảnh Executive (1.jpg, 2.jpg, ...)
│       ├── corporate/                ← 💼 Ảnh Corporate
│       ├── entrepreneur/             ← 🚀 Ảnh Entrepreneur
│       ├── influencer/               ← ⭐ Ảnh Influencer
│       ├── before-after/             ← 🔄 Cặp before/after
│       └── blog/                     ← 📝 Ảnh Blog
│
├── 📄 auto-generate-data.js          ← 🤖 Script tự động hóa
│
├── 📚 QUICK_START.md                 ← ⚡ Bắt đầu nhanh
├── 📚 AUTO_GENERATE_GUIDE.md         ← 🤖 Hướng dẫn chi tiết
├── 📚 COMPARISON.md                  ← 📊 So sánh
├── 📚 README.md                      ← 📖 Tổng quan
├── 📚 EMAIL_SETUP.md                 ← 📧 Cấu hình email
└── 📚 HUONG_DAN_ANH.md              ← 🖼️ Hướng dẫn ảnh (legacy)
```

---

## 🎯 Quy Trình Hoạt Động

### **User Flow:**
```
Khách hàng truy cập website
    ↓
Xem portfolio, before/after, blog
    ↓
Submit form liên hệ
    ↓
Email tự động gửi → tr.nhutuan@gmail.com
    ↓
Bạn nhận được request
```

### **Admin Flow (Thêm Ảnh Mới):**
```
1. Copy ảnh vào thư mục
   assets/images/{category}/
    ↓
2. Chạy: node auto-generate-data.js
    ↓
3. Script scan ảnh → Generate data.json
    ↓
4. Refresh website
    ↓
5. ✨ Ảnh tự động hiển thị
```

---

## 🔑 Key Features

### ✅ **Tự Động Hóa Data.json**
- Scan thư mục ảnh
- Auto-generate entries
- Auto-pair before/after
- Không cần edit JSON tay

### ✅ **Email Tự Động**
- Khách gửi form → Email tới bạn
- Sử dụng EmailJS (miễn phí)
- Cấu hình 1 lần, sau đó tự chạy

### ✅ **Responsive Design**
- Mobile, Tablet, Desktop
- Ảnh tự scale
- Navigation hoạt động trên tất cả devices

### ✅ **Gallery Filters**
- Filter theo danh mục
- Smooth animations
- User-friendly

### ✅ **Before/After Slider**
- Range slider interactive
- Responsive layout
- Smooth transitions

### ✅ **Professional Design**
- Luxury aesthetic
- Gold color scheme
- Modern typography

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Data** | JSON (assets/data.json) |
| **Images** | JPG, PNG, WebP |
| **Email** | EmailJS (3rd party service) |
| **Build** | Node.js (automation script) |
| **Hosting** | Any static web host |

---

## 📊 Data.json Structure

```json
{
  "portfolio": {
    "executive": [
      { "id": 1, "title": "...", "image": "...", ... }
    ],
    "corporate": [...],
    "entrepreneur": [...],
    "influencer": [...]
  },
  "beforeAfter": [
    { "id": 1, "title": "...", "before": "...", "after": "..." }
  ],
  "blog": [
    { "id": 1, "title": "...", "category": "...", "image": "..." }
  ]
}
```

---

## 🎬 Sections Trong Website

| Section | Nội Dung | Auto? |
|---------|----------|-------|
| **Hero** | Intro & CTA | - |
| **Before/After** | Slider comparisons | ✅ |
| **Portfolio** | Gallery với filters | ✅ |
| **Pricing** | Pricing table | - |
| **Process** | Timeline 5 bước | - |
| **Blog** | Portfolio categories | ✅ |
| **Services** | Dịch vụ cung cấp | - |
| **About** | Về KD PROFILE | - |
| **Contact** | Form + Info | 📧 |
| **Footer** | Links & Info | - |

---

## 📞 Thông Tin Liên Hệ

**KD PROFILE**

📍 **Địa Chỉ:** 485 Phan Văn Trị, Phường 5, Gò Vấp, HCM
📱 **Điện Thoại:** 0379 031 662
✉️ **Email:** tr.nhutuan@gmail.com (gửi từ form)
🌐 **Khu Vực:** Hồ Chí Minh

---

## 🔐 Bảo Mật

### ⚠️ Không Nên Leak:
- Private Key EmailJS
- Secret Key EmailJS
- Admin credentials

### ✅ An Toàn Để Public:
- Public Key EmailJS
- Service ID
- Template ID
- Image URLs

---

## 📈 Scaling (Thêm Ảnh)

### Nếu có 100+ ảnh:
✅ Tự động hóa handle được dễ dàng
❌ Tự tay sẽ rất mất thời gian

### Chia theo batch:
```
Batch 1: 50 ảnh (1 lần)
Batch 2: 50 ảnh (1 lần)
...

Mỗi lần: node auto-generate-data.js
```

---

## 🎓 Best Practices

### ✅ Làm:
1. Tổ chức ảnh trong thư mục
2. Đặt tên file rõ ràng
3. Dùng auto-generate script
4. Backup data.json trước sửa lớn
5. Test trước deploy production

### ❌ Không Làm:
1. Edit HTML trực tiếp (edit JSON)
2. Đổi tên thư mục (break paths)
3. Forget auto-generate (manually edit)
4. Upload ảnh quá lớn (> 2MB)
5. Dùng dấu cách trong tên file

---

## 🚀 Deployment

### Để Online:
1. Upload toàn bộ folder lên hosting
2. EmailJS tự chạy (không cần backend)
3. Website hoạt động ngay

### Hosting Options:
- Netlify (miễn phí)
- Vercel (miễn phí)
- GitHub Pages (miễn phí)
- Web.com, GoDaddy, etc.

---

## 📞 Support & Troubleshooting

### Nếu ảnh không hiển thị:
1. Kiểm tra F12 > Console
2. Xem data.json có data không
3. Kiểm tra đường dẫn ảnh đúng không
4. Chạy lại: node auto-generate-data.js

### Nếu email không gửi được:
1. Kiểm tra EmailJS config có đúng không
2. Xem F12 > Network tab
3. Kiểm tra console có error không
4. Xem [EMAIL_SETUP.md](EMAIL_SETUP.md)

### Nếu website chậm:
1. Nén ảnh (TinyPNG)
2. Cắt ảnh về size chuẩn
3. Dùng JPG thay PNG (nếu có thể)

---

## 📚 Tài Liệu Liên Quan

1. **[QUICK_START.md](QUICK_START.md)** - Bắt đầu trong 5 phút
2. **[AUTO_GENERATE_GUIDE.md](AUTO_GENERATE_GUIDE.md)** - Chi tiết script
3. **[EMAIL_SETUP.md](EMAIL_SETUP.md)** - Cấu hình email
4. **[README.md](README.md)** - Tổng quan cơ bản
5. **[COMPARISON.md](COMPARISON.md)** - So sánh lợi ích

---

## ✨ Tóm Tắt

| Điều | Status |
|------|--------|
| **Website** | ✅ Hoàn chỉnh |
| **Auto Data** | ✅ Sẵn sàng |
| **Email Setup** | ⚠️ Cần config 1 lần |
| **Images** | ⏳ Chờ user upload |
| **Production Ready** | ✅ Yes |

---

## 🎯 Next Steps

1. **Chuẩn bị ảnh** (copy vào thư mục)
2. **Chạy auto-generate** (node auto-generate-data.js)
3. **Setup email** (xem [EMAIL_SETUP.md](EMAIL_SETUP.md))
4. **Deploy** (upload hosting)
5. **Test** (trên production)

---

## 📞 Liên Hệ

Nếu cần hỗ trợ:
- 📧 Email: tr.nhutuan@gmail.com
- 📱 SĐT: 0379 031 662

---

**Hệ thống KD PROFILE - Sẵn sàng launch! 🚀**

*Tạo: 27/02/2026*
*Version: 1.0 (Complete)*
