import { fetchCurrencies } from "./api";

export const createVipCurrency = async () => {
  const currencies = await fetchCurrencies();
  const currencyCode =
    new URLSearchParams(window.location.search).get("code") || "usd";

  const currencyItemEls = document.querySelectorAll('[data-el="currency"]');
  const currencyCodeEls = document.querySelectorAll('[data-el="code"]');

  const usd = currencies.find(
    (currency) => currency.code.toLowerCase() === currencyCode.toLowerCase()
  );

  currencyItemEls.forEach((currencyItem) => {
    const type = currencyItem.dataset.type;
    currencyItem.textContent = usd[type];
  });

  currencyCodeEls.forEach((currencyCodeEl) => {
    currencyCodeEl.textContent = currencyCode.toUpperCase();
  });
};
