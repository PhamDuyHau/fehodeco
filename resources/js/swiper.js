// swiper.js

import Swiper from 'swiper';
import { Navigation, Pagination, Grid, Controller } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

export function initSwipers() {
  document.querySelectorAll('[data-fx-slider]').forEach((slider) => {
    const options = JSON.parse(slider.dataset.swiperOptions || '{}');

    const swiper = new Swiper(slider, {
      modules: [Navigation, Pagination, Grid],
      ...options,
      navigation: {
        nextEl: slider.parentElement.querySelector('.swiper-button-next-custom'),
        prevEl: slider.parentElement.querySelector('.swiper-button-prev-custom'),
      },
      pagination: {
        el: slider.querySelector('.swiper-pagination-custom'),
        clickable: true,
      },
    });

    if (slider.id === 'swiper-shareholder-year') {
      swiper.on('slideChange', () => {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const yearNode = activeSlide?.querySelector('.year-node');
        if (!yearNode) return;

        slider.querySelectorAll('.year-node').forEach(y => y.classList.remove('active'));
        yearNode.classList.add('active');

        yearNode.click();
      });
    }
  });
}

export function initProjectSlider2() {
  const section = document.querySelector('.home-project-2');
  if (!section) return;

  const items   = [...section.querySelectorAll('.project-data-2 > [data-number]')];
  if (!items.length) return;

  const frontEl = section.querySelector('.project-img-front-2');
  const backEl  = section.querySelector('.project-img-back-2');
  const numEl   = section.querySelector('.project-number-2');
  const titleEl = section.querySelector('.project-title-2');
  const ctaEl   = section.querySelector('.project-cta-2');

  // Build slides into both
  [frontEl, backEl].forEach((el, i) => {
    const wrapper = el.querySelector('.swiper-wrapper');
    items.forEach(item => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      const src = i === 0 ? item.dataset.imgFront : item.dataset.imgBack;
      slide.innerHTML = `<img src="${src}" class="w-full h-full object-cover" style="display:block" alt="">`;
      wrapper.appendChild(slide);
    });
  });

  const backSwiper = new Swiper(backEl, {
    modules: [Controller],
    loop: true,
    speed: 700,
    allowTouchMove: false,
  });

  const frontSwiper = new Swiper(frontEl, {
    modules: [Navigation, Controller],
    loop: true,
    speed: 700,
    grabCursor: true,
    navigation: {
      nextEl: section.querySelector('.swiper-button-next-custom'),
      prevEl: section.querySelector('.swiper-button-prev-custom'),
    },
    controller: {
      control: backSwiper,   // ← front drives back, direction is automatic
    },
  });

  backSwiper.controller.control = frontSwiper; // ← back also drives front (for completeness)

  // Content sync
  frontSwiper.on('slideChange', () => {
    const item = items[frontSwiper.realIndex];

    [numEl, titleEl].forEach(el => {
      el.style.transition = 'opacity 0.25s, transform 0.25s';
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(12px)';
    });

    setTimeout(() => {
      numEl.textContent    = item.dataset.number;
      titleEl.textContent  = item.dataset.title;
      ctaEl.href           = item.dataset.href;

      numEl.style.transition   = 'opacity 0.4s 0.05s, transform 0.4s 0.05s';
      numEl.style.opacity      = '1';
      numEl.style.transform    = 'translateY(0)';

      titleEl.style.transition = 'opacity 0.4s 0.15s, transform 0.4s 0.15s';
      titleEl.style.opacity    = '1';
      titleEl.style.transform  = 'translateY(0)';
    }, 250);
  });
}