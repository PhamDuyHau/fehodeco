// home.js
import { initSwipers } from './swiper';

function initActivityTabs() {
  const wrappers = document.querySelectorAll('.activity-wrapper');
  
  wrappers.forEach((wrapper) => {
    const buttons = wrapper.querySelectorAll('.activity-btn');
    const items = wrapper.querySelectorAll('.activity-item');

    items.forEach((item, idx) => {
      item.classList.toggle('active', idx === 0);
    });

    buttons.forEach(btn => btn.classList.remove('activity-btn-active'));
    if (buttons[0]) {
      buttons[0].classList.add('activity-btn-active');
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');

        buttons.forEach(btn => btn.classList.remove('activity-btn-active'));
        button.classList.add('activity-btn-active');

        items.forEach(item => item.classList.remove('active'));

        const activeItem = wrapper.querySelector(`.activity-item[data-index="${index}"]`);
        if (activeItem) {
          activeItem.classList.add('active');
        }
      });
    });
  });
}

function initPartnerCards() {
  const partnerSection = document.querySelector('.home-partner');
  if (!partnerSection) return;

  partnerSection.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('.card-toggle-btn');
    if (!toggleBtn) return;

    const card = toggleBtn.closest('.partner-interactive-card');
    if (!card) return;

    const frontContent = card.querySelector('.card-front-content');
    const backContent = card.querySelector('.card-back-content');
    const numberText = card.querySelector('.card-number');
    const icon = toggleBtn.querySelector('.card-icon');

    if (!frontContent || !backContent) return;

    const isFrontVisible = frontContent.classList.contains('opacity-100');

    if (isFrontVisible) {
      frontContent.classList.replace('opacity-100', 'opacity-0');
      frontContent.classList.replace('pointer-events-auto', 'pointer-events-none');
      frontContent.classList.add('-translate-x-4');

      backContent.classList.replace('opacity-0', 'opacity-100');
      backContent.classList.replace('pointer-events-none', 'pointer-events-auto');
      backContent.classList.remove('translate-x-4');

      if (numberText) numberText.classList.replace('text-gray-100', 'text-primary/10');
      toggleBtn.classList.replace('bg-primary', 'bg-secondary');
      if (icon) icon.classList.replace('fa-eye', 'fa-eye-slash');

    } else {
      frontContent.classList.replace('opacity-0', 'opacity-100');
      frontContent.classList.replace('pointer-events-none', 'pointer-events-auto');
      frontContent.classList.remove('-translate-x-4');

      backContent.classList.replace('opacity-100', 'opacity-0');
      backContent.classList.replace('pointer-events-auto', 'pointer-events-none');
      backContent.classList.add('translate-x-4'); // Trả về bên phải chờ sẵn

      if (numberText) numberText.classList.replace('text-primary/10', 'text-gray-100');
      toggleBtn.classList.replace('bg-secondary', 'bg-primary');
      if (icon) icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSwipers();
  initActivityTabs();
  initPartnerCards();
});