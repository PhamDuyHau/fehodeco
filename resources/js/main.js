import "./home.js";
import "./about.js";
import "./shareholder.js";
import "./animation.js";
import "./chart.js";
import "../css/style.css";

function initIntro() {
    const svg = document.getElementById("introSvg");
    const overlay = document.getElementById("intro-overlay");
    if (!svg || !overlay) return;

    const paths = svg.querySelectorAll("path");
    const fills = Array.from(paths).map((p) => p.dataset.fill || "#0e4f9e");

    document.body.classList.add("intro-playing");

    const drawDuration = 3;

    paths.forEach((svgPath, i) => {
        const length = svgPath.getTotalLength();
        svgPath.style.fill = "transparent";
        svgPath.style.stroke = fills[i];
        svgPath.style.strokeWidth = "2";
        svgPath.style.strokeDasharray = length;
        svgPath.style.strokeDashoffset = length;
        svgPath.style.transition = "none";
        svgPath.style.animation = "none";
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            paths.forEach((svgPath) => {
                svgPath.style.animation = `draw ${drawDuration}s ease-in-out forwards`;
            });

            setTimeout(() => {
                paths.forEach((svgPath, i) => {
                    svgPath.style.transition = "fill 1s ease";
                    svgPath.style.fill = fills[i];
                });
            }, (drawDuration - 2) * 1000);

            setTimeout(() => {
                document.body.classList.remove("intro-playing");
                overlay.classList.add("fade-out");
                overlay.addEventListener("transitionend", () => {
                    overlay.remove();
                }, { once: true });
            }, (drawDuration + 1) * 1000);
        });
    });
}

// Search toggle
const btn = document.getElementById("searchBtn");
const box = document.getElementById("searchBox");

if (btn && box) {
    btn.addEventListener("click", () => {
        box.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!btn.contains(e.target) && !box.contains(e.target)) {
            box.classList.add("hidden");
        }
    });
}

initIntro();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.style.left = "0";
    });
}

if (closeMenu && mobileMenu) {
    closeMenu.addEventListener("click", () => {
        mobileMenu.style.left = "-320px";
    });
}