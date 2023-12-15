const methods = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

const paths = {
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

const processResult = res => {
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

const getMe = () => API({ url: paths.me() }).then(processResult)
const updateMe = (body) => API({ url: paths.me(), method: methods.PATCH, body }).then(processResult)
const updateAvatar = (body) => API({ url: `${paths.me()}/avatar`, method: methods.PATCH, body }).then(processResult)

const getCards = () => API({ url: paths.cards() }).then(processResult)
const createCard = (body) => API({ url: paths.cards(), method: methods.POST, body }).then(processResult)
const removeCard = (id) => API({ url: paths.card(id), method: methods.DELETE }).then(processResult)

const addLike = (id) => API({ url: paths.likeCard(id), method: methods.PUT }).then(processResult)
const removeLike = (id) => API({ url: paths.likeCard(id), method: methods.DELETE }).then(processResult)

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