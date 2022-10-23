
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup__profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_profession');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAddButton = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup__elements');
const namePlace = document.querySelector('.popup__input_data_place');
const linkImage = document.querySelector('.popup__input_link_image');
const cardText = document.querySelector('.elements__card-text');
const cardImage = document.querySelector('.elements__card-image');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const templateElement = document.querySelector('.template__elements');
const popupImages = document.querySelector('.popup__images');
//const popupImageAdd = document.querySelector('.popup__images_active');
const popupImageContent = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');


function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function openEditPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

function openAddPopup() {
  openPopup(popupPlace);
}

function handleSubmitEditForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

function handleSubmitAddForm (evt) {
  evt.preventDefault();
  cardText.textContent = namePlace.value;
  cardImage.textContent = linkImage.value;
  closePopup(popupPlace);
}

// функция открытия попапа картнки
function openPopupImages(name, link) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupFigcaption.textContent = name;
  openPopup(popupImages);
 }

// создаю пустой контейнер, чтобы вложить карточки в секцию elements
const cardContainer = document.querySelector('.elements__cards');

// функция добавления карточек и лайка
function createCard(cardData) {
  const {link, name} = cardData;
  const newCardElement = templateElement.content.cloneNode(true);
  newCardElement.querySelector('.elements__card-text').textContent = name;
  newCardElement.querySelector('.elements__card-image').src = link;
  newCardElement.querySelector('.elements__card-image').alt = name;
  const cardImage = newCardElement.querySelector('.elements__card-image');
  cardImage.addEventListener('click', () => {
    openPopupImages(name, link);
  });
  const buttonLike = newCardElement.querySelector('.elements__like-button');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('elements__like-button_active');
  });
  return newCardElement;
  }

initialCards.forEach(data => {
  const newCard = createCard(data)
cardContainer.prepend(newCard);
});

// функция закрытия карточки
function deleteCard() {
  newCardElement
   .querySelector('.elements__delete-button_active')
   .addEventListener('click', (evt) => {
    const cardContainer = evt.currentTarget.closest('.elements__card');
    cardContainer(remove);
   })
}

profileEditButton.addEventListener('click', openEditPopup);
formElement.addEventListener('submit', handleSubmitEditForm);
popupCloseButton.addEventListener('click', closePopup(popupProfile));
popupCloseButton.addEventListener('click', closePopup(popupPlace));
profileAddButton.addEventListener('click', openAddPopup);
formElement.addEventListener('submit', handleSubmitAddForm);
//buttonPopupImage.addEventListener('click', openPopupImage);
popupCloseButton.addEventListener('click', function () {
  closePopup(popupImages);
})

// обработчик клика навешиваю на картинку в каждой карточке
//cardImage.addEventListener('click', () =>
//handlePreviewPicture(link, name)
//);
