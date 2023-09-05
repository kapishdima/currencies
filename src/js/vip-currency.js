import { fetchCurrencies } from "./api";

export const createVipCurrency = async () => {
  const currencies = await fetchCurrencies();
  const currencyCode =
    new URLSearchParams(window.location.search).get("code") || "usd";

  const currencyItemEls = document.querySelectorAll('[data-el="currency"]');
  const currencyCodeEls = document.querySelectorAll('[data-el="code"]');
  const currencyAmountEls = document.querySelectorAll('[data-el="amount"]');

  const currency = currencies.find(
    (currency) => currency.code.toLowerCase() === currencyCode.toLowerCase()
  );

  currencyItemEls.forEach((currencyItem) => {
    const type = currencyItem.dataset.type;

    if (!currency) {
      return null;
    }

    currencyItem.textContent = currency[type];
  });

  currencyCodeEls.forEach((currencyCodeEl) => {
    currencyCodeEl.textContent = currencyCode.toUpperCase();
  });

  currencyAmountEls.forEach((currencyAmountEl) => {
    if (!currency) {
      return null;
    }
    currencyAmountEl.textContent = currency.qty;
  });
};
