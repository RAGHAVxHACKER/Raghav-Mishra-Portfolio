// ================= SMOOTH SCROLL =================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ================= MOBILE MENU =================
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle) {
    toggle.onclick = () => navLinks.classList.toggle("show");
}

// ================= SCROLL REVEAL (FIXED) =================
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

// 🔥 IMPORTANT — RUN BOTH
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ================= CLOSE MENU ON CLICK =================
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });
});
