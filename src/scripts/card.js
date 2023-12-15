export const createCard = (cardTemplate, { name, link, _id, likes }, removeCallback, likeCallback, imageCallback) => {
  const cardTemplateContent = cardTemplate.content;
  const cardNode = cardTemplateContent.querySelector(".card").cloneNode(true);

  const cardImage = cardNode.querySelector(".card__image");
  const cardTitle = cardNode.querySelector(".card__title");
  const removeButton = cardNode.querySelector(".card__delete-button");
  const likeButton = cardNode.querySelector(".card__like-button");
  const likeCounter = cardNode.querySelector(".card__like-counter");

  cardNode.setAttribute('data-card-id', _id)

  cardImage.src = link;
  cardImage.alt = `на изображении ${name}`;

  cardTitle.textContent = name;
  likeCounter.textContent = likes.length;

  removeButton.addEventListener('click', () => removeCallback({id: _id}));
  likeButton.addEventListener('click', likeCallback);
  cardImage.addEventListener('click', () => imageCallback({ name, link }));

  return cardNode;
};

const updateLikesCounter = (cardNode, likesCount) => {
  const likesCounter = cardNode.querySelector(".card__like-counter")

  likesCounter.textContent = likesCount
}

export const likeCard = (e, likesCount) => {
  const cardNode = e.target.closest(".card")
  const likeButton = e.target;

  updateLikesCounter(cardNode, likesCount)
  likeButton.classList.toggle('card__like-button_is-active');
};

export const prepareInitCardNode = (cardNode, options) => {
  const removeButton = cardNode.querySelector(".card__delete-button");
  const likeButton = cardNode.querySelector(".card__like-button");

  if (!options.isOwner) {
    removeButton.remove();
  }

  if (options.isLiked) {
    likeCard({ target: likeButton })
  }

  if (options.likesCount) {
    updateLikesCounter(cardNode, options.likesCount)
  }

  return cardNode
}