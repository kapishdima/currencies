import { VISIBLE_COLUMNS, fetchCurrencies } from "./api";
import { getLocale } from "./locales";

const tableSelector = '[data-el="tbody"]';

const createTableRows = (data) => {
  return data.map((currency) => {
    const tr = document.createElement("tr");

    const td = document.createElement("td");
    const img = document.createElement("img");
    img.src = `/assets/images/flags/${currency.code.toLowerCase()}.svg`;

    td.appendChild(img);
    tr.appendChild(td);

    for (const column of VISIBLE_COLUMNS) {
      const td = document.createElement("td");

      if (column === "name") {
        const locale = getLocale();
        const value = currency[column][locale];
        const link = document.createElement("a");

        link.innerText = value;
        link.href = currency.enpage;

        td.appendChild(link);
        tr.appendChild(td);
      } else {
        const value = currency[column];

        td.innerText = value;
        tr.appendChild(td);
      }
    }

    return tr;
  });
};

const renderTable = (data) => {
  const table = document.querySelector(tableSelector);

  if (!table) {
    return;
  }

  const trs = createTableRows(data);

  trs.forEach((tr) => {
    table.appendChild(tr);
  });
};

export const createCurrencyTable = async () => {
  const currencies = await fetchCurrencies();

  renderTable(currencies);
};
