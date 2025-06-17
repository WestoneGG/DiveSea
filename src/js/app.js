import "../scss/null.scss";
import "../scss/style.scss";
import "../scss/libs/swiper.scss";
import "../js/main.js";
// import "../js/files/modules.js";
import "../js/files/sliders.js";
import "../js/libs/popup.js";

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

//

document.querySelectorAll('.just-unleash__aside__best__sellers__main__seller__follow__button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('_active'); // Додає або видаляє клас _active

    // Змінюємо текст кнопки
    if (button.classList.contains('_active')) {
      button.innerText = 'Unfollow'; // Текст при активному стані
    } else {
      button.innerText = 'Follow'; // Текст при неактивному стані
    }
  });
});

function startTimer(duration, display) {
  let timer = duration; // Початковий час у секундах
  let hours, minutes, seconds;

  const interval = setInterval(() => {
    hours = Math.floor(timer / 3600);
    minutes = Math.floor((timer % 3600) / 60);
    seconds = timer % 60;

    // Форматуємо час у форматі HHh MMm SSs
    display.textContent = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;

    if (timer > 0) {
      timer--; // Зменшуємо час
    } else {
      clearInterval(interval); // Зупиняємо таймер, коли час закінчується
      display.textContent = "00h 00m 00s"; // Таймер завершився
    }
  }, 1000); // Оновлення кожну секунду
}

// Запуск таймера для кожної картки
document.addEventListener("DOMContentLoaded", () => {
  const timerDisplays = document.querySelectorAll('.explore-marketplace__card__timer'); // Вибираємо всі таймери
  const duration = 25752;

  timerDisplays.forEach(timerDisplay => {
    startTimer(duration, timerDisplay); // Запускаємо таймер для кожного елемента
  });
});


// Випадаюче меню для вибору валюти в попапі "Your Bid"
document.addEventListener('DOMContentLoaded', () => {
  const currencyButton = document.querySelector('.popup__content__your__bid__currency__button');
  const currencyList = document.querySelector('.popup__content__your__bid__currency__list');
  const inputField = document.querySelector('.popup__content__your__bid__input__field');

  currencyButton.addEventListener('click', () => {
      currencyList.classList.toggle('hidden');
      currencyList.classList.toggle('visible');
  });

  currencyList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
          currencyButton.textContent = `${event.target.textContent}`;
          currencyList.classList.add('hidden');
          currencyList.classList.remove('visible');
      }
  });

  document.addEventListener('click', (event) => {
      if (!currencyButton.contains(event.target) && !currencyList.contains(event.target)) {
          currencyList.classList.add('hidden');
          currencyList.classList.remove('visible');
      }
  });
});

// stats table

function sortStatsTable(columnIndex) {
  const table = document.getElementById("statsTable");
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
      // Витягуємо текст з p.leaderboard__table__name__title
      valA = a.cells[0].querySelector('.leaderboard__table__name__title').innerText.trim();
      valB = b.cells[0].querySelector('.leaderboard__table__name__title').innerText.trim();
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
  const statsHeaders = document.querySelectorAll("#statsTable th");
  statsHeaders.forEach((th, index) => {
    th.addEventListener("click", () => sortStatsTable(index));
  });
});
