const CURRENCIES_UPDATES_API =
  "https://sheets.googleapis.com/v4/spreadsheets/1cBEIpirL1ue-pFmWh2pIuKfdjWs29ztVBveNLLDVmgg/values/rates?alt=json&key=AIzaSyDr4tzhcbs4p30pk0s-4tIGX-WqZIS6GSo";
const UPDATES_VALUES_OFFSET = 4;
const tableSelector = '[data-el="tbody"]';

const fetchCurrencies = async () => {
  const currenciesUpdates = await fetch(CURRENCIES_UPDATES_API).then((res) =>
    res.json()
  );

  if (!currenciesUpdates || !currenciesUpdates.values) {
    return [];
  }

  const currencies = currenciesUpdates.values.slice(UPDATES_VALUES_OFFSET);
  return currencies;
};

const createTableRows = (data) => {
  return data.map((record) => {
    const tr = document.createElement("tr");

    const td = document.createElement("td");
    const img = document.createElement("img");
    img.src = `/assets/images/flags/${record[0].toLowerCase()}.png`;

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
