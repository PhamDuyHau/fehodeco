import "./home.js";
import "./about.js";
import "./shareholder.js";
import "./animation.js";
import "./chart.js";
import "./news.js";
import "../css/style.css";

function initIntro() {
  const svg = document.getElementById("introSvg");
  const overlay = document.getElementById("intro-overlay");
  if (!svg || !overlay) return;

  const paths = svg.querySelectorAll("g path[data-fill]");
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
      setTimeout(
        () => {
          paths.forEach((svgPath, i) => {
            svgPath.style.transition = "fill 1s ease";
            svgPath.style.fill = fills[i];
          });
        },
        (drawDuration - 2) * 1000,
      );
      setTimeout(
        () => {
          paths.forEach((svgPath, i) => {
            svgPath.style.transition = "fill 1s ease";
            svgPath.style.fill = fills[i];
          });
        },
        (drawDuration - 2) * 1000,
      );

      setTimeout(
        () => {
          const maskRect = document.getElementById("maskRect");
          maskRect.setAttribute("mask", "url(#logo-mask)");
          paths.forEach((svgPath) => {
            svgPath.style.transition = "opacity 0.8s ease";
            svgPath.style.opacity = "0";
          });
        },
        (drawDuration + 0.5) * 1000,
      );
      setTimeout(
        () => {
          document.body.classList.remove("intro-playing");
          svg.style.transition = "transform 1.2s cubic-bezier(0.4, 0, 1, 1)";
          svg.style.transformOrigin = "center";
          svg.style.transform = "scale(8)";
          setTimeout(() => {
            overlay.style.transition = "opacity 0.3s ease";
            overlay.style.opacity = "0";
            overlay.addEventListener("transitionend", () => overlay.remove(), {
              once: true,
            });
          }, 900);
        },
        (drawDuration + 1.3) * 1000,
      );
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
