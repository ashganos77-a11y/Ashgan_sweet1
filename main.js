// الانتظار حتى يتم تحميل عناصر الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. تحديد العناصر من صفحة HTML
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-btn');

    // مصفوفة لتخزين المنتجات المضافة في السلة
    let cart = [];

    // 2. دالة لتحديث واجهة السلة وحساب المجموع
    function updateCartUI() {
        // مسح محتويات السلة الحالية لتجنب التكرار
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-message">السلة فارغة حالياً.</p>';
            totalPriceElement.textContent = '0';
            return;
        }

        let total = 0;

        // المرور على المنتجات المضافة وعرضها
        cart.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} ريال`;
            cartItemsContainer.appendChild(li);
            
            // إضافة السعر للمجموع الكلي
            total += item.price;
        });

        // تحديث نص المجموع الكلي في الصفحة
        totalPriceElement.textContent = total;
    }

    // 3. إضافة حدث الضغط لجميع أزرار "إضافة للسلة"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // جلب بيانات المنتج من الخصائص المخصصة (data attributes) في الـ HTML
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));

            // إضافة المنتج ككائن (Object) داخل مصفوفة السلة
            cart.push({ name, price });

            // تحديث السلة في الواجهة
            updateCartUI();
        });
    });

    // 4. إضافة حدث الضغط لزر "تأكيد الطلب" (تفاعل إضافي للموقع)
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('سلتك فارغة! يرجى إضافة بعض الحلويات أولاً 🍬.');
        } else {
            alert('شكراً لطلبك! تم استلام طلباتك وجاري تحضير الحلويات اللذيذة 🧁✨.');
            // تفريغ السلة بعد تأكيد
