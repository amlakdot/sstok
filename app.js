async function fetchLiveData() {
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxKYOpznXXtMmybZhDI5M5RYZnrY_E2jwJreGeeO29bqiAjQe-KsVm39pp5WWr1INB1dg/exec'; // لینک وب اپلیکیشن گوگل اسکریپت خودت را اینجا بگذار
    
    const btn = document.getElementById('fetch-btn');
    const loading = document.getElementById('loading');
    const container = document.getElementById('results-container');
    
    btn.disabled = true;
    loading.classList.remove('hidden');
    container.innerHTML = '';

    try {
        const response = await fetch(WEB_APP_URL);
        const products = await response.json();

        loading.classList.add('hidden');
        btn.disabled = false;

        if (products.error) {
            container.innerHTML = `<p style="color: #f87171; text-align: center;">خطا در سرور: ${products.error}</p>`;
            return;
        }

        if (products.length === 0) {
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
                <p>🏷️ درصد تخفیف درج شده: ${p.discount_percent}%</p>
                ${p.is_fake_discount ? '<div class="fake-discount">⚠️ هشدار: تخفیف غیرواقعی شناسایی شد (پایه قیمت قبل از تخفیف دستکاری شده است)</div>' : ''}
                <p>📦 فروش ماهانه تخمینی: ${p.estimated_monthly_sales} عدد</p>
                <a href="${p.url}" target="_blank">مشاهده محصول در سایت اصلی 🔗</a>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        loading.classList.add('hidden');
        btn.disabled = false;
        container.innerHTML = '<p style="color: #f87171; text-align: center;">خطا در برقراری ارتباط با سرور.</p>';
    }
}
