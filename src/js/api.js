const CURRENCIES_UPDATES_API =
  "https://sheets.googleapis.com/v4/spreadsheets/1cBEIpirL1ue-pFmWh2pIuKfdjWs29ztVBveNLLDVmgg/values/rates?alt=json&key=AIzaSyDr4tzhcbs4p30pk0s-4tIGX-WqZIS6GSo";
const UPDATES_VALUES_OFFSET = 4;

export const VISIBLE_COLUMNS = ["name", "qty", "code", "buyRate", "sellRate"];

export const fetchCurrencies = async () => {
  const currenciesUpdates = await fetch(CURRENCIES_UPDATES_API).then((res) =>
    res.json()
  );

  if (!currenciesUpdates || !currenciesUpdates.values) {
    return [];
  }

  const currencies = currenciesUpdates.values.slice(UPDATES_VALUES_OFFSET);
  return currencies.map((currency) => ({
    code: currency[0],
    qty: currency[1],
    name: {
      cz: currency[2],
      en: currency[3],
      ru: currency[4],
      ua: currency[5],
    },
    buyRate: currency[6],
    sellRate: currency[7],
    url: {
      cz: currency[8] || "",
      en: currency[9] || "",
      ua: currency[10] || "",
      ru: currency[11] || "",
    },
  }));
};
