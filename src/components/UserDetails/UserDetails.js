import React, { useEffect, useState } from 'react';

import StadiumCardMyProfile from '../StadiumCards/StadiumCardMyProfile/StadiumCardMyProfile.js'
import CommentsMyProfileCard from '../CommentCards/CommentsMyProfileCard/CommentsMyProfileCard.js'
import * as authService from '../../services/authService.js';
import * as stadiumService from '../../services/stadiumService.js';
import '../UserDetails/UserDetails.css';

const UserDetails = ({
    match
}) => {

    let user = match.params.userId;

    const [stadiums, setStadiums] = useState([]);
    useEffect(() => {
        stadiumService.getMyStadiums(user)
            .then(result => {
                setStadiums(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [user]);

    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        authService.getUserInfo(user)
            .then(userInfo => {
                setUserInfo(userInfo);
            })
            .catch(err => {
                console.log(err);
            })
    }, [user]);

    const [myStadiumComments, setStadiumComments] = useState([]);
    useEffect(() => {
        authService.getUserStadiumComments(user)
            .then(stadiumCommentsResult => {
                setStadiumComments(stadiumCommentsResult);
            })
            .catch(err => {
                console.log(err);
            })
    }, [user]);

    return (
        <>
            <section className="user-profile-wrapper">

                <section className="user-profile-details-wrapper">
                    <section className="user-profile-image-container">
                        <img src={userInfo?.avatar} alt="avatar" />
                    </section>
                    <section className="user-profile-details-container">
                        <article className="user-profile-details-heading">
                            {userInfo?.username !== "Please add your nickname"
                                ? <span> {userInfo?.username}</span>
                                : null
                            }
                            <h3 className="user-profile-details-heading-email">{userInfo?.email}</h3>
                        </article>
                        <article className="user-profile-details-heading">
                            <h2 className="user-profile-details-heading-about">About Me</h2>
                            {userInfo?.aboutMe == ""
                                ? <h3>n/a</h3>
                                : <p>User Info:  {userInfo?.aboutMe}</p>
                            }
                        </article>
                    </section>
                </section>

                <section className="my-profile-created-stadiums">
                    <section className="list-items-section">
                        {stadiums
                            ? <h2>Created Stadiums ({stadiums?.length})</h2>
                            : <h2>Created Stadiums (0)</h2>
                        }
                        <section className="list-items">
                            {stadiums?.length > 0
                                ? stadiums.map(x => <StadiumCardMyProfile key={x._id} stadiums={x} />)
                                : <h3 className="list-items-results">No stadiums added yet</h3>
                            }
                        </section>
                    </section>
                </section>

                <section className="my-profile-comments">
                    <section className="my-profile-list-items-section">
                        <article className="my-profile-stadium-comments-all-heading">
                            {myStadiumComments !== undefined
                                ? <h2>Latest Comments ({myStadiumComments?.length})</h2>
                                : <h2 >Latest Comments (0)</h2>
                            }
                        </article>
                        <article>
                            {myStadiumComments?.length > 0
                                ? myStadiumComments.map(x => <CommentsMyProfileCard key={x._id} myStadiumComments={x} />)
                                : <h3 className="list-items-results">No comments yet</h3>
                            }
                        </article>
                    </section>
                </section>
            </section>
        </>
    );
}

export default UserDetails;
