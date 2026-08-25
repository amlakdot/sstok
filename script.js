async function loadData() {
    const container = document.getElementById('results-container');
    container.innerHTML = '<p style="text-align: center; color: #38bdf8;">در حال دریافت داده‌ها از سرور...</p>';

    try {
        // استفاده از مسیر نسبی دقیق همراه با تایم‌استمپ برای جلوگیری از کش مرورگر
        const response = await fetch(`data/products.json?t=${new Date().getTime()}`);
        
        if (!response.ok) {
            throw new Error("فایل داده‌ها پیدا نشد.");
        }

        const products = await response.json();
        container.innerHTML = '';

        if (!Array.isArray(products) || products.length === 0) {
            container.innerHTML = '<p style="text-align: center;">محصولی در لیست یافت نشد.</p>';
            return;
        }

        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${p.title}</h3>
                <p>🛒 فروشگاه: <b>${p.store}</b></p>
                <p>💵 قیمت فعلی: <span class="price">${p.price.toLocaleString()} تومان</span></p>
                <p>🏷️ درصد تخفیف: ${p.discount_percent}%</p>
                ${p.is_fake_discount ? '<div class="fake-discount">⚠️ هشدار: تخفیف غیرواقعی (قیمت پایه دستکاری شده)</div>' : ''}
                <p>📦 فروش ماهانه تخمینی: ${p.estimated_monthly_sales} عدد</p>
                <a href="${p.url}" target="_blank">مشاهده محصول در دیجی‌کالا 🔗</a>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<p style="color: #f87171; text-align: center;">خطا در بارگذاری: ${error.message}<br>لطفاً مطمئن شوید گیت‌هاب اکشنز حداقل یک‌بار فایل دیتا را ساخته است.</p>`;
    }
}

// اجرای خودکار هنگام باز شدن صفحه
loadData();
