export class UserInfo {

  constructor({ name, about, avatar, _id }) {
    // конструктор принимает объект с селекторами двух элементов:
    // элемента имени пользователя и информации о себе
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
  }

  getUserInfo() {
    // возвращаю объект с данными пользователя,
    // данные подставляются при открытии формы
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  // метод принимает данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
