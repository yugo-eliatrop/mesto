import { Popup  } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    // через супер вызываю конструктор родительского попапа
    // и передаю аргумент - селектор попапа
    super(popupSelector);

    // нахожу попап картинки и подпись, кладу в классовые переменные
    this._popupImageContent = this._popupElement.querySelector('.popup__image');
    this._popupFigcaption = this._popupElement.querySelector('.popup__figcaption');
  }

  // переопределяю метод open для зума картинки
  open(name, link) {
    this._popupImageContent.src = link;
    this._popupImageContent.alt = name;
    this._popupFigcaption.name = name;

    // вызываю метод открытия попапа картинки
    super.open(name, link);
  }
}
