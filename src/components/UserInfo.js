export class UserInfo {

  constructor({ nameSelector, jobSelector }) {
    // конструктор принимает объект с селекторами двух элементов:
    // элемента имени пользователя и информации о себе
    this._dataName = nameSelector;
    this._dataJob = jobSelector;
  }

  getUserInfo() {
    // создаю пустой объект, куда будут записываться
    // данные пользователя
    const dataUser = {};
    // данные пользователя подставляются в форму при открытии
    dataUser.name = this._dataName.textContent;
    dataUser.job = this._dataJob.textContent;

    return dataUser;
  }

  // метод принимает данные пользователя и добавляет их на страницу
  setUserInfo(dataUser) {
    this._dataName.textContent = dataUser.name;
    this._dataJob.textContent = dataUser.job;
  }
}
