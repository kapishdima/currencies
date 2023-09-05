import { fetchCurrencies } from "./api";

export const createVipCurrency = async () => {
  const currencies = await fetchCurrencies();
  const currencyItemEls = document.querySelectorAll('[data-el="currency"]');
  const usd = currencies.find(
    (currency) => currency.code.toLowerCase() === "usd"
  );

  currencyItemEls.forEach((currencyItem) => {
    const type = currencyItem.dataset.type;
    currencyItem.textContent = usd[type];
  });
};
