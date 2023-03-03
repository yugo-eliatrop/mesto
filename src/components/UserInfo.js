export class UserInfo {

  constructor({ dataName, dataAbout, dataAvatar }) {
    // конструктор принимает объект с селекторами двух элементов:
    // элемента имени пользователя и информации о себе
    this._dataNameElement = dataName;
    this._dataAboutElement = dataAbout;
    this._dataAvatarElement = dataAvatar;
  }

  getUserInfo() {
    // возвращаю объект с данными пользователя,
    // данные подставляются при открытии формы
    return {
      dataName: this._dataNameElement.textContent,
      dataAbout: this._dataAboutElement.textContent,
      dataAvatar: this._dataAvatarElement.src
    };
  }

  // метод принимает данные пользователя и добавляет их на страницу
  setUserInfo({ dataName, dataAbout }) {
    this._dataNameElement.textContent = dataName;
    this._dataAboutElement.textContent = dataAbout;
  }

  setUserAvatar({ dataAvatar }) {
    this._dataAvatarElement.src = dataAvatar;
  }
}
