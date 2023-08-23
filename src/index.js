import "./styles/index.scss";

import { createCurrencyTable } from "./js/currency-table";
import { createCalculator } from "./js/calculator";

document.addEventListener("DOMContentLoaded", () => {
  createCurrencyTable();
  createCalculator();
});
