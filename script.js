// اسلایدر
const slides = document.querySelectorAll('.slider .slide');
const dots = document.querySelectorAll('.slider-dots .dot');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            dots[i].classList.add('active');
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
setInterval(nextSlide, 3500); // کمی زمان بیشتر برای انیمیشن نرم‌تر

// منوی همبرگری
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open'); // انیمیشن برای همبرگر
});

// افکت اسکرول هدر
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});