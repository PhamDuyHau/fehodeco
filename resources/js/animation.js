import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function cleanup() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  gsap.globalTimeline.clear();
  window.__GSAP_INITED__ = false;
}

if (import.meta.hot) {
  import.meta.hot.dispose(cleanup);
}

const isMobile = window.innerWidth < 768;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const enableParallax = !isMobile && !reduceMotion;
const enableHoverEffects = !isMobile;
const enableScaleEffects = !isMobile;

const duration = isMobile ? 0.45 : 1.1;
const distance = isMobile ? 20 : 60;

const getTrigger = (el, start = "top 95%") => ({
  trigger: el,
  start,
  once: true,
});

const animations = {
  "reveal-up": (el) =>
    gsap.fromTo(
      el,
      { opacity: 0, y: distance },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          once: true,
        },
      },
    ),

  "lift-in": (el) =>
    gsap.fromTo(
      el,
      { opacity: 0, y: distance * 0.8, scale: enableScaleEffects ? 0.98 : 1 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: getTrigger(el),
      },
    ),

  "slide-in-left": (el) =>
    gsap.fromTo(
      el,
      { opacity: 0, x: isMobile ? -20 : -80 },
      {
        opacity: 1,
        x: 0,
        duration,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: getTrigger(el),
      },
    ),

  "slide-in-right": (el) =>
    gsap.fromTo(
      el,
      { opacity: 0, x: isMobile ? 20 : 80 },
      {
        opacity: 1,
        x: 0,
        duration,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: getTrigger(el),
      },
    ),

  "soft-scale": (el) =>
    gsap.fromTo(
      el,
      { opacity: 0, scale: enableScaleEffects ? 0.96 : 1 },
      {
        opacity: 1,
        scale: 1,
        duration,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: getTrigger(el),
      },
    ),

  "cta-pop": (el) =>
    gsap.fromTo(
      el,
      { opacity: 0, scale: enableScaleEffects ? 0.92 : 1 },
      {
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.3 : 0.6,
        ease: "back.out(1.4)",
        force3D: true,
        scrollTrigger: getTrigger(el),
      },
    ),

  "lift-in-stagger": (el) => {
    const siblings = [
      ...el.parentElement.querySelectorAll("[data-animate='lift-in-stagger']"),
    ];
    const index = siblings.indexOf(el);
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.7,
        delay: index * (isMobile ? 0.04 : 0.08),
        ease: "power2.out",
        force3D: true,
        willChange: "opacity, transform",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top 90%",
          once: true,
        },
      },
    );
  },

  "fade-in": (el) =>
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration,
        ease: "power2.out",
        scrollTrigger: getTrigger(el),
      },
    ),

  "parallax-y": (el, config = {}) => {
    if (!enableParallax) return;
    const y = config.y ?? -8;
    const scrub = config.scrub ?? 0.8;
    gsap.to(el, {
      yPercent: y,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    });
  },
};

function initHero() {
  const heroImage = document.querySelector(".hero-bg img");
  if (!heroImage) return;

  if (isMobile) {
    gsap.from(".hero-content", { opacity: 0, y: 15, duration: 0.4, ease: "power2.out" });
    return;
  }

  gsap.set(heroImage, { willChange: "transform" });

  const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 4.5 });
  tl.from(heroImage, { scale: 1.12, duration: 1.8 })
    .from(".hero-hodeco span", { opacity: 0, duration: 1, stagger: 0.03 }, "-=0.6")
    .from(".hero-content", { opacity: 0, y: 20, duration: 0.9 }, "-=0.4")
    .from(".hero-script", { opacity: 0, scale: 0.96, duration: 0.9 }, "-=0.3");

  if (!enableParallax) return;

  gsap.to(".hero-bg img", {
    yPercent: -12,
    ease: "none",
    scrollTrigger: { trigger: ".home-banner", start: "top top", end: "bottom top", scrub: 0.6 },
  });
  gsap.to(".hero-script", {
    y: -60,
    ease: "none",
    scrollTrigger: { trigger: ".home-banner", start: "top top", end: "bottom top", scrub: 0.6 },
  });
  gsap.to(".hero-bottom", {
    y: 30,
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: ".home-banner", start: "top top", end: "bottom top", scrub: 0.6 },
  });
}

function initPageAnimations() {
  const els = [...document.querySelectorAll("[data-animate]")].filter(
    (el) => !el.hasAttribute("data-disable"),
  );

  const toAnimate = [
    "reveal-up", "lift-in", "lift-in-stagger", "soft-scale",
    "slide-in-left", "slide-in-right", "cta-pop", "fade-in",
  ];

  els.forEach((el) => {
    if (toAnimate.includes(el.dataset.animate)) {
      el.style.opacity = "0";
    }
  });

  const simpleTypes = new Set(toAnimate);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const type = el.dataset.animate;
        const config = el.dataset.config ? JSON.parse(el.dataset.config) : null;
        el.style.opacity = "";
        animations[type]?.(el, config);
        observer.unobserve(el);
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
  );

  els.forEach((el) => {
    const type = el.dataset.animate;
    if (simpleTypes.has(type)) {
      observer.observe(el);
    } else {
      const config = el.dataset.config ? JSON.parse(el.dataset.config) : null;
      animations[type]?.(el, config);
    }
  });
}

