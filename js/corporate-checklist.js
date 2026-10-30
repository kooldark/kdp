const inquiryForm = document.getElementById('inquiryForm');
const serviceOptions = [...document.querySelectorAll('input[name="services"]')];
const selectedCount = document.getElementById('selectedCount');
const sendStatus = document.getElementById('sendStatus');
const zaloUrl = 'https://zalo.me/84379031662';

serviceOptions.forEach((option) => {
    option.addEventListener('change', () => {
        selectedCount.textContent = serviceOptions.filter((item) => item.checked).length;
    });
});

inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(inquiryForm);
    const selectedServices = formData.getAll('services');
    const fields = [
        ['Doanh nghiệp', formData.get('company')],
        ['Người liên hệ', formData.get('contact')],
        ['Số điện thoại', formData.get('phone')],
        ['Lĩnh vực', formData.get('industry')],
        ['Quy mô nhân sự', formData.get('staff')],
        ['Địa điểm chụp', formData.get('location')],
        ['Mục đích sử dụng ảnh', formData.get('purpose')],
        ['Thời gian dự kiến', formData.get('date')],
        ['Yêu cầu thêm', formData.get('note')]
    ];
    const providedFields = fields.filter(([, value]) => value?.trim());

    const message = [
        'Chào KD PROFILE, mình muốn được tư vấn chụp ảnh doanh nghiệp.',
        '',
        'HẠNG MỤC QUAN TÂM:',
        ...(selectedServices.length
            ? selectedServices.map((service) => `- ${service}`)
            : ['Mình chưa xác định, nhờ studio tư vấn thêm.']),
        ...(providedFields.length
            ? ['', 'THÔNG TIN THÊM:', ...providedFields.map(([label, value]) => `${label}: ${value.trim()}`)]
            : [])
    ].join('\n');

    let zaloWindow;
    try {
        zaloWindow = window.open(zaloUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
        console.error('Không thể mở Zalo:', error);
    }

    copyMessage(message).then((copied) => {
        sendStatus.hidden = false;
        sendStatus.textContent = copied
            ? 'Đã sao chép nội dung. Hãy dán vào cuộc trò chuyện Zalo với KD PROFILE rồi nhấn gửi.'
            : 'Trình duyệt không cho phép tự sao chép. Hãy sao chép nội dung bên dưới rồi dán vào Zalo:';

        if (!copied) {
            const messageField = document.createElement('textarea');
            messageField.readOnly = true;
            messageField.rows = 7;
            messageField.value = message;
            messageField.setAttribute('aria-label', 'Nội dung yêu cầu tư vấn để sao chép thủ công');
            sendStatus.append(messageField);
        }

        if (!zaloWindow) {
            const link = document.createElement('a');
            link.href = zaloUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = 'Mở Zalo KD PROFILE';
            sendStatus.append(' ', link);
        }
    });
});

async function copyMessage(message) {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(message);
            return true;
        } catch (error) {
            console.warn('Clipboard API không khả dụng, thử cách sao chép dự phòng:', error);
        }
    }

    const temporaryInput = document.createElement('textarea');
    temporaryInput.value = message;
    temporaryInput.setAttribute('readonly', '');
    temporaryInput.style.position = 'fixed';
    temporaryInput.style.opacity = '0';
    document.body.appendChild(temporaryInput);
    temporaryInput.select();

    let copied = false;
    try {
        copied = document.execCommand('copy');
    } catch (error) {
        console.error('Không thể sao chép nội dung yêu cầu:', error);
    } finally {
        temporaryInput.remove();
    }

    return copied;
}
