// swiper.js

import Swiper from "swiper";
import { Navigation, Pagination, Grid, Controller } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

export function initSwipers() {
  document.querySelectorAll("[data-fx-slider]").forEach((slider) => {
    const options = JSON.parse(slider.dataset.swiperOptions || "{}");

    const swiper = new Swiper(slider, {
      modules: [Navigation, Pagination, Grid],
      ...options,
      navigation: {
        nextEl: slider.parentElement.querySelector(
          ".swiper-button-next-custom",
        ),
        prevEl: slider.parentElement.querySelector(
          ".swiper-button-prev-custom",
        ),
      },
      pagination: {
        el: slider.querySelector(".swiper-pagination-custom"),
        clickable: true,
      },
    });

    if (slider.id === "swiper-shareholder-year") {
      const nodes = [...slider.querySelectorAll(".year-node")];
      const section = slider.closest(".shareholder-profile");
      const years = nodes.map((n) => n.dataset.index); // ['2026','2025',...,'2019']
      let activeYear = "2026";

      function activateYear(year) {
        activeYear = year;
        nodes.forEach((n) =>
          n.classList.toggle("active", n.dataset.index === year),
        );
        section?.dispatchEvent(
          new CustomEvent("yearChange", { detail: { year } }),
        );
      }

      nodes.forEach((node) => {
        node.addEventListener("click", () => activateYear(node.dataset.index));
      });

      slider.parentElement
        .querySelector(".swiper-button-next-custom")
        ?.addEventListener("click", () => {
          const i = years.indexOf(activeYear);
          activateYear(years[(i + 1) % years.length]);
        });

      slider.parentElement
        .querySelector(".swiper-button-prev-custom")
        ?.addEventListener("click", () => {
          const i = years.indexOf(activeYear);
          activateYear(years[(i - 1 + years.length) % years.length]);
        });
    }
  });
}

export function initProjectSlider() {
  const section = document.querySelector(".home-project");
  if (!section) return;

  const items = [...section.querySelectorAll(".project-data > [data-number]")];
  if (!items.length) return;

  const frontEl = section.querySelector(".project-img-front");
  const backEl = section.querySelector(".project-img-back");
  const numEl = section.querySelector(".project-number");
  const titleEl = section.querySelector(".project-title");
  const ctaEl = section.querySelector(".project-cta");

  [frontEl, backEl].forEach((el, i) => {
    const wrapper = el.querySelector(".swiper-wrapper");
    wrapper.innerHTML = "";
    items.forEach((item) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      const src = i === 0 ? item.dataset.imgFront : item.dataset.imgBack;
      slide.innerHTML = `<img src="${src}" class="w-full h-full object-cover" style="display:block" alt="">`;
      wrapper.appendChild(slide);
    });
  });

  numEl.textContent = items[0].dataset.number;
  titleEl.textContent = items[0].dataset.title;
  ctaEl.href = items[0].dataset.href;

  const backSwiper = new Swiper(backEl, {
    modules: [Controller],
    loop: true,
    loopedSlides: items.length,
    speed: 700,
    allowTouchMove: false,
  });

  const frontSwiper = new Swiper(frontEl, {
    modules: [Navigation, Controller],
    loop: true,
    loopedSlides: items.length,
    speed: 700,
    grabCursor: true,
    navigation: {
      nextEl: section.querySelector(".swiper-button-next-custom"),
      prevEl: section.querySelector(".swiper-button-prev-custom"),
    },
    controller: { control: backSwiper },
  });

  backSwiper.controller.control = frontSwiper;

  frontSwiper.on("slideChange", () => {
    const item = items[frontSwiper.realIndex];
    if (!item) return;

    [numEl, titleEl].forEach((el) => {
      el.style.transition = "opacity 0.25s, transform 0.25s";
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
    });

    setTimeout(() => {
      numEl.textContent = item.dataset.number;
      titleEl.textContent = item.dataset.title;
      ctaEl.href = item.dataset.href;

      numEl.style.transition = "opacity 0.4s 0.05s, transform 0.4s 0.05s";
      numEl.style.opacity = "1";
      numEl.style.transform = "translateY(0)";

      titleEl.style.transition = "opacity 0.4s 0.15s, transform 0.4s 0.15s";
      titleEl.style.opacity = "1";
      titleEl.style.transform = "translateY(0)";
    }, 250);
  });
}
