import activeURL from '../config/baseUrl.js'

const baseUrl = activeURL;

export const login = async (email, password) => {

    let response = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let loginResult = await response.json();

    return loginResult;
};

export const register = async (email, password) => {
    let response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let regResult = await response.json();

    return regResult;

};

export const logout = async (token) => {

    return fetch(`${baseUrl}/users/logout`, {
        headers: {
            'X-Authorization': token,
        }
    })
}

export const getUserInfo = async (userId) => {

    let response = await fetch(`${baseUrl}/data/userData?where=_ownerId%3D%22${userId}%22`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let userInfo = await response.json();

    let result = Object.values(userInfo)[0];

    return result;
};


export const updateUsername = async (userInfo, username, token) => {
    let response = await fetch(`${baseUrl}/data/userData/${userInfo._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ ...userInfo, username })
    });

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let result = await response.json();

    return result;
};

export const createUserData = async (token, email) => {
    let response = await fetch(`${baseUrl}/data/userData`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({
            "avatar": "/images/avatar.png",
            "email": email,
            "aboutMe": "",
            "username": "Please add your nickname",
        })
    });

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let result = await response.json();

    return result;
};

export const getUserStadiumComments = async (userId) => {

    let response = await fetch(`${baseUrl}/data/comments?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let mystadiumComments = await response.json();

    return mystadiumComments;
};

export const getAllUsers = async () => {
    let response = await fetch(`${baseUrl}/data/userData`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let users = await response.json();

    // let result = Object.values(users);

    return users;
};


export const updateAboutMe = async (userInfo, aboutMe, token) => {
    let response = await fetch(`${baseUrl}/data/userData/${userInfo._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ ...userInfo, aboutMe })
    });

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let result = await response.json();

    return result;
};

export const searchUser = async function (searchInput) {

    let response = await fetch(`${baseUrl}/data/userData?where=email%3D%22${searchInput}%22`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let user = await response.json();

    let result = Object.values(user);

    return result;

}

export const updateAvatar = async (userInfo, avatar, token) => {
    let response = await fetch(`${baseUrl}/data/userData/${userInfo._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ ...userInfo, avatar })
    });

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let result = await response.json();

    return result;
};