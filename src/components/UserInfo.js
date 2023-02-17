export class UserInfo {

  constructor({ nameSelector, jobSelector }) {
    // конструктор принимает объект с селекторами двух элементов:
    // элемента имени пользователя и информации о себе
    this._dataName = nameSelector;
    this._dataJob = jobSelector;
  }

  getUserInfo() {
    // возвращаю объект с данными пользователя,
    // данные подставляются при открытии формы
    return {
      dataName: this._dataName.textContent,
      dataJob: this._dataJob.textContent
    };
  }

  // метод принимает данные пользователя и добавляет их на страницу
  setUserInfo({ dataName, dataJob }) {
    this._dataName.textContent = dataName;
    this._dataJob.textContent = dataJob;
  }
}
