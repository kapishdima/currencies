export const createSelect = (select) => {
  const input = select.querySelector('[data-el="select-input"]');

  if (!input) {
    return;
  }

  const toggle = () => select.classList.toggle("opened");

  input.addEventListener("click", toggle);
};

export const appendSelectData = (select, currencies) => {
  const dropdown = select.querySelector('[data-el="select-dropdown"]');
  const selectedIcon = select.querySelector('[data-el="select-icon"]');
  const selectedValue = select.querySelector('[data-el="select-value"]');

  if (!dropdown) {
    return;
  }

  currencies.reverse();
  currencies.forEach((currency) => {
    const tmpl = `
            <div
                class="select-dropdown__item"
                data-value="${currency.code}"
                data-el="dropdown-item"
            >
                <div class="select-dropdown__item-icon">
                    <img src="/assets/images/flags/${currency.code.toLowerCase()}.svg" alt="" />
                </div>
                <div class="select-dropdown__item-label">${currency.code}</div>
            </div>
        `;
    dropdown.insertAdjacentHTML("afterBegin", tmpl);
  });
  currencies.reverse();

  Array.from(dropdown.children).forEach((child) => {
    child.addEventListener("click", () => {
      const value = child.dataset.value;
      const icon = `/assets/images/flags/${value.toLowerCase()}.svg`;

      selectedIcon.src = icon;
      selectedValue.innerText = value;

      select.classList.remove("opened");
    });
  });
};
