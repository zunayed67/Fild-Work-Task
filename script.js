
/* ==========================================
   1. SELECT HTML ELEMENTS
========================================== */

const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("main section");

const hero = document.querySelector(".hero");
const backToTop = document.querySelector(".back-to-top");
const contactForm = document.querySelector(".contact-card form");


/* ==========================================
   2. MOBILE NAVIGATION
========================================== */

// Create hamburger menu dynamically

const menuButton = document.createElement("button");

menuButton.classList.add("menu-toggle");
menuButton.setAttribute("aria-label", "Toggle navigation");
menuButton.setAttribute("aria-expanded", "false");

menuButton.innerHTML = `
    <i class="fa-solid fa-bars"></i>
`;

header.insertBefore(menuButton, navbar);


// Toggle navigation menu

menuButton.addEventListener("click", () => {

    const isOpen = navbar.classList.toggle("show");

    menuButton.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


// Close menu after clicking a link

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("show");
        menuButton.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.innerHTML = `
            <i class="fa-solid fa-bars"></i>
        `;

    });

});


/* ==========================================
   3. ACTIVE NAVIGATION ON SCROLL
========================================== */

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop - 180 &&
            window.scrollY < sectionTop + sectionHeight - 180
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


/* ==========================================
   4. HEADER SCROLL EFFECT
========================================== */

function handleHeaderScroll() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", () => {

    updateActiveNavigation();
    handleHeaderScroll();

});


/* ==========================================
   5. TYPING ANIMATION
========================================== */

const typingText = document.querySelector("#typing-text");

const roles = [
    "Web Developer",
    "CSE Student",
    "Software Developer",
    "Tech Enthusiast"
];

let roleIndex = 0;
let characterIndex = 0;

let isDeleting = false;


function typeAnimation() {

    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }

    typingText.textContent = currentRole.substring(
        0,
        characterIndex
    );


    let speed = isDeleting ? 45 : 90;


    // When a complete word is typed

    if (!isDeleting && characterIndex === currentRole.length) {

        speed = 1500;
        isDeleting = true;

    }


    // When a word is completely deleted

    else if (isDeleting && characterIndex === 0) {

        isDeleting = false;

        roleIndex = (roleIndex + 1) % roles.length;

        speed = 400;

    }


    setTimeout(typeAnimation, speed);

}


// Start typing animation

if (typingText) {

    typeAnimation();

}


/* ==========================================
   6. SCROLL REVEAL ANIMATIONS
========================================== */

// Add reveal classes

const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .skill-card, " +
    ".education-card, .contact-card"
);

revealElements.forEach(element => {

    element.classList.add("reveal");

});


// Observe elements while scrolling

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ==========================================
   7. STAGGERED SKILL CARD ANIMATION
========================================== */

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 100}ms`;

});


/* ==========================================
   8. BACK TO TOP BUTTON
========================================== */

function toggleBackToTop() {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener("scroll", toggleBackToTop);


backToTop.addEventListener("click", (event) => {

    event.preventDefault();

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});


/* ==========================================
   9. CONTACT FORM VALIDATION
========================================== */

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.querySelector("#name").value.trim();

    const email = document.querySelector("#email").value.trim();

    const message = document.querySelector("#message").value.trim();


    // Validate name

    if (name.length < 2) {

        alert("Please enter a valid name.");

        return;

    }


    // Validate email

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;

    }


    // Validate message

    if (message.length < 10) {

        alert("Your message must contain at least 10 characters.");

        return;

    }


    // Successful client-side validation

    alert(`Thank you, ${name}! Your form has passed validation.`);

    contactForm.reset();

});


/* ==========================================
   10. DYNAMIC COPYRIGHT YEAR
========================================== */

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.textContent =
        `© ${new Date().getFullYear()} Zunayed Hossain. All Rights Reserved.`;

}


/* ==========================================
   11. INITIALIZE
========================================== */

updateActiveNavigation();

handleHeaderScroll();

toggleBackToTop();
