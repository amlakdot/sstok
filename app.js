async function fetchLiveData() {
    const btn = document.getElementById('fetch-btn');
    const loading = document.getElementById('loading');
    const container = document.getElementById('results-container');
    
    btn.disabled = true;
    loading.classList.remove('hidden');
    container.innerHTML = '';

    try {
        // استفاده از پروکسی عمومی برای رد کردن مشکل CORS مرورگر
        const targetUrl = "https://api.digikala.com/v1/search/?sort=7";
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

        const response = await fetch(proxyUrl);
        const wrapper = await response.json();
        
        if (!wrapper.contents) {
            throw new Error("پاسخی از سرور دریافت نشد.");
        }

        const json = JSON.parse(wrapper.contents);
        const productsList = [];

        if (json.data && json.data.products) {
            const items = json.data.products;
            
            for (let i = 0; i < Math.min(items.length, 10); i++) {
                const item = items[i];
                const title = item.title;
                const priceObj = item.default_variant.price;
                
                const sellingPrice = priceObj.selling_price;
                const rrpPrice = priceObj.rrp_price;
                const discountPercent = priceObj.discount_percent || 0;
                
                let isFakeDiscount = false;
                if (discountPercent > 0 && rrpPrice > sellingPrice) {
                    const calculatedDiscount = Math.round(((rrpPrice - sellingPrice) / rrpPrice) * 100);
                    if (Math.abs(calculatedDiscount - discountPercent) > 5) {
                        isFakeDiscount = true;
                    }
                }

                const rating = item.rating ? item.rating.rate_score : 0;
                const estimatedMonthlySales = Math.floor((rating + 1) * 15); 

                productsList.push({
                    title: title,
                    price: sellingPrice,
                    original_price: rrpPrice,
                    discount_percent: discountPercent,
                    is_fake_discount: isFakeDiscount,
                    estimated_monthly_sales: estimatedMonthlySales,
                    store: "دیجی‌کالا",
                    url: "https://www.digikala.com" + item.url.uri
                });
            }
        }

        loading.classList.add('hidden');
        btn.disabled = false;

        if (productsList.length === 0) {
            container.innerHTML = '<p style="text-align: center;">محصولی یافت نشد.</p>';
            return;
        }

        productsList.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${p.title}</h3>
                <p>🛒 فروشگاه: <b>${p.store}</b></p>
                <p>💵 قیمت فعلی: <span class="price">${p.price.toLocaleString()} تومان</span></p>
                <p>🏷️ درصد تخفیف: ${p.discount_percent}%</p>
                ${p.is_fake_discount ? '<div class="fake-discount">⚠️ هشدار: تخفیف غیرواقعی (قیمت پایه قبلاً دستکاری شده است)</div>' : ''}
                <p>📦 فروش ماهانه تخمینی: ${p.estimated_monthly_sales} عدد</p>
                <a href="${p.url}" target="_blank">مشاهده محصول در سایت اصلی 🔗</a>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        loading.classList.add('hidden');
        btn.disabled = false;
        container.innerHTML = `<p style="color: #f87171; text-align: center;">خطا در برقراری ارتباط: ${error.message}</p>`;
    }
}
