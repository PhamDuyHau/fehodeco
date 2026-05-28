// news.js

function initNewsFilter() {
    const buttons = document.querySelectorAll(".cate-btn");
    const cards = document.querySelectorAll(".news-card");
    const heading = document.getElementById("category-heading");

    if (buttons.length === 0 || cards.length === 0) return;

    const initialCategory = document.querySelector(".cate-btn.active")?.dataset.category;
    cards.forEach(card => {
        if (card.getAttribute("data-category") !== initialCategory) {
            card.style.display = "none";
        }
    });

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.classList.contains("active")) return;

            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            if (heading) heading.textContent = button.textContent.trim().toUpperCase();

            const targetCategory = button.getAttribute("data-category");
            cards.forEach(card => {
                card.style.display = card.getAttribute("data-category") === targetCategory ? "" : "none";
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initNewsFilter();
});