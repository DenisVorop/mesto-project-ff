// Темплейт карточки

const cardTemplate = document.getElementById("card-template");

// DOM узлы

const cardsContainer = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");

// Функция создания карточки

const createCard = ({ name, link }) => {
  const cardTemplateContent = cardTemplate.content;
  const cardNode = cardTemplateContent.querySelector(".card").cloneNode(true);

  const cardImage = cardNode.querySelector(".card__image");
  const cardTitle = cardNode.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = `на изображении ${name}`;

  cardTitle.textContent = name;

  cardsContainer.append(cardNode);
};

// Функция удаления карточки

const removeCard = (e) => {
  const removeButton = e.target.closest(".card__delete-button");

  if (!removeButton) return;

  const card = e.target.closest(".card");
  card.remove();
};

cardsContainer.addEventListener("click", removeCard);

// Вывести карточки на страницу

const initCards = (cards) => {
  cards.forEach((card) => {
    createCard(card);
  });
};

initCards(initialCards);
