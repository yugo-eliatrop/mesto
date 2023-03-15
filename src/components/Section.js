export class Section {
  constructor({ renderer }, containerSelector ) {
    // конструктор принимает функцию рендеринга карточек
    // и селектор контейнера, куда добавлять карточки
    /* this._items  = items; */
    this._renderer = renderer; // это функция renderer
    this._cardsContainer = document.querySelector(containerSelector);
  }

  // метод отрисовки всех карточек
  renderItems(items) {
    items.forEach((element) => {
      this._renderer(element);
    });
  }

  // метод добавления карточек в DOM
  addItem(element) {
    this._cardsContainer.prepend(element);
  }
}
