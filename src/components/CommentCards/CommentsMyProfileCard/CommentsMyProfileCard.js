import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as stadiumService from '../../../services/stadiumService.js';
import '../CommentsMyProfileCard/CommentsMyProfileCard.css';

const CommentCardMyProfile = ({
    myStadiumComments,
}) => {

    const [stadium, setStadium] = useState({});
    useEffect(() => {
        stadiumService.getOne(myStadiumComments.stadiumId)
            .then(stadiumResult => {
                setStadium(stadiumResult);
            })
            .catch(err => {
                console.log(err);
            })
    }, [myStadiumComments.stadiumId]);

    return (
            <article className="my-profile-comment-card">
                <article className="my-profile-comment-container">
                    <span className="my-profile-comment-date"><time >{new Date(myStadiumComments._createdOn).toString()}</time></span>
                    <article className="my-profile-comment-user">
                        {stadium.name !== undefined
                            ? <Link to={`/stadiums/details/${stadium?._id}`}><h3>{stadium?.name}</h3></Link>
                            : <h3>Deleted stadium</h3>
                        }
                    </article>
                    <article className="my-profile-comment-description">
                        <p>{myStadiumComments?.message}</p>
                    </article>
                </article>
            </article>
    );
}

export default CommentCardMyProfile;
