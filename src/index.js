import './pages/index.css';
import { initialCards } from './mocks/cards';
import { createCard, likeCard, removeCard } from './scripts/cards';
import { closeModal, openModal } from './scripts/modal';

// Темплейт карточки

const cardTemplate = document.getElementById("card-template");

// DOM узлы

const cardsContainer = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');

const name = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');

const popupImg = document.querySelector('.popup__image') ;
const popupCaption = document.querySelector('.popup__caption');

const forms = document.forms;
const editForm = forms['edit-profile'];
const addForm = forms['new-place'];

// 

const imageCallback = ({ name, link }) => {
  popupImg.src = link;
  popupImg.alt = `изображение в модальном окне, на котором ${name}`
  popupCaption.textContent = name

  openModal(popupTypeImage)
};

// Вывести карточки на страницу

const initCards = (cards) => {
  cards.forEach((card) => {
    cardsContainer.append(createCard(cardTemplate, card, removeCard, likeCard, imageCallback));
  });
};

initCards(initialCards);

// Открытие попапов

addCardButton.addEventListener('click', () => {
  openModal(popupTypeNewCard)
});

editProfileButton.addEventListener('click', () => {
  editForm.name.value = name.textContent
  editForm.description.value = description.textContent

  openModal(popupTypeEdit)
});

// Сабмит попапов

addForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const card = {
    name: e.target['place-name'].value,
    link: e.target.link.value,
  }
  
  cardsContainer.prepend(createCard(cardTemplate, card, removeCard, likeCard, imageCallback));
  closeModal(popupTypeNewCard)
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  name.textContent = e.target.name.value;
  description.textContent = e.target.description.value;

  closeModal(popupTypeEdit)
});