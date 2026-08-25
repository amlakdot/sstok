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
            
            let originalPriceHtml = '';
            if (p.original_price && p.original_price > p.price) {
                originalPriceHtml = `<p style="margin: 4px 0; color: #94a3b8; font-size: 14px;">قیمت قبل: <del>${p.original_price.toLocaleString()} تومان</del></p>`;
            }

            card.innerHTML = `
                <h2 style="color: #38bdf8; font-size: 19px; margin-top: 0; margin-bottom: 12px; line-height: 1.5; border-bottom: 1px solid #334155; padding-bottom: 10px;">📦 ${p.title}</h2>
                <p style="margin: 6px 0;">🏷️ برند: <b>${p.brand || 'متفرقه'}</b></p>
                <p style="margin: 6px 0;">🛒 فروشگاه: <b>${p.store}</b></p>
                ${originalPriceHtml}
                <p style="margin: 6px 0;">💵 قیمت فعلی: <span class="price">${p.price.toLocaleString()} تومان</span></p>
                <p style="margin: 6px 0;">🏷️ درصد تخفیف درج شده: ${p.discount_percent}%</p>
                ${p.is_fake_discount ? '<div class="fake-discount">⚠️ هشدار: تخفیف غیرواقعی (قیمت پایه دستکاری شده است)</div>' : ''}
                <p style="margin: 6px 0;">⭐ امتیاز کاربران: ${p.rating_score ? p.rating_score + ' از 5' : 'ثبت نشده'}</p>
                <a href="${p.url}" target="_blank" style="display: inline-block; background: #0284c7; color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 14px; margin-top: 10px;">مشاهده محصول در دیجی‌کالا 🔗</a>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `<p style="color: #f87171; text-align: center;">خطا در بارگذاری: ${error.message}</p>`;
    }
}

loadData();
