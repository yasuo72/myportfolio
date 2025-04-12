document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio Loaded!");

    // 🌑 Dark Mode System
    const darkMode = {
        toggle: document.getElementById("darkModeToggle"),
        body: document.body,
        init() {
            this.body.classList.toggle('dark-mode', localStorage.getItem("darkMode") === "true");
            this.toggle.addEventListener("click", () => this.toggleMode());
        },
        toggleMode() {
            this.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", this.body.classList.contains("dark-mode"));
        }
    };
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });



    // 🚀 Smooth Navigation System
    const smoothScroll = {
        init() {
            document.querySelectorAll('nav ul li a').forEach(anchor => {
                anchor.addEventListener("click", e => this.handleClick(e));
            });
        },
        handleClick(e) {
            e.preventDefault();
            const targetId = e.target.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement?.scrollIntoView({ behavior: "smooth" });
        }
    };

    // 📱 Mobile Navigation System
    const mobileNav = {
        menuToggle: document.getElementById("menu-toggle"),
        navMenu: document.getElementById("nav-menu"),
        init() {
            if (this.menuToggle && this.navMenu) {
                this.menuToggle.addEventListener("click", () => this.toggleMenu());
                document.addEventListener("click", (e) => this.handleOutsideClick(e));
            }
        },
        toggleMenu() {
            this.navMenu.classList.toggle("active");
        },
        handleOutsideClick(e) {
            if (!this.navMenu.contains(e.target) && !this.menuToggle.contains(e.target)) {
                this.navMenu.classList.remove("active");
            }
        }
    };

    // 📨 Contact Form System
    const contactForm = {
        form: document.getElementById("contactForm"),
        init() {
            if (this.form) {
                this.form.addEventListener("submit", e => this.handleSubmit(e));
            }
        },
        handleSubmit(e) {
            e.preventDefault();
            const formData = new FormData(this.form);

            if (!this.validateForm(formData)) {
                alert("Please fill out all fields!");
                return;
            }

            alert("Message Sent Successfully! ✅");
            this.form.reset();
        },
        validateForm(formData) {
            return [...formData.values()].every(value => value.trim() !== "");
        }
    };

    // ✨ Animation System
    const animations = {
        init() {
            this.initAOS();
            this.initGSAP();
            this.initInteractions();
        },

        // 🌀 AOS Initialization
        initAOS() {
            if (typeof AOS !== "") {
                AOS.init({ duration: 1000, once: true });
                console.log("AOS Initialized!");
            }
        },

        // 🎬 GSAP Animations
        initGSAP() {
            if (typeof gsap !== "undefined") {
                this.setupGSAPAnimations();
                this.createCustomCursor();
            }
        },

        setupGSAPAnimations() {
            gsap.from(".hero h1", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });
            gsap.from(".hero p", { duration: 1.2, y: 30, opacity: 0, ease: "power2.out", delay: 0.5 });

            gsap.utils.toArray(".section").forEach(section => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 50,
                    duration: 1.2
                });
            });
        },

        // 🖱 Custom Cursor
        createCustomCursor() {
            if (window.innerWidth <= 768) return; // Disable custom cursor on mobile for better UX

            const cursor = document.createElement("div");
            cursor.id = "custom-cursor";
            document.body.appendChild(cursor);

            document.addEventListener("mousemove", e => {
                gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
            });

            document.querySelectorAll("a, button").forEach(elem => {
                elem.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 2 }));
                elem.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1 }));
            });
        },

        // 🕹 Interaction System
        initInteractions() {
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('mousemove', e => this.handleCardMove(e, card));
                card.addEventListener('mouseleave', () => this.handleCardLeave(card));
            });
        },

        handleCardMove(e, card) {
            if (window.innerWidth <= 768) return; // Disable hover effects on mobile for better UX

            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
                rotationY: x * 20,
                rotationX: -y * 20,
                z: 50,
                duration: 0.5
            });
        },

        handleCardLeave(card) {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                z: 0,
                duration: 0.5
            });
        }
    };

    // 🚀 Initialize All Systems
    darkMode.init();
    smoothScroll.init();
    mobileNav.init();
    contactForm.init();
    animations.init();
});

// 📩 Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let form = this;
    let thankYouMessage = document.getElementById("thankYouMessage");

    fetch(form.action, {
        method: form.method,
        body: new FormData(form)
    }).then(response => {
        if (response.ok) {
            form.reset();
            thankYouMessage.style.display = "block";

            setTimeout(() => {
                thankYouMessage.style.display = "none";
            }, 5000);
        } else {
            alert("Something went wrong. Please try again!");
        }
    }).catch(error => console.error("Error:", error));
});

// 📄 Resume Download
document.getElementById("resumeDownload").addEventListener("click", function(event) {
    event.preventDefault();

    const resumePath = "my_resume.pdf";

    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "my_resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        alert("✅ Your resume is downloading...");
    }, 500);
});
