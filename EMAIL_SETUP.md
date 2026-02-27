# 📧 Hướng Dẫn Thiết Lập Gửi Email Tự Động

## 🎯 Tổng Quan

Website của bạn giờ đây có thể **gửi yêu cầu liên hệ trực tiếp đến email** `tr.nhutuan@gmail.com` thông qua dịch vụ **EmailJS**.

Khi khách hàng submit form → Form data tự động được gửi đến email của bạn.

---

## 📋 Bước 1: Đăng Ký EmailJS (Miễn Phí)

1. **Truy cập:** https://www.emailjs.com/
2. **Chọn:** "Sign Up Free" (Hoàn toàn miễn phí)
3. **Đăng ký:** Dùng Gmail hoặc email khác
4. **Xác nhận:** Check email để kích hoạt tài khoản

✅ **Hoàn tất!** Bạn sẽ được cấp **Public Key**

---

## 🔧 Bước 2: Cấu Hình Gmail Service

Trong dashboard EmailJS:

### 2.1 Thêm Email Service

1. Vào **"Email Services"** (menu bên trái)
2. Chọn **"Add Service"**
3. Chọn **"Gmail"** từ danh sách
4. **Connect your Gmail:** Chọn tài khoản Gmail `tr.nhutuan@gmail.com`
5. Cho phép EmailJS truy cập (popup sẽ xuất hiện)
6. **Copy Service ID** (dạng: `service_xxxxxxxxxxxx`)

⚠️ **Lưu ý:** Nếu Gmail yêu cầu xác thực 2 bước, bạn có thể:
- Dùng "App Password" (recommended)
- Hoặc cho phép "Less secure apps" tạm thời

---

## 📧 Bước 3: Tạo Email Template

Vẫn trong EmailJS dashboard:

1. Vào **"Email Templates"**
2. Chọn **"Create New Template"**
3. **Template Name:** `contact_form` (hoặc tên bất kỳ)
4. **Copy Template ID** (dạng: `template_xxxxxxxxxxxx`)

### Cấu Hình Template Body:

Trong phần "Email Body", nhập nội dung sau:

```html
Yêu cầu liên hệ mới từ website KD PROFILE
========================================

Họ Tên: {{from_name}}
Số Điện Thoại: {{from_phone}}
Công Ty: {{from_company}}
Dịch Vụ Quan Tâm: {{service}}

Lời Nhắn:
{{message}}

---
Gửi lúc: {{date}}
```

**Template variables (KHÔNG sửa):**
- `{{from_name}}` - Tên khách hàng
- `{{from_phone}}` - Số điện thoại
- `{{from_company}}` - Tên công ty
- `{{service}}` - Dịch vụ chọn
- `{{message}}` - Lời nhắn
- `{{date}}` - Ngày giờ hiện tại

✅ **Save Template**

---

## 🔑 Bước 4: Cập Nhật Website Với Thông Tin EmailJS

Mở file: `d:\GIT\KDP\js\script.js`

Tìm đoạn code này (**dòng đầu tiên**):

```javascript
// Initialize EmailJS
// Get your Public Key from emailjs.com after signup
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual Public Key

const EMAILJS_CONFIG = {
    serviceID: 'YOUR_SERVICE_ID',      // Gmail or other email service
    templateID: 'YOUR_TEMPLATE_ID',     // Email template ID
    recipientEmail: 'tr.nhutuan@gmail.com'
};
```

### Thay Thế:

| Tìm | Thay Với |
|-----|----------|
| `YOUR_PUBLIC_KEY` | Public Key từ EmailJS (Account > API Keys) |
| `YOUR_SERVICE_ID` | Service ID từ bước 2.1 (service_xxxx) |
| `YOUR_TEMPLATE_ID` | Template ID từ bước 3 (template_xxxx) |

**Ví dụ:**
```javascript
emailjs.init('pk_free_a1b2c3d4e5f6g7h8i9j0'); 

const EMAILJS_CONFIG = {
    serviceID: 'service_abc123def456',
    templateID: 'template_xyz789uvw234',
    recipientEmail: 'tr.nhutuan@gmail.com'
};
```

✅ **Lưu file**

---

## 🧪 Bước 5: Kiểm Tra Hoạt Động

1. **Mở website** trong trình duyệt
2. **Điền form liên hệ:**
   - Họ tên: "Nguyễn Văn A"
   - Điện thoại: "0912345678"
   - Dịch vụ: Chọn một
   - Lời nhắn: "Test email"
3. **Click "Gửi Yêu Cầu"**
4. **Chờ 2-3 giây** → Sẽ hiển thị ✅ hoặc ❌

### ✅ Nếu Thành Công:
- Hiển thị: "Cảm ơn! Yêu cầu của bạn đã được gửi thành công"
- **Check email** `tr.nhutuan@gmail.com` → Sẽ có email mới

### ❌ Nếu Lỗi:
1. **Kiểm tra console** (F12 > Console tab)
2. Xem thông báo lỗi
3. Đảm bảo:
   - Public Key / Service ID / Template ID đúng
   - Gmail đã kết nối với EmailJS
   - Network có kết nối internet

---

## 📊 Lợi Ích

✅ Emails tự động được gửi đến `tr.nhutuan@gmail.com`
✅ Không cần backend server
✅ Miễn phí (EmailJS free tier hỗ trợ 200 emails/tháng)
✅ Dễ cấu hình, chỉ cần copy 3 thông số
✅ Khách hàng nhận thông báo tức thì
✅ Bạn có lịch sử email trong Gmail

---

## 🔒 Bảo Mật

⚠️ **Lưu ý Quan Trọng:**
- **Public Key:** Không cần giữ bí mật (public)
- **Service ID / Template ID:** Nên giữ an toàn (không share công khai)
- Không bao giờ share Private Key hoặc Secret Key

---

## 💾 Thông Tin EmailJS Của Bạn

Để tiện theo dõi, hãy lưu thông tin này vào file:

```
📌 EMAIL CONFIGURATION
=====================
Email Pháp: tr.nhutuan@gmail.com
Service ID: ___________________
Template ID: __________________
Public Key: ____________________
```

---

## 🆘 Troubleshooting

### ❌ "Lỗi gửi yêu cầu"
- Kiểm tra Public Key có đúng không
- Đảm bảo Gmail đã kết nối EmailJS

### ❌ "Email không nhận được"
- Kiểm tra thư Spam/Promotions
- Đảm bảo Template ID đúng
- Xem console log (F12) có error gì

### ❌ "EmailJS is not defined"
- Kiểm tra EmailJS script có load không (F12 > Network)
- Đảm bảo `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>` có trong HTML

### ✅ "Free plan hết quota"
- EmailJS free: 200 emails/tháng
- Nâng cấp paid plan nếu cần nhiều hơn
- Chi phí rất rẻ (~$9-15/tháng)

---

## 📞 Hỗ Trợ

- **EmailJS Docs:** https://www.emailjs.com/docs/
- **FAQ:** https://www.emailjs.com/support/
- **Contact:** support@emailjs.com

---

**Chúc bạn thiết lập thành công! 🚀**

*Sau khi hoàn tất, khách hàng sẽ tự động gửi yêu cầu qua email.*
