// swiper.js

import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';

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