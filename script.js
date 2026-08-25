async function loadData() {
    const container = document.getElementById('results-container');
    container.innerHTML = '<p style="text-align: center;">در حال بارگذاری...</p>';

    try {
        // اضافه کردن timestamp برای جلوگیری از کش شدن فایل قدیمی توسط مرورگر
        const response = await fetch(`data/products.json?t=${new Date().getTime()}`);
        const products = await response.json();

        container.innerHTML = '';

        if.length === 0 {
            container.innerHTML = '<p style="text-align: center;">محصولی یافت نشد.</p>';
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
        container.innerHTML = '<p style="color: #f87171; text-align: center;">هنوز داده‌ای ذخیره نشده است. به تب Actions در گیت‌هاب بروید و یک‌بار دکمه Run workflow را بزنید تا دیتا استخراج شود.</p>';
    }
}

// بارگذاری اولیه هنگام ورود به سایت
loadData();
