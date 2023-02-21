export class UserInfo {

  constructor({ dataName, dataJob }) {
    // конструктор принимает объект с селекторами двух элементов:
    // элемента имени пользователя и информации о себе
    this._dataName = dataName;
    this._dataJob = dataJob;
  }

  getUserInfo() {
    // возвращаю объект с данными пользователя,
    // данные подставляются при открытии формы
    return {
      dataName: this._dataName.textContent,
      dstaJob: this._dataJob.textContent
    };
  }

  // метод принимает данные пользователя и добавляет их на страницу
  setUserInfo({ dataName, dataJob }) {
    this._dataName.textContent = dataName;
    this._dataJob.textContent = dataJob;
  }
}
