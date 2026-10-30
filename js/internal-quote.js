const cityRates = {
    danang: {
        leadership: [2000000, 3500000],
        staff: [300000, 500000],
        workspace: [3500000, 6000000],
        operations: [4000000, 7000000],
        event: [4000000, 7000000],
        product: [4000000, 7000000]
    },
    hcm: {
        leadership: [2500000, 4000000],
        staff: [350000, 600000],
        workspace: [4500000, 7000000],
        operations: [5000000, 8500000],
        event: [5000000, 8000000],
        product: [5000000, 8000000]
    }
};

const currency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
});
const rows = [...document.querySelectorAll('.service-row')];
const citySelect = document.getElementById('city');
const expensesInput = document.getElementById('expenses');
const discountInput = document.getElementById('discount');
const finalPriceInput = document.getElementById('finalPrice');
const estimateRange = document.getElementById('estimateRange');
const emptyHint = document.getElementById('emptyHint');
const copyButton = document.getElementById('copyQuote');
const copyStatus = document.getElementById('copyStatus');

function readAmount(input) {
    return Math.max(0, Number(input.value) || 0);
}

function roundToHundredThousand(value) {
    return Math.round(value / 100000) * 100000;
}

function getTotals() {
    const expenses = readAmount(expensesInput);
    const discount = Math.min(100, readAmount(discountInput)) / 100;
    const selected = rows.filter((row) => row.querySelector('.service-toggle').checked);
    const subtotal = selected.reduce((total, row) => {
        const quantity = Math.max(1, Number(row.querySelector('.quantity').value) || 1);
        const low = readAmount(row.querySelector('.rate-low'));
        const high = readAmount(row.querySelector('.rate-high'));
        return {
            low: total.low + Math.min(low, high) * quantity,
            high: total.high + Math.max(low, high) * quantity
        };
    }, { low: 0, high: 0 });

    return {
        selected,
        low: Math.max(0, (subtotal.low + expenses) * (1 - discount)),
        high: Math.max(0, (subtotal.high + expenses) * (1 - discount))
    };
}

function updateEstimate({ resetFinal = false } = {}) {
    const totals = getTotals();
    const hasSelection = totals.selected.length > 0;

    emptyHint.hidden = hasSelection;
    copyButton.disabled = !hasSelection;

    if (!hasSelection) {
        estimateRange.textContent = 'Chưa chọn hạng mục';
        finalPriceInput.value = '';
        finalPriceInput.placeholder = 'Chọn dịch vụ để tính';
        copyStatus.textContent = '';
        return;
    }

    estimateRange.textContent = `${currency.format(totals.low)} – ${currency.format(totals.high)}`;
    if (resetFinal || !finalPriceInput.value) {
        finalPriceInput.value = roundToHundredThousand((totals.low + totals.high) / 2);
    }
    finalPriceInput.placeholder = '';
}

function applyCityRates() {
    const rates = cityRates[citySelect.value];
    rows.forEach((row) => {
        const [low, high] = rates[row.dataset.service];
        row.querySelector('.rate-low').value = low;
        row.querySelector('.rate-high').value = high;
    });
    updateEstimate({ resetFinal: true });
}

function buildQuoteMessage() {
    const totals = getTotals();
    const client = document.getElementById('client').value.trim();
    const city = citySelect.options[citySelect.selectedIndex].text;
    const lines = totals.selected.map((row) => {
        const quantity = Math.max(1, Number(row.querySelector('.quantity').value) || 1);
        const low = Math.min(
            readAmount(row.querySelector('.rate-low')),
            readAmount(row.querySelector('.rate-high'))
        );
        const high = Math.max(
            readAmount(row.querySelector('.rate-low')),
            readAmount(row.querySelector('.rate-high'))
        );
        return `- ${row.querySelector('.service-name').textContent}: ${quantity} ${row.dataset.unit} · ${currency.format(low)}–${currency.format(high)}/${row.dataset.unit}`;
    });

    return [
        'KD PROFILE · DỰ THẢO BÁO GIÁ',
        ...(client ? [`Khách hàng: ${client}`] : []),
        `Khu vực: ${city}`,
        '',
        'Hạng mục tham khảo:',
        ...lines,
        ...(readAmount(expensesInput) ? [`Chi phí phát sinh dự kiến: ${currency.format(readAmount(expensesInput))}`] : []),
        ...(readAmount(discountInput) ? [`Điều chỉnh giảm: ${readAmount(discountInput)}%`] : []),
        '',
        `Khoảng dự kiến: ${currency.format(totals.low)} – ${currency.format(totals.high)}`,
        `Giá đề xuất: ${currency.format(readAmount(finalPriceInput))}`,
        '',
        'Báo giá tham khảo, cần xác nhận lại theo phạm vi công việc, thời lượng chụp, số ảnh bàn giao, hậu kỳ và chi phí thực tế.'
    ].join('\n');
}

async function copyQuote() {
    const text = buildQuoteMessage();
    copyStatus.textContent = '';

    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            copyStatus.textContent = 'Đã sao chép dự thảo báo giá.';
            return;
        } catch (error) {
            console.warn('Clipboard API không khả dụng, thử cách sao chép dự phòng:', error);
        }
    }

    const temporaryInput = document.createElement('textarea');
    temporaryInput.value = text;
    temporaryInput.setAttribute('readonly', '');
    temporaryInput.style.position = 'fixed';
    temporaryInput.style.opacity = '0';
    document.body.appendChild(temporaryInput);
    temporaryInput.select();

    let copied = false;
    try {
        copied = document.execCommand('copy');
    } catch (error) {
        console.error('Không thể sao chép dự thảo báo giá:', error);
    } finally {
        temporaryInput.remove();
    }

    copyStatus.textContent = copied
        ? 'Đã sao chép dự thảo báo giá.'
        : 'Không thể sao chép tự động. Hãy thử lại trên trang đã được tải qua HTTPS.';
}

citySelect.addEventListener('change', applyCityRates);
rows.forEach((row) => {
    row.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', () => updateEstimate({ resetFinal: true }));
    });
});
expensesInput.addEventListener('input', () => updateEstimate({ resetFinal: true }));
discountInput.addEventListener('input', () => updateEstimate({ resetFinal: true }));
finalPriceInput.addEventListener('input', () => {
    copyButton.disabled = getTotals().selected.length === 0;
});
copyButton.addEventListener('click', copyQuote);
document.getElementById('resetButton').addEventListener('click', () => {
    citySelect.value = 'danang';
    document.getElementById('client').value = '';
    expensesInput.value = 0;
    discountInput.value = 0;
    rows.forEach((row) => {
        row.querySelector('.service-toggle').checked = false;
        row.querySelector('.quantity').value = row.dataset.service === 'staff' ? 10 : 1;
    });
    applyCityRates();
    copyStatus.textContent = '';
});

applyCityRates();
