document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.shareholder-profile').forEach(section => {
    const tabs    = section.querySelectorAll('.pill-profile');
    const docs    = section.querySelectorAll('.doc-row');
    const docList = section.querySelector('.doc-list');

    if (!docList) return;

    let activeTab  = 0;
    let activeYear = '2026';

    function filterDocs() {
      let any = false;
      docs.forEach(doc => {
        const show = doc.dataset.tab == activeTab && doc.dataset.year == activeYear;
        doc.style.display = show ? 'flex' : 'none';
        if (show) any = true;
      });
      let empty = section.querySelector('.empty-msg');
      if (!any) {
        if (!empty) {
          empty = document.createElement('div');
          empty.className = 'empty-msg text-center text-gray-500 mt-6';
          empty.innerText = 'Không có tài liệu';
          docList.appendChild(empty);
        }
      } else {
        empty?.remove();
      }
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTab = i;
        filterDocs();
      });
    });

    section.addEventListener('yearChange', (e) => {
      activeYear = e.detail.year;
      filterDocs();
    });

    filterDocs();
  });
});