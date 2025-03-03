// اسلایدر
const slides = document.querySelectorAll('.slider .slide');
const dots = document.querySelectorAll('.slider-dots .dot');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active:bg-blue-warm', 'active:scale-130');
        if (i === index) {
            slide.classList.add('active');
            dots[i].classList.add('active:bg-blue-warm', 'active:scale-130');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.getAttribute('data-slide'));
        showSlide(currentSlide);
    });
});

showSlide(currentSlide);
setInterval(nextSlide, 4000);

// منوی همبرگری
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('left-0');
    hamburger.classList.toggle('open');
});

// بستن منو با کلیک خارج از آن
document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && event.target !== hamburger) {
        navMenu.classList.remove('left-0');
        hamburger.classList.remove('open');
    }
});

// افکت اسکرول هدر
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});

// دکمه بازگشت به بالا
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.remove('hidden');
    } else {
        backToTop.classList.add('hidden');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// دسته‌بندی‌ها
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        categoryButtons.forEach(btn => btn.classList.remove('bg-blue-600'));
        button.classList.add('bg-blue-600');

        productCards.forEach(card => {
            card.classList.add('hidden');
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
            }
        });
    });
});

// تنظیم اولیه: همه محصولات نمایش داده بشن
document.querySelector('.category-btn[data-category="all"]').classList.add('bg-blue-600');
productCards.forEach(card => card.classList.remove('hidden'));

// سوئیچ لایت/دارک مود
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

modeToggle.addEventListener('change', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    document.querySelectorAll('.dark').forEach(element => {
        element.classList.toggle('dark', isDark);
    });
});

// سبد خرید پاپ‌آپ
const cartIcon = document.getElementById('cart-icon');
const cartPopup = document.getElementById('cartPopup');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.querySelector('.checkout-btn');
const cartItems = document.querySelector('.cart-items');
const notification = document.getElementById('notification');

let cart = [];

cartIcon.addEventListener('click', () => {
    cartPopup.classList.remove('hidden');
    updateCart();
});

closeCart.addEventListener('click', () => {
    cartPopup.classList.add('hidden');
});

checkoutBtn.addEventListener('click', () => {
    alert('رفتن به صفحه پرداخت!');
    cartPopup.classList.add('hidden');
    cart = [];
    updateCart();
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-product');
        const productName = e.target.closest('.product-card').querySelector('h3').textContent;
        const productPrice = e.target.closest('.product-card').querySelector('.price').textContent;
        cart.push({ id: productId, name: productName, price: productPrice });
        updateCart();
        showNotification(`محصول ${productName} به سبد اضافه شد!`);
    });
});

function updateCart() {
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<li class="text-gray-800 text-lg mb-3 p-3 border-b border-blue-500/30 dark:text-gray-200 dark:border-blue-500/20">سبد خرید خالی است</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price}`;
            li.className = 'text-gray-800 text-lg mb-3 p-3 border-b border-blue-500/30 dark:text-gray-200 dark:border-blue-500/20';
            cartItems.appendChild(li);
        });
    }
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3500);
}

// مشاهده سریع
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.closest('.product-card').querySelector('h3').textContent;
        alert(`جزئیات محصول ${productName}:\nقیمت: ${e.target.closest('.product-card').querySelector('.price').textContent}\nتوضیحات بیشتر در دسترس نیست (لطفاً اطلاعات واقعی اضافه کنید).`);
    });
});
