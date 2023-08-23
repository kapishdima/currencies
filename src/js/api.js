const CURRENCIES_UPDATES_API =
  "https://sheets.googleapis.com/v4/spreadsheets/1cBEIpirL1ue-pFmWh2pIuKfdjWs29ztVBveNLLDVmgg/values/rates?alt=json&key=AIzaSyDr4tzhcbs4p30pk0s-4tIGX-WqZIS6GSo";
const UPDATES_VALUES_OFFSET = 4;

export const fetchCurrencies = async () => {
  const currenciesUpdates = await fetch(CURRENCIES_UPDATES_API).then((res) =>
    res.json()
  );

  if (!currenciesUpdates || !currenciesUpdates.values) {
    return [];
  }

  const currencies = currenciesUpdates.values.slice(UPDATES_VALUES_OFFSET);
  return currencies;
};
