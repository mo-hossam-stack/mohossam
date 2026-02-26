import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger);

const transitions = {
    SpringUp: {
        from: {
            opacity: 0,
            scale: 0.8,
        },
        to: {
            ease: "elastic.out(0.8, 0.5)",
            opacity: 1,
            scale: 1,
            duration: 2,
            delay: 0.5,
            stagger: 0.2,
        }
    },
    Stagger: {
        from: {
            opacity: 0,
            y: 30,
        },
        to: {
            opacity: 1,
            y: 0,
            delay: 0.1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        }
    },
    FadeUp: {
        from: {
            opacity: 0,
            y: 30,
        },
        to: {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
        }
    },
    FadeDown: {
        from: {
            opacity: 0,
            y: -30,
        },
        to: {
            opacity: 1,
            y: 0,
            delay: 0.2,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
        }
    },
    FadeIn: {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power1.out"
        }
    },
    MobileLink: {
        from: {
            y: 20,
            opacity: 0,
        },
        to: {
            y: 0,
            opacity: 1,
            duration: 0.3,
            delay: 0.2,
            stagger: 0.08,
            ease: "power1.out"
        }
    }
}

// Hero Orbit Spring Animation - only runs once
ScrollTrigger.batch(".Spring_Up", {
    start: "top bottom",
    onEnter: elements => {
        gsap.fromTo(elements, transitions.SpringUp.from, transitions.SpringUp.to);
    },
    once: true
});

// Stagger Animation
ScrollTrigger.batch(".Fade_Stagger", {
    start: "top bottom",
    onEnter: elements => {
        gsap.fromTo(elements, transitions.Stagger.from, transitions.Stagger.to);
    },
    once: true
});

ScrollTrigger.batch(".Project_Stagger", {
    start: "top bottom-=100px",
    onEnter: elements => {
        gsap.fromTo(elements,
            {
                opacity: 0,
                y: 40,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                stagger: {
                    grid: "auto",
                    each: 0.1
                },
                ease: "power2.out"
            });
    },
    once: true
});


// FadeUp Animation
ScrollTrigger.batch(".Fade_Up", {
    start: "top bottom-=80px",
    onEnter: elements => {
        gsap.fromTo(elements, transitions.FadeUp.from, transitions.FadeUp.to);
    },
    once: true
});

// FadeDown Animation
ScrollTrigger.batch(".Fade_Down", {
    start: "top bottom-=80px",
    onEnter: elements => {
        gsap.fromTo(elements, transitions.FadeDown.from, transitions.FadeDown.to);
    },
    once: true
});

// FadeIn Animation
ScrollTrigger.batch(".Fade_In", {
    onEnter: elements => {
        gsap.fromTo(elements, transitions.FadeIn.from, transitions.FadeIn.to)
    },
    once: true
});

// Mobile Nav Ham-Menu Animation
const MobileNavElement = document.querySelector("#mobileHeaderNav");
let isMenuOpen = false;
const dimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const menuTl = gsap.timeline({ paused: true });

if (MobileNavElement) {
    menuTl.fromTo(
        MobileNavElement,
        {
            clipPath: `circle(30px at ${dimensions.width + 30}px -30px)`,
            backgroundColor: "var(--base)",
        },
        {
            clipPath: `circle(${(dimensions.height * 2) + 200}px at 40px 40px)`,
            backgroundColor: "var(--surfaceElevated)",
            duration: 0.5,
            ease: "power1.inOut"
        }
    );
}

// MobileNav Link FadeUp animation
const MobileLinkElement = document.querySelectorAll("#mobileHeaderNav .MobileHeader_Nav");
const linkTl = gsap.timeline({ paused: true });

if (MobileLinkElement.length !== 0) {
    linkTl.fromTo(MobileLinkElement, transitions.MobileLink.from, transitions.MobileLink.to);
}

// Event listener to trigger MobileNav animations
const HamMenuButton = document.getElementById("Ham_Menu");

const closeNav = () => {
    linkTl.reverse()
    setTimeout(() => {
        menuTl.reverse();
    }, 300)
}

HamMenuButton?.addEventListener('click', () => {
    if (!isMenuOpen) {
        menuTl.play();
        linkTl.play()
    } else {
        closeNav()
    }
    isMenuOpen = !isMenuOpen;
    HamMenuButton?.classList.toggle("isOpen");
});

// Close Nav menu after Theme button click for Mobile sizes
const themeToggleMobileBtn = document.getElementById("themeToggleMobile");
const themeToggleMobileProjectBtn = document.getElementById("themeToggleMobileProject");
themeToggleMobileBtn?.addEventListener('click', () => {
    closeNav()
    isMenuOpen = !isMenuOpen;
    HamMenuButton?.classList.toggle("isOpen");
});
themeToggleMobileProjectBtn?.addEventListener('click', () => {
    closeNav()
    isMenuOpen = !isMenuOpen;
    HamMenuButton?.classList.toggle("isOpen");
});

// Smooth Scrolling with Lenis - Optimized
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Smooth scroll on Nav Link Click
document
    .querySelectorAll('nav a, a[href^="#home"]')
    .forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const id = el.getAttribute("href")?.slice(1);
            if (!id) return;

            const target = document.getElementById(id);
            if (target) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });

                if (window.innerWidth < 1024) {
                    closeNav()
                    isMenuOpen = !isMenuOpen;
                    HamMenuButton?.classList.toggle("isOpen");
                }
            }
        });
    });