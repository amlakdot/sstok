async function fetchLiveData() {
    const btn = document.getElementById('fetch-btn');
    const loading = document.getElementById('loading');
    const container = document.getElementById('results-container');
    
    // تغییر وضعیت ظاهر صفحه حین بارگذاری
    btn.disabled = true;
    loading.classList.remove('hidden');
    container.innerHTML = '';

    try {
        // شبیه‌سازی دریافت داده‌های لایو (اینجا می‌تونی فچ واقعی رو جایگزین کنی)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // داده‌های نمونه که لحظه‌ای استخراج میشن
        const liveProducts = [
            {
                title: "گوشی موبایل سامسونگ مدل S24 Ultra",
                price: 54000000,
                original_price: 60000000,
                discount_percent: 10,
                is_fake_discount: false,
                monthly_sales: 320,
                store: "دیجی‌کالا"
            },
            {
                title: "کنسول بازی پلی‌استیشن 5 اسلیم",
                price: 28500000,
                original_price: 35000000,
                discount_percent: 18,
                is_fake_discount: true, // تخفیف فیک شناسایی شده
                monthly_sales: 185,
                store: "ترب / فروشگاه‌های مختلف"
            }
        ];

        loading.classList.add('hidden');
        btn.disabled = false;

        // رندر کردن کارت‌ها در صفحه
        liveProducts.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${p.title}</h3>
                <p>🛒 منبع: <b>${p.store}</b></p>
                <p>💵 قیمت فعلی: <span class="price">${p.price.toLocaleString()} تومان</span></p>
                <p>🏷️ تخفیف واقعی: ${p.discount_percent}%</p>
                ${p.is_fake_discount ? '<p class="fake-discount">⚠️ هشدار: تشخیص تخفیف غیرواقعی (قیمت پایه قبلاً بالا رفته بوده)</p>' : ''}
                <p>📦 فروش تخمینی ماهانه: ${p.monthly_sales} عدد</p>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        loading.classList.add('hidden');
        btn.disabled = false;
        container.innerHTML = '<p style="color: #f87171; text-align: center;">خطا در برقراری ارتباط با سرور مقصد.</p>';
    }
}
