console.log('Hello, world');

const inputElement = document.querySelector('.popup__input');

// навешиваю слушателя ввода
inputElement.addEventListener('input', () => {
  console.log(inputElement);
})
