// Темплейт карточки

const cardTemplate = document.getElementById("card-template");

// DOM узлы

const cardsContainer = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");

// Функция создания карточки

const createCard = ({ name, link }, callback) => {
  const cardTemplateContent = cardTemplate.content;
  const cardNode = cardTemplateContent.querySelector(".card").cloneNode(true);

  const cardImage = cardNode.querySelector(".card__image");
  const cardTitle = cardNode.querySelector(".card__title");
  const removeButton = cardNode.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = `на изображении ${name}`;

  cardTitle.textContent = name;

  removeButton.addEventListener('click', callback)

  return cardNode;
};

// Функция удаления карточки

const removeCard = (e) => {
  const card = e.target.closest(".card");
  card.remove();
};

// Вывести карточки на страницу

const initCards = (cards) => {
  cards.forEach((card) => {
    cardsContainer.append(createCard(card, removeCard));
  });
};

initCards(initialCards);
