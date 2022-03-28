import activeURL from '../config/baseUrl.js'

const baseUrl = `${activeURL}/data`;

export const getAll = async () => {
    let response = await fetch(`${baseUrl}/stadiums`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiums = await response.json();

    let result = Object.values(stadiums);

    return result;
};

export const create = async (stadiumData, token) => {
    let response = await fetch(`${baseUrl}/stadiums`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ ...stadiumData, likes: [] })
    });

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let result = await response.json();

    return result;
};

export const getOne = async (stadiumId) => {

    let response = await fetch(`${baseUrl}/stadiums/${stadiumId}`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadium = await response.json();

    return stadium;

};

export const edit = async (id, stadiumData, token) => {
    let response = await fetch(`${baseUrl}/stadiums/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(stadiumData)
    });

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let result = await response.json();

    return result;
};

export const deleteStadium = async (id, token) => {
    let response = await fetch(`${baseUrl}/stadiums/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
    });

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let result = await response.json();

    return result;
};


export const getMyStadiums = async function (userId) {

    let response = await fetch(`${baseUrl}/stadiums?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiums = await response.json();

    let result = Object.values(stadiums);

    return result;

}

export const getLatestStadiums = async () => {
    let response = await fetch(`${baseUrl}/stadiums?sortBy=_createdOn%20desc`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiums = await response.json();

    let result = Object.values(stadiums)

    return result;
};

export const addComment = async (addComment, token) => {
    let response = await fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(addComment)
    });

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let result = await response.json();

    return result;
};

export const getStadiumComments = async (stadiumId) => {

    let response = await fetch(`${baseUrl}/comments?where=stadiumId%3D%22${stadiumId}%22`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiumComments = await response.json();

    return stadiumComments;
};

export const getLatestComments = async () => {
    let response = await fetch(`${baseUrl}/comments?sortBy=_createdOn%20desc`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let comments = await response.json();

    let result = Object.values(comments);

    return result;
};

export const getStadiumLikes = async (stadiumId) => {

    let response = await fetch(`${baseUrl}/likes?where=stadiumId%3D%22${stadiumId}%22`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiumComments = await response.json();

    return stadiumComments;
};

export const addLike = async (addLike, token) => {
    let response = await fetch(`${baseUrl}/likes`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(addLike)
    });

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let result = await response.json();

    return result;
};

export const searchStadiums = async function (searchInput) {

    let response = await fetch(`${baseUrl}/stadiums?where=name%3D%22${searchInput}%22`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiums = await response.json();

    let result = Object.values(stadiums);

    return result;

}

export const getLikedStadiums = async function () {

    let response = await fetch(`${baseUrl}/likes?distinct=stadiumId`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiums = await response.json();

    let stadiumIds = [];

    for (const key in stadiums) {
        stadiumIds.push(stadiums[key].stadiumId);
    }

    return stadiumIds;

}

export const getCommentedStadiums = async function () {

    let response = await fetch(`${baseUrl}/comments?distinct=stadiumId`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiums = await response.json();

    let stadiumIds = [];

    for (const key in stadiums) {
        stadiumIds.push(stadiums[key].stadiumId);
    }

    return stadiumIds;

}

export const getAllByCapacity = async () => {
    let response = await fetch(`${baseUrl}/stadiums?sortBy=capacity%20desc`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiums = await response.json();

    let result = Object.values(stadiums);

    return result;
};


export const getCountryStadiums = async function (country) {

    let response = await fetch(`${baseUrl}/stadiums?where=country%3D%22${country}%22`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiums = await response.json();

    return stadiums;

}

export const getCountryList = async function () {

    let response = await fetch(`${baseUrl}/stadiums?distinct=country`);

    if (response.ok === false) {
        throw new Error(response.statusText);
    }

    let stadiums = await response.json();

    let countryList = [];

    for (const key in stadiums) {
        countryList.push(stadiums[key].country);
    }

    return countryList;

}