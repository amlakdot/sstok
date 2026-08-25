async function loadData() {
    const container = document.getElementById('results-container');
    container.innerHTML = '<p style="text-align: center; color: #38bdf8;">در حال دریافت داده‌ها از سرور...</p>';

    try {
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
            
            // نمایش قیمت خط خورده قبلی اگر وجود داشته باشد
            let originalPriceHtml = '';
            if (p.original_price && p.original_price > p.price) {
                originalPriceHtml = `<p style="margin: 4px 0; color: #94a3b8; font-size: 14px;">قیمت قبل: <del>${p.original_price.toLocaleString()} تومان</del></p>`;
            }

            card.innerHTML = `
                <h3>${p.title}</h3>
                <p>🛒 فروشگاه: <b>${p.store}</b></p>
                ${originalPriceHtml}
                <p style="margin: 4px 0;">💵 قیمت فعلی: <span class="price">${p.price.toLocaleString()} تومان</span></p>
                <p style="margin: 4px 0;">🏷️ درصد تخفیف درج شده: ${p.discount_percent}%</p>
                ${p.is_fake_discount ? '<div class="fake-discount">⚠️ هشدار: تخفیف غیرواقعی (قیمت پایه دستکاری شده است)</div>' : ''}
                <p style="margin-top: 8px;">📦 فروش ماهانه تخمینی: ${p.estimated_monthly_sales} عدد</p>
                <a href="${p.url}" target="_blank">مشاهده محصول در دیجی‌کالا 🔗</a>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<p style="color: #f87171; text-align: center;">خطا در بارگذاری: ${error.message}</p>`;
    }
}

loadData();
