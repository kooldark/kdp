# 🤖 Tự Động Hóa data.json - Hướng Dẫn

## 📌 Tổng Quan

Thay vì **tự tay edit data.json**, bạn có thể:
- 📁 Copy ảnh vào thư mục
- 🖥️ Chạy 1 lệnh terminal
- ✨ **Tự động tạo data.json hoàn chỉnh!**

---

## 🎯 Lợi Ích

| ❌ Cách Cũ | ✅ Cách Mới |
|-----------|-----------|
| Tự tay edit JSON | Tự động scan ảnh |
| Dễ sai | Không sai lệch |
| Mất thời gian | Chỉ 1 lệnh |
| Phức tạp | Đơn giản |

---

## 🚀 Bắt Đầu (3 Bước)

### **Bước 1: Chuẩn Bị Ảnh**

Copy ảnh vào các thư mục theo đúng cấu trúc:

```
📂 assets/images/
├── 📂 executive/
│   ├─ 1.jpg
│   ├─ 2.jpg
│   ├─ 3.jpg
│   └─ 4.jpg
├── 📂 corporate/
│   ├─ 1.jpg
│   ├─ 2.jpg
│   ├─ ...
├── 📂 entrepreneur/
├── 📂 influencer/
├── 📂 before-after/
│   ├─ exec-before.jpg
│   ├─ exec-after.jpg
│   ├─ corp-before.jpg
│   ├─ corp-after.jpg
│   └─ ...
└── 📂 blog/
    ├─ executive.jpg
    ├─ corporate.jpg
    ├─ ...
```

**Quy tắc đặt tên:**
- **Portfolio:** Đơn giản: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`
- **Before/After:** `{category}-before.jpg` + `{category}-after.jpg`
  - Ví dụ: `exec-before.jpg` + `exec-after.jpg`
  - Ví dụ: `influencer-before.jpg` + `influencer-after.jpg`
- **Blog:** Đặt tên theo category
  - Ví dụ: `executive.jpg`, `corporate.jpg`, `entrepreneur.jpg`

### **Bước 2: Mở Terminal**

**Trên Windows:**
1. Mở folder `d:\GIT\KDP\`
2. **Click chuột phải** → "Open PowerShell here" (hoặc cmd)
3. **Hoặc:** Win + R → `powershell` → Enter → `cd d:\GIT\KDP`

### **Bước 3: Chạy Lệnh**

Nhập vào terminal:

```bash
node auto-generate-data.js
```

Kết quả:
```
🔍 Scanning image directories...

✅ Executive: Found 4 image(s)
✅ Corporate: Found 4 image(s)
✅ Entrepreneur: Found 3 image(s)
✅ Influencer: Found 2 image(s)
✅ Before/After: Found 3 pair(s)
✅ Blog: Found 6 image(s)

✨ Successfully generated: assets/data.json

📊 Summary:
   - Portfolio items: 13
   - Before/After pairs: 3
   - Blog entries: 6

✅ Auto-generation complete!
```

✅ **Xong! data.json đã được tạo tự động!**

### **Bước 4: Refresh Website**

- Lưu lại
- Refresh trình duyệt (Ctrl+R)
- Ảnh sẽ tự động hiển thị

---

## 📋 Cách Sử Dụng Hàng Ngày

**Quy trình đơn giản:**

```
1. 📁 Copy ảnh vào thư mục
   ↓
2. 🖥️ Chạy: node auto-generate-data.js
   ↓
3. 🌐 Refresh website
   ↓
