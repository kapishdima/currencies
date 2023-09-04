export const getLocale = () => {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams.get("lang") || "cz";
};

export const translations = {
  cz: {
    Měna: "Měna",
    Název: "Název",
    Kód: "Kód",
    Množství: "Množství",
    "Kupu­jeme": "Kupu­jeme",
    "Prodá­váme": "Prodá­váme",
    "KALKULÁTOR NEJVÝHODNĚJŠÍCH KURZŮ": "KALKULÁTOR NEJVÝHODNĚJŠÍCH KURZŮ",
    "Mám měnu": "Mám měnu",
    "Chci vyměnit": "Chci vyměnit",
  },
  en: {
    Měna: "Currency",
    Název: "Name",
    Kód: "Code",
    Množství: "Amount",
    "Kupu­jeme": "Buy Rate",
    "Prodá­váme": "Sell Rate",
    "KALKULÁTOR NEJVÝHODNĚJŠÍCH KURZŮ": "BEST RATE CALCULATOR",
    "Mám měnu": "Currency",
    "Chci vyměnit": "Amount",
  },
  ru: {
    Měna: "Валюта",
    Název: "Название",
    Kód: "Код",
    Množství: "Кол-во",
    "Kupu­jeme": "Продажа",
    "Prodá­váme": "Покупка",
    "KALKULÁTOR NEJVÝHODNĚJŠÍCH KURZŮ": "ЛУЧШИЙ КАЛЬКУЛЯТОР КУРСОВ",
    "Mám měnu": "Валюта",
    "Chci vyměnit": "Кол-во",
  },
  ua: {
    Měna: "Валюта",
    Název: "Назва",
    Kód: "Код",
    Množství: "К-сть",
    "Kupu­jeme": "Продаж",
    "Prodá­váme": "Покупка",
    "KALKULÁTOR NEJVÝHODNĚJŠÍCH KURZŮ": "КРАЩИЙ КАЛЬКУЛЯТОР КУРСІВ",
    "Mám měnu": "Валюта",
    "Chci vyměnit": "К-сть",
  },
};

export const setTranslatableValues = () => {
  const translatableFields = document.querySelectorAll(
    '[data-translatable="true"]'
  );
  const locale = getLocale();

  if (!translatableFields) {
    return;
  }

  translatableFields.forEach((field) => {
    const fieldValue = field.innerText;
    const value = translations[locale][fieldValue];

    field.innerText = value;
  });
};
