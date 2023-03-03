export class Api {
    constructor(options) {
      this.options = options;
    }

    getInitialCards() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
    headers: {
      authorization: 'e976c748-5d06-45dd-8bfc-a73469c32b5f'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
    }

    createCard() {}

    deleteCard() {}
  }