4. ✨ Hoàn tất!
```

---

## 🔧 Tính Năng Tự Động Hóa

### ✅ Auto-Sinh ID
Mỗi ảnh tự động nhận ID tuần tự (1, 2, 3, ...)

### ✅ Auto-Tạo Title
- Portfolio: `"Executive Portrait 1"`, `"Executive Portrait 2"`, ...
- Before/After: `"Executive Transformation"`, ...
- Blog: `"Executive Profile Collection"`, ...

### ✅ Auto-Sinh Subtitle
Dựa vào loại danh mục:
- Executive → `"Executive Portrait"`
- Corporate → `"Corporate Profile"`
- Entrepreneur → `"Entrepreneur Portrait"`
- Influencer → `"Influencer Profile"`

### ✅ Auto-Scan Before/After Pairs
Tìm cặp ảnh:
- `executive-before.jpg` + `executive-after.jpg` ✅
- `corp-before.jpg` + `corp-after.jpg` ✅
- Tự động pair, không cần config

### ✅ Auto-Detect Blog Categories
Nhận diện category từ tên file:
- `executive.jpg` → category: `Executive`
- `corporate.jpg` → category: `Corporate`
- Tự động phân loại!

---

## 📝 Ví Dụ Thực Tế

### Trước (Tự Tay Edit):
```json
{
  "portfolio": {
    "executive": [
      {
        "id": 1,
        "title": "Executive Portrait",
        "subtitle": "CEO & Founder",
        "image": "assets/images/executive/1.jpg",
        "category": "executive"
      },
      {
        "id": 2,
        "title": "C-Level Profile",
        "subtitle": "Director",
        "image": "assets/images/executive/2.jpg",
        "category": "executive"
      }
      // ... tiếp tục cả trăm dòng
    ]
  }
}
```

### Sau (Tự Động):
```bash
$ node auto-generate-data.js
✅ Executive: Found 4 image(s)
✨ Successfully generated: assets/data.json
```

**data.json tự động tạo!** 🎉

---

## ⚙️ Cách Chỉnh Sửa Sau Khi Tạo

Script tạo dữ liệu **generic** (tên tự động).

Nếu muốn **custom title/subtitle**, sửa `data.json` tay:

**Trước:**
```json
{
  "id": 1,
  "title": "Executive Portrait 1",
  "subtitle": "Executive Portrait"
}
```

**Sau:**
```json
{
  "id": 1,
  "title": "Mr. Nguyễn Văn A - CEO",
  "subtitle": "Technology Leader"
}
```

---

## 🔄 Cập Nhật Khi Thêm Ảnh

**Khi bạn thêm ảnh mới:**

1. Copy ảnh vào thư mục (vd: `assets/images/executive/5.jpg`)
2. Chạy: `node auto-generate-data.js`
3. ✅ Script sẽ **re-generate toàn bộ** data.json với ảnh mới

**Lưu ý:** Script sẽ **ghi đè** data.json cũ
- Nên chỉnh sửa title/subtitle **TRƯỚC** khi thêm ảnh mới
- Hoặc custom lại sau khi chạy script

---

## 🐛 Troubleshooting

### ❌ "node is not recognized"
**Nguyên nhân:** Node.js chưa install
**Giải pháp:** 
- Download: https://nodejs.org/
- Cài đặt Node.js
- Restart terminal

### ❌ "File not found"
**Nguyên nhân:** Chạy lệnh từ folder sai
**Giải pháp:**
- Đảm bảo terminal đang ở folder: `d:\GIT\KDP\`
- Kiểm tra: `ls auto-generate-data.js` (hoặc `dir auto-generate-data.js` trên Windows)

### ❌ "No images found"
**Nguyên nhân:** Thư mục images trống hoặc cấu trúc sai
**Giải pháp:**
- Kiểm tra đường dẫn: `d:\GIT\KDP\assets\images\`
- Đảm bảo ảnh trong thư mục con (executive/, corporate/...)

### ✅ "data.json generated but not showing"
**Giải pháp:**
- Làm sạch cache: Ctrl+Shift+Delete (browser cache)
- Refresh: Ctrl+F5 (hard refresh)
- Mở DevTools (F12) > Console xem error

---

## 📞 Hỗ Trợ

Nếu cần chỉnh sửa script:
- Mở: `d:\GIT\KDP\auto-generate-data.js`
- Edit các biến config ở đầu file:
  - `categoryLabels` - Tên loại danh mục
  - `subtitleMap` - Subtitle mặc định

---

## 🎯 Workflow Tối Ưu

```
1️⃣  Chuẩn bị ảnh (tổ chức theo folder)
    ↓
2️⃣  Chạy: node auto-generate-data.js
    ↓
3️⃣  (Tuỳ chọn) Sửa title/subtitle trong data.json
    ↓
4️⃣  Refresh website
    ↓
5️⃣  Done! ✨
```

---

**Chúc bạn sử dụng tính năng tự động hóa thành công! 🚀**

*Tiết kiệm thời gian, giảm lỗi, tăng hiệu suất!*