function initHoverEffects() {
  if (!enableHoverEffects) return;
  const corners = gsap.utils.toArray(".home-card-corner, .cutout-corner, .card-corner");

  corners.forEach((corner) => {
    const btn = corner.firstElementChild;
    if (!btn) return;

    gsap.set(btn, { transformPerspective: 600, transformOrigin: "center", willChange: "transform" });

    const xTo = gsap.quickTo(btn, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.2, ease: "power3.out" });

    corner.addEventListener("mousemove", (e) => {
      const rect = corner.getBoundingClientRect();
      const moveX = (e.clientX - rect.left) / rect.width - 0.5;
      const moveY = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(moveX * 16);
      yTo(moveY * 16);
    });

    corner.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.08, duration: 0.2, ease: "power2.out" });
    });

    corner.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.35, ease: "power3.out" });
    });
  });
}

function initRoadAnimation() {
  const path = document.querySelector("#motionPath");
  if (!path) return;

  const allYears = [...document.querySelectorAll(".road-year-data [data-year]")]
    .map((el) => ({ year: el.dataset.year, text: el.dataset.text, img: el.dataset.img }))
    .sort((a, b) => b.year - a.year);

  if (!allYears.length) return;

  const imgMap = {
    orange: "resources/img/about/orange-location-dot.png",
    blue: "resources/img/about/blue-location-dot.png",
  };

const endPositions = [0.23, 0.38, 0.54, 0.73, 0.80, 0.86];
const PAGE_SIZE = 6;
  let currentPage = 0;
  const totalPages = Math.ceil(allYears.length / PAGE_SIZE);
  let isAnimating = false;

const slots = [0, 1, 2, 3, 4, 5].map((i) => document.querySelector(`#dot-slot-${i}`));
const labels = [0, 1, 2, 3, 4, 5].map((i) => document.querySelector(`#label-slot-${i}`));
  const btnNext = document.querySelector("#road-next");
  const btnPrev = document.querySelector("#road-prev");

  if (!slots[0] || !labels[0]) return;

  function updateArrows() {
    gsap.to(btnPrev, { opacity: currentPage === 0 ? 0.3 : 1, duration: 0.3 });
    gsap.to(btnNext, { opacity: currentPage === totalPages - 1 ? 0.3 : 1, duration: 0.3 });
    btnPrev.style.pointerEvents = currentPage === 0 ? "none" : "auto";
    btnNext.style.pointerEvents = currentPage === totalPages - 1 ? "none" : "auto";
  }

  function playPage(page) {
    isAnimating = true;
    const years = allYears.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    gsap.killTweensOf([...slots, ...labels]);
    gsap.to([...slots, ...labels], {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete() {
        years.forEach((data, i) => {
          slots[i].src = imgMap[data.img];
          labels[i].querySelector(".label-year").textContent = data.year;
          labels[i].querySelector(".label-text").innerHTML = data.text;
          gsap.set(slots[i], {
            opacity: 0, scale: 1,
            motionPath: { path: "#motionPath", align: "#motionPath", alignOrigin: [0.5, 1], autoRotate: false, start: 0, end: 0 },
          });
          gsap.set(labels[i], { opacity: 0, y: 8 });
        });

        let completed = 0;
        const total = years.length;
        const safetyTimer = gsap.delayedCall(2.5 + total * 0.15 + 1, () => { isAnimating = false; });

        years.forEach((data, i) => {
          gsap.killTweensOf(slots[i]);
          gsap.killTweensOf(labels[i]);
          gsap.timeline({ delay: i * 0.15 })
            .to(slots[i], { opacity: 1, duration: 0.3, ease: "power2.out" })
            .to(slots[i], {
              motionPath: { path: "#motionPath", align: "#motionPath", alignOrigin: [0.5, 1], autoRotate: false, start: 0, end: endPositions[i] },
              duration: 2.5,
              ease: "sine.inOut",
            })
            .to(slots[i], { scale: 1.15, duration: 0.2, ease: "sine.out" })
            .to(slots[i], { scale: 1, duration: 0.3, ease: "sine.inOut" })
            .to(labels[i], { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")
            .call(() => {
              completed++;
              if (completed === total) { safetyTimer.kill(); isAnimating = false; }
            });
        });

        updateArrows();
      },
    });
  }

  btnNext.addEventListener("click", () => { if (currentPage < totalPages - 1) { currentPage++; playPage(currentPage); } });
  btnPrev.addEventListener("click", () => { if (currentPage > 0) { currentPage--; playPage(currentPage); } });

  ScrollTrigger.refresh();
  const roadWrap = document.querySelector(".road-wrap");
  const rect = roadWrap.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    gsap.delayedCall(0.3, () => playPage(0));
  } else {
    ScrollTrigger.create({ trigger: ".road-wrap", start: "top 70%", once: true, onEnter: () => playPage(0) });
  }
}


function initAll() {
  window.__GSAP_INITED__ = true;
  initHero();
  initPageAnimations();
  initHoverEffects();
  initRoadAnimation();
}

function waitForHeroImage() {
  const img = document.querySelector(".hero-bg img");
  const start = () => {
    initAll();
    gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
  };

  if (!img) return start();
  if (img.complete) {
    img.decode?.().then(start).catch(start);
  } else {
    img.addEventListener("load", () => img.decode?.().then(start).catch(start));
    gsap.delayedCall(3, () => { if (!window.__GSAP_INITED__) start(); });
  }
}

if (document.readyState === "complete") {
  waitForHeroImage();
} else {
  window.addEventListener("load", waitForHeroImage);
}

window.__debugScrollTriggers = () =>
  ScrollTrigger.getAll().forEach((st, i) =>
    console.log(`[ST ${i}]`, { trigger: st.trigger, start: st.start, progress: st.progress }),
  );
window.__debugMarkers = (on = true) => {
  ScrollTrigger.getAll().forEach((st) => (st.vars.markers = on));
  ScrollTrigger.refresh(true);
};