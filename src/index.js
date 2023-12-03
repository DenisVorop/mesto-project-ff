import './pages/index.css'
import { initialCards } from './mocks/cards'
import { createCard, likeCard, removeCard } from './scripts/cards'
import { closeModal, modalListeners, openModal } from './scripts/modal';

// Темплейт карточки

const cardTemplate = document.getElementById("card-template");

// DOM узлы

const cardsContainer = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');

const forms = document.forms;

// Вывести карточки на страницу

const initCards = (cards) => {
  cards.forEach((card) => {
    cardsContainer.append(createCard(cardTemplate, card, removeCard, likeCard));
  });
};

initCards(initialCards);

// Функция отправки формы

const submitForm = (form, node, callback, ...rest) => {

  const handler = (e) => {
    callback?.(e, form, ...rest)

    form.reset()
    closeModal(node)
  }

  return handler
}

// коллбеки в слушатели submit форм

const updateCardForm = (e, form, values) => {
  e.preventDefault()

  values.name.textContent = form.name.value
  values.description.textContent = form.description.value
}

const createCardForm = (e, form) => {
  e.preventDefault()

  const card = {
    name: form['place-name'].value,
    link: form.link.value
  }

  cardsContainer.prepend(createCard(cardTemplate, card, removeCard, likeCard))
}

// Функции контента попапа

const setCreatePopupContent = (node) => {
  const createForm = forms['new-place']

  const newPlaceFormSubmitListener = submitForm(createForm, node, createCardForm)
  modalListeners['newPlaceFormSubmitListener'] = ['submit', newPlaceFormSubmitListener, createForm];
  createForm.addEventListener('submit', newPlaceFormSubmitListener)
}

const setEditPopupContent = (node, { target }) => {
  const profileInfo = target.closest('.profile__info')
  const name = profileInfo.querySelector('.profile__title')
  const description = profileInfo.querySelector('.profile__description')

  const editForm = forms['edit-profile']
  editForm.name.value = name.textContent
  editForm.description.value = description.textContent

  const editFormSubmitListener = submitForm(editForm, node, updateCardForm, { name, description });
  modalListeners['editFormSubmitListener'] = ['submit', editFormSubmitListener, editForm];
  editForm.addEventListener('submit', editFormSubmitListener)
}

const setImagePopupContent = (node, { target }) => {
  const card = target.closest('.card');
  const { src, alt } = card.querySelector('.card__image')
  const description = card.querySelector('.card__description').textContent

  const popupImg = node.querySelector('.popup__image')
  const popupCaption = node.querySelector('.popup__caption')

  popupImg.src = src
  popupImg.alt = alt
  popupCaption.textContent = description
}

// Открытие попапов

addCardButton.addEventListener('click', openModal(popupTypeNewCard, setCreatePopupContent))
editProfileButton.addEventListener('click', openModal(popupTypeEdit, setEditPopupContent))
cardsContainer.addEventListener('click', openModal(popupTypeImage, setImagePopupContent))