export const modalListeners = {}

// Функция закрытия попапа

const removeListeners = () => {
    Object.entries(modalListeners).forEach(([key, [type, callback, node]]) => {
        node.removeEventListener(type, callback);
        delete modalListeners[key]
    })
}

export const closeModal = (node) => {
    removeListeners()
    node.classList.remove('popup_is-opened')
}

const closeClickModal = (node) => {
    const popupContent = node.querySelector('.popup__content');

    const handler = (e) => {
        if (popupContent.contains(e.target) && !e.target.closest('.popup__close')) {
            return;
        }

        closeModal(node)
    };

    return handler
}

const closeEscModal = (node) => {
    const handler = (e) => {
        if (e.key !== 'Escape') {
            return;
        }

        closeModal(node)
    };

    return handler
}

// Функция открытия попапа

export const openModal = (node, callback) => {

    const handler = (e) => {
        node.classList.add('popup_is-opened');

        const closeClickModalListener = closeClickModal(node);
        const closeEscModalListener = closeEscModal(node);
        modalListeners['closeClickModalListener'] = ['click', closeClickModalListener, node];
        modalListeners['closeEscModal'] = ['keyup', closeEscModalListener, document];

        node.addEventListener('click', closeClickModalListener);
        document.addEventListener('keyup', closeEscModalListener);

        callback?.(node, e)
    };

    return handler
}
