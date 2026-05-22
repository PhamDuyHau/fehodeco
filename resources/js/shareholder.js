document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.shareholder-profile');

  sections.forEach(section => {
    const tabs = section.querySelectorAll('.pill-profile');
    const years = section.querySelectorAll('.year-node');
    const docs = section.querySelectorAll('.doc-row');
    const docList = section.querySelector('.doc-list');
    const paginationEl = section.querySelector('#swiper-shareholder-year .swiper-pagination-custom');

    if (!docList) return;

    let activeTab = 0;
    let activeYear = "2026";

    // Build custom pagination - one bullet per year
    if (paginationEl) {
      paginationEl.innerHTML = '';
      years.forEach((node, i) => {
        const bullet = document.createElement('span');
        bullet.className = 'swiper-pagination-bullet' + (i === 0 ? ' swiper-pagination-bullet-active' : '');
        bullet.addEventListener('click', () => {
          setActiveYear(node, i);
        });
        paginationEl.appendChild(bullet);
      });
    }

    function syncBullets(activeIndex) {
      if (!paginationEl) return;
      paginationEl.querySelectorAll('.swiper-pagination-bullet').forEach((b, i) => {
        b.classList.toggle('swiper-pagination-bullet-active', i === activeIndex);
      });
    }

    function setActiveYear(node, index) {
      years.forEach(y => y.classList.remove('active'));
      node.classList.add('active');
      activeYear = node.dataset.index;
      syncBullets(index);
      filterDocs();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTab = index;
        filterDocs();
      });
    });

    years.forEach((year, i) => {
      year.addEventListener('click', () => {
        setActiveYear(year, i);
      });
    });

    function filterDocs() {
      let hasVisible = false;

      docs.forEach(doc => {
        const match = doc.dataset.tab == activeTab && doc.dataset.year == activeYear;
        doc.style.display = match ? "flex" : "none";
        if (match) hasVisible = true;
      });

      let empty = section.querySelector('.empty-msg');
      if (!hasVisible) {
        if (!empty) {
          const div = document.createElement('div');
          div.className = "empty-msg text-center text-gray-500 mt-6";
          div.innerText = "Không có tài liệu";
          docList.appendChild(div);
        }
      } else {
        empty?.remove();
      }
    }

    filterDocs();
  });
});