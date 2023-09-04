import "./styles/index.scss";

import { createCurrencyTable } from "./js/currency-table";
import { createCalculator } from "./js/calculator";
import { setTranslatableValues } from "./js/locales";

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.id;

  setTranslatableValues();

  if (page === "table") {
    createCurrencyTable();
  } else {
    createCalculator();
  }
});
