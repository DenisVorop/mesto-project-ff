import './pages/index.css';
import { createCard, likeCard, prepareCardNodes } from './scripts/cards';
import { closeModal, openModal } from './scripts/modal';
import { serverActions } from './scripts/api';
import { hideInputError, setEventListeners, toggleButtonState } from './scripts/validation';

const cardTemplate = document.getElementById("card-template");

const cardsContainer = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeConfirmRemoving = document.querySelector('.popup_type_confirm_removing');
const popupTypeAvatarImage = document.querySelector('.popup_type_new_avatar');

const name = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');
const image = document.querySelector('.profile__image');

const popupImg = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const forms = document.forms;
const editForm = forms['edit-profile'];
const addForm = forms['new-place'];
const removeCardForm = forms['remove-card'];
const newAvatarForm = forms['new-avatar'];

const toggleLike = (id, isLiked) => {
  let fn = null
  return (e) => {
    if (isLiked) {
      fn = serverActions.removeLike
      isLiked = false
    } else {
      fn = serverActions.addLike
      isLiked = true
    }

    fn(id).then(res => {
      likeCard(e, res.likes.length)
    }).catch(console.error)
  }
}

const setIdToRemoveCardPopup = (id) => {
  removeCardForm['card-id'].value = id
}

const imageCallback = ({ name, link }) => {
  popupImg.src = link;
  popupImg.alt = `изображение в модальном окне, на котором ${name}`
  popupCaption.textContent = name

  openModal(popupTypeImage)
};

const removeCardCallback = ({ id }) => {
  setIdToRemoveCardPopup(id)
  openModal(popupTypeConfirmRemoving)
}

const initProfile = (user) => {
  name.textContent = user.name;
  description.textContent = user.about;

  if (user.avatar) {
    image.style.backgroundImage = `url(${user.avatar})`;
  }
}

const initCards = (cards, me) => {
  cards.forEach((card) => {
    const isLiked = card.likes.find(user => user._id === me._id)

    const cardNode = createCard(
      cardTemplate,
      card,
      removeCardCallback,
      toggleLike(card._id, isLiked),
      imageCallback
    )

    prepareCardNodes(
      cardNode,
      {
        isLiked,
        isOwner: card.owner._id === me._id,
        likesCount: card.likes.length,
      }
    )

    cardsContainer.append(cardNode);
  });
};

const clearValidation = (popup, form) => {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  const buttonElement = popup.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity("");
    hideInputError(form, inputElement)
  })
}

addCardButton.addEventListener('click', () => {
  openModal(popupTypeNewCard)
  clearValidation(popupTypeNewCard, addForm);
});

editProfileButton.addEventListener('click', () => {
  editForm.name.value = name.textContent
  editForm.description.value = description.textContent

  openModal(popupTypeEdit)
  clearValidation(popupTypeEdit, editForm);
});

image.addEventListener('click', (e) => {
  openModal(popupTypeAvatarImage)
  clearValidation(popupTypeAvatarImage, newAvatarForm);
})

addForm.addEventListener('submit', (e) => {
  e.preventDefault()

  serverActions.createCard({
    name: e.target['place-name'].value,
    link: e.target.link.value,
  }).then(res => {
    const newCard = createCard(
      cardTemplate,
      res,
      removeCardCallback,
      toggleLike(res._id, false),
      imageCallback
    )
    cardsContainer.prepend(newCard);
    closeModal(popupTypeNewCard)
  }).catch(console.error)
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault()

  serverActions.updateMe({
    name: e.target.name.value,
    about: e.target.description.value,
  }).then(res => {
    initProfile(res)
    closeModal(popupTypeEdit)
  }).catch(console.error)
});

removeCardForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const id = e.target['card-id'].value

  serverActions.removeCard(id).then(res => {
    const removedCard = document.querySelector(`[data-card-id="${id}"]`)
    removedCard.remove()
    closeModal(popupTypeConfirmRemoving)
  }).catch(console.error)
});

newAvatarForm.addEventListener('submit', (e) => {
  e.preventDefault()

  serverActions.updateAvatar({
    avatar: e.target['avatar-link'].value
  }).then(res => {
    initProfile(res)
    closeModal(popupTypeAvatarImage)
  }).catch(console.error)
})

Promise.all([
  serverActions.getMe(),
  serverActions.getCards(),
]).then(([me, cards]) => {
  initProfile(me)
  initCards(cards, me)
})

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    setEventListeners(formElement)
  })
}

enableValidation()
