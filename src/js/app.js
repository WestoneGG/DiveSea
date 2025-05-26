import "../scss/null.scss";
import "../scss/style.scss";
import "../scss/libs/swiper.scss";
import "../js/main.js";
import "../js/files/sliders.js";

const sortDirection = {};

function normalizeNumber(str) {
  // Заміна , на . і видалення K (тисячі) з перетворенням
  str = str.replace(',', '.').replace(/\s/g, '');
  if (str.includes('K')) {
    return parseFloat(str.replace('K', '')) * 1000;
  }
  return parseFloat(str);
}

function sortTable(columnIndex) {
  const table = document.getElementById("productTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);

  sortDirection[columnIndex] = !sortDirection[columnIndex];

  // Очищення класів сортування
  table.querySelectorAll("th").forEach(th => th.classList.remove("sort-asc", "sort-desc"));
  const th = table.querySelectorAll("th")[columnIndex];
  th.classList.add(sortDirection[columnIndex] ? "sort-asc" : "sort-desc");

  rows.sort((a, b) => {
    let valA, valB;

    if (columnIndex === 0) {
      // Витягуємо текст з p.top-collection__table__name__title
      valA = a.cells[0].querySelector('.top-collection__table__name__title').innerText.trim();
      valB = b.cells[0].querySelector('.top-collection__table__name__title').innerText.trim();
    } else {
      valA = a.cells[columnIndex].innerText.trim();
      valB = b.cells[columnIndex].innerText.trim();
    }

    // Пробуємо перетворити в число
    const numA = normalizeNumber(valA);
    const numB = normalizeNumber(valB);
    const isNumeric = !isNaN(numA) && !isNaN(numB);

    if (isNumeric) {
      valA = numA;
      valB = numB;
    } else {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortDirection[columnIndex] ? -1 : 1;
    if (valA > valB) return sortDirection[columnIndex] ? 1 : -1;
    return 0;
  });

  // Перемальовування рядків
  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));
}

// Прив'язка подій після завантаження DOM
document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll("#productTable th");
  headers.forEach((th, index) => {
    th.addEventListener("click", () => sortTable(index));
  });
});
