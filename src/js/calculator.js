import { fetchCurrencies } from "./api";
import { createSelect, appendSelectData } from "./select";

export const createCalculator = async () => {
  const selectEls = document.querySelectorAll('[data-el="select"]');
  const currencies = await fetchCurrencies();

  const fromSelect = document.querySelector('[data-select="from"]');

  const reverseButton = document.querySelector('[data-el="reverse-button"]');

  if (!selectEls) {
    return;
  }

  selectEls.forEach((selectEl) => {
    createSelect(selectEl);
    appendSelectData(selectEl, currencies);
  });

  const fromInput = document.querySelector('[data-el="from"]');
  const toInput = document.querySelector('[data-el="to"]');

  fromInput.addEventListener("input", (event) => {
    const value = event.target.value || 0;
    const currency = fromSelect.innerText;

    const result = convertToCZK(value, currency, currencies);

    toInput.value = result;
  });

  toInput.addEventListener("input", (event) => {
    const value = event.target.value || 0;
    const currency = fromSelect.innerText;

    const result = convertFromCZK(value, currency, currencies);

    fromInput.value = result;
  });

  const fromSelectDropdown = selectEls[0].querySelector(
    '[data-el="select-dropdown"]'
  );

  Array.from(fromSelectDropdown.children).forEach((child) => {
    child.addEventListener("click", () => {
      const value = fromInput.value || 0;
      const currency = child.dataset.value;

      const result = convertToCZK(value, currency, currencies);

      toInput.value = result;
    });
  });
};

const convertToCZK = (amount, fromCurrency, currencies) => {
  const from = currencies.find((currency) => currency[0] === fromCurrency);

  if (!from) {
    return;
  }

  const fromRate = parseFloat(from[3]);
  const convertedAmount = amount * fromRate;

  return Math.ceil(convertedAmount);
};

const convertFromCZK = (amount, fromCurrency, currencies) => {
  const from = currencies.find((currency) => currency[0] === fromCurrency);

  if (!from) {
    return;
  }

  const fromRate = parseFloat(from[3]);
  const convertedAmount = amount / fromRate;

  return Math.ceil(convertedAmount);
};
