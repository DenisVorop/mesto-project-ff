const closeByEsc = (e) => {
    if (e.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
};

const closeByClick = (e) => {
    if (
        !e.target.contains(e.currentTarget) && 
        !e.target.classList.contains('popup__close')
    ) return;

    closeModal(e.currentTarget);
}

export const closeModal = (node) => { 
    node.classList.remove('popup_is-opened');

    node.removeEventListener('click', closeByClick);
    document.removeEventListener('keydown', closeByEsc);
};

export const openModal = (node) => {
    node.classList.add('popup_is-opened');

    node.addEventListener('click', closeByClick);
    document.addEventListener('keydown', closeByEsc);
};