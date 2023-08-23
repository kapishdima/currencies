import { fetchCurrencies } from "./api";

const tableSelector = '[data-el="tbody"]';

const createTableRows = (data) => {
  return data.map((record) => {
    const tr = document.createElement("tr");

    const td = document.createElement("td");
    const img = document.createElement("img");
    img.src = `/assets/images/flags/${record[0].toLowerCase()}.svg`;

    td.appendChild(img);
    tr.appendChild(td);

    for (const column of record) {
      const td = document.createElement("td");

      td.innerText = column;
      tr.appendChild(td);
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
