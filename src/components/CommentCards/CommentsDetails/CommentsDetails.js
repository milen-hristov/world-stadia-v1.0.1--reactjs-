import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as authService from '../../../services/authService.js';
import './CommentsDetails.css';

const CommentCard = ({
    stadiumComments,
}) => {

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        authService.getUserInfo(stadiumComments._ownerId)
            .then(userInfo => {
                // console.log(userInfo)
                setUserInfo(userInfo);
            })
            .catch(err => {
                console.log(err);
            })
    }, [stadiumComments._ownerId]);

    return (
        <article className="comment-card">
            <article className="image-container">
                <Link to={`/users/${userInfo._ownerId}`}>
                    <img src={userInfo?.avatar} alt="avatar" />
                </Link>
            </article>
            <article className="comment-container">
                <span className="comment-date"><time >{new Date(stadiumComments._createdOn).toString()}</time></span>
                <article className="comment-user">
                    <h3> <Link to={`/users/${userInfo._ownerId}`}> {userInfo?.email} </Link>
                        {userInfo?.username !== "Please add your nickname"
                            ? <span> / {userInfo?.username}</span>
                            : null
                        }
                    </h3>
                </article>
                <article className="comment-description">
                    <p>{stadiumComments?.message}</p>
                </article>
            </article>
        </article>
    );
}

export default CommentCard;
