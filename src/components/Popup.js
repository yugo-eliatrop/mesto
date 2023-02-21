export class Popup {
  constructor(popupSelector) {
    // конструктор принимает селектор попапа
    this._popupElement = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      // закрываю попап
      this.close();
    }
  }

  _handlePopupOverlayClose(evt) {
    if (evt.target.classList.contains('popup__overlay')) {
      this.close();
    };
  }

  // публичный метод, отвечающий за открытие попапа
  open() {
    this._popupElement.classList.add('popup_opened');
    // навешиваю обработчик на закрытие открытого попапа по кнопке Esc
    document.addEventListener('keydown', this._handleEscClose);
  }

  // публичный метод, отвечающий за закрытие попапа
  close() {
    this._popupElement.classList.remove('popup_opened');
    // удаляю обработчик при закрытии попапа по кнопке Esc
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    // навешиваю слушателя на крестики
    this._popupElement.querySelector('.popup__close-button')
    .addEventListener('click', () => {
      this.close();
    });

    // навешиваю слушателя на закрытие попапа по клику на оверлэй
    this._popupElement.addEventListener('click', (evt) => {
      this._handlePopupOverlayClose(evt);
    });
  }
}
