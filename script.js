document.addEventListener('DOMContentLoaded', () => {
    const currencyButton = document.querySelector('.currency-button');
    const currencyList = document.querySelector('.currency-list');
    const inputField = document.querySelector('.input-field');

    currencyButton.addEventListener('click', () => {
        currencyList.classList.toggle('hidden');
        currencyList.classList.toggle('visible');
    });

    currencyList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            currencyButton.textContent = `${event.target.textContent} ▼`;
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
