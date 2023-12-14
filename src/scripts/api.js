const methods = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

const routes = {
    me: () => '/users/me',
    cards: () => '/cards',
    card: (id) => `/cards/${id}`,
    likeCard: (id) => `/cards/likes/${id}`
}

const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
        authorization: 'b44bee0a-d29f-428f-9afc-1ffe63840a0c',
        'Content-Type': 'application/json'
    }
}

const resultProcessing = res => {
    if (res.ok) {
        return res.json()
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`)
}

export const API = ({ url, method = methods.GET, body }) => {
    return fetch(`${config.baseUrl}/${url}`, {
        method,
        headers: config.headers,
        body: JSON.stringify(body),
    })
}

const getMe = () => API({ url: routes.me() }).then(resultProcessing)
const updateMe = (body) => API({ url: routes.me(), method: methods.PATCH, body }).then(resultProcessing)
const updateAvatar = (body) => API({ url: `${routes.me()}/avatar`, method: methods.PATCH, body }).then(resultProcessing)

const getCards = () => API({ url: routes.cards() }).then(resultProcessing)
const createCard = (body) => API({ url: routes.cards(), method: methods.POST, body }).then(resultProcessing)
const removeCard = (id) => API({ url: routes.card(id), method: methods.DELETE }).then(resultProcessing)

const addLike = (id) => API({ url: routes.likeCard(id), method: methods.PUT }).then(resultProcessing)
const removeLike = (id) => API({ url: routes.likeCard(id), method: methods.DELETE }).then(resultProcessing)

export const serverActions = {
    getMe,
    updateMe,
    updateAvatar,

    getCards,
    createCard,
    removeCard,

    addLike,
    removeLike,
}