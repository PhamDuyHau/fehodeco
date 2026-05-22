// about.js
function initAboutYearSync() {
  const section = document.querySelector(".about-year");
  if (!section) return;

  const swiperEl = section.querySelector("#swiper-about-year");
  const buttons = section.querySelectorAll(".year-pill");

  const swiper = swiperEl.swiper;

  if (!swiper) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetYear = button.dataset.year;

      const targetSlide = [...swiper.slides].findIndex(
        (slide) => slide.dataset.year === targetYear,
      );

      if (targetSlide !== -1) {
        swiper.slideTo(targetSlide);
      }
    });
  });

  swiper.on("slideChange", () => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeYear = activeSlide.dataset.year;

    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });

    const activeBtn = section.querySelector(
      `.year-pill[data-year="${activeYear}"]`,
    );

    if (activeBtn) {
      activeBtn.classList.add("active");
    }
  });
}
function initCeoCards() {
  const cards = document.querySelectorAll(".ceo-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const siblings = [...card.parentElement.querySelectorAll(".ceo-card")];
        const index = siblings.indexOf(card);

        // stagger delay via inline style, then add class
        card.style.transitionDelay = `${index * 0.07}s`;
        card.classList.add("is-visible");
        observer.unobserve(card);
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => observer.observe(card));
}

document.addEventListener("DOMContentLoaded", () => {
  initAboutYearSync();
  initCeoCards();
});


