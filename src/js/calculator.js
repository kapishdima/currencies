import { fetchCurrencies } from "./api";
import { createSelect, appendSelectData } from "./select";

export const createCalculator = async () => {
  const selectEls = document.querySelectorAll('[data-el="select"]');
  const currencies = await fetchCurrencies();

  const fromSelect = document.querySelector('[data-select="from"]');
  const toSelect = document.querySelector('[data-select="to"]');

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
    const fromCurrency = fromSelect.innerText;
    const toCurrency = toSelect.innerText;

    const result = convertCurrency(value, fromCurrency, toCurrency, currencies);

    toInput.value = result;
  });

  toInput.addEventListener("input", (event) => {
    const value = event.target.value || 0;
    const fromCurrency = toSelect.innerText;
    const toCurrency = fromSelect.innerText;

    const result = convertCurrency(value, fromCurrency, toCurrency, currencies);

    fromInput.value = result;
  });

  const fromSelectDropdown = selectEls[0].querySelector(
    '[data-el="select-dropdown"]'
  );
  const toSelectDropdown = selectEls[1].querySelector(
    '[data-el="select-dropdown"]'
  );

  Array.from(fromSelectDropdown.children).forEach((child) => {
    child.addEventListener("click", () => {
      const value = toInput.value || 0;
      const fromCurrency = child.dataset.value;
      const toCurrency = toSelect.innerText;

      const result = convertCurrency(
        value,
        fromCurrency,
        toCurrency,
        currencies
      );

      fromInput.value = result;
    });
  });

  Array.from(toSelectDropdown.children).forEach((child) => {
    child.addEventListener("click", () => {
      const value = fromInput.value || 0;
      const fromCurrency = fromSelect.innerText;
      const toCurrency = child.dataset.value;

      const result = convertCurrency(
        value,
        fromCurrency,
        toCurrency,
        currencies
      );

      toInput.value = result;
    });
  });

  reverseButton.addEventListener("click", () => {
    const toCurrency = toSelect.innerText;
    const fromCurrency = fromSelect.innerText;

    const fromFlagEl = selectEls[0].querySelector('[data-el="select-icon"]');
    const toFlagEl = selectEls[1].querySelector('[data-el="select-icon"]');

    const fromFlag = fromFlagEl.src;
    const toFlag = toFlagEl.src;

    const fromAmount = fromInput.value || 0;
    const toAmount = toInput.value || 0;

    fromSelect.innerText = toCurrency;
    toSelect.innerText = fromCurrency;

    fromInput.value = toAmount;
    toInput.value = fromAmount;

    fromFlagEl.src = toFlag;
    toFlagEl.src = fromFlag;
  });
};

const convertCurrency = (amount, fromCurrency, toCurrency, currencies) => {
  const from = currencies.find((currency) => currency[0] === fromCurrency);
  const to = currencies.find((currency) => currency[0] === toCurrency);

  console.log(from, to);

  if (!from || !to) {
    return;
  }

  const fromRate = parseFloat(from[3]);
  const toRate = parseFloat(to[2]);

  const convertedAmount = (amount * fromRate) / toRate;

  return Math.ceil(convertedAmount);
};
