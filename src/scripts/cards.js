// Функция создания карточки

export const createCard = (cardTemplate, { name, link }, removeCallback, likeCallback) => {
  const cardTemplateContent = cardTemplate.content;
  const cardNode = cardTemplateContent.querySelector(".card").cloneNode(true);

  const cardImage = cardNode.querySelector(".card__image");
  const cardTitle = cardNode.querySelector(".card__title");
  const removeButton = cardNode.querySelector(".card__delete-button");
  const likeButton = cardNode.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = `на изображении ${name}`;

  cardTitle.textContent = name;

  removeButton.addEventListener('click', removeCallback)
  likeButton.addEventListener('click', likeCallback)

  return cardNode;
};

// Функция удаления карточки

export const removeCard = (e) => {
  e.stopPropagation()
  
  const card = e.target.closest(".card");
  card.remove();
};

// Функция лайка карточки

export const likeCard = (e) => {
  e.stopPropagation()

  const likeButton = e.target;
  likeButton.classList.toggle('card__like-button_is-active')
}