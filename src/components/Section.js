export class Section {
  constructor({ items, renderer }, containerSelector ) {
    // конструктор принимает объект с двумя свойствами
    // и селектор контейнера, куда добавлять карточки
    this._initialCards = items;
    this._renderer = renderer; // это функция renderer

    this._cardsContainer = document.querySelector(containerSelector);
  }

  // метод отрисовки всех элементов
  renderItems() {
    this._initialCards.forEach(item => {
      this._renderer(item);
    })
  }

  // метод добавления карточек в DOM
  addItem(element) {
    this._cardsContainer.prepend(element);
  }
}
