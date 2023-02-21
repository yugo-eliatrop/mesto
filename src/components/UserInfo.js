export class UserInfo {

  constructor({ dataName, dataJob }) {
    // конструктор принимает объект с селекторами двух элементов:
    // элемента имени пользователя и информации о себе
    this._dataNameElement = dataName;
    this._dataJobElement = dataJob;
  }

  getUserInfo() {
    // возвращаю объект с данными пользователя,
    // данные подставляются при открытии формы
    return {
      dataName: this._dataNameElement.textContent,
      dataJob: this._dataJobElement.textContent
    };
  }

  // метод принимает данные пользователя и добавляет их на страницу
  setUserInfo({ dataName, dataJob }) {
    this._dataNameElement.textContent = dataName;
    this._dataJobElement.textContent = dataJob;
  }
}
