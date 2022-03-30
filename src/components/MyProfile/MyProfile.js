import React, { useEffect, useState } from 'react';

import { useAuthContext } from '../../contexts/AuthContext.js';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import axios from 'axios';

import CommentsMyProfileCard from '../CommentCards/CommentsMyProfileCard/CommentsMyProfileCard.js';
import StadiumCardMyProfile from '../StadiumCards/StadiumCardMyProfile/StadiumCardMyProfile.js';
import { BASEURLIMAGEOPTIONS } from '../../config/baseUrlImageServer.js';
import * as authService from '../../services/authService.js';
import * as stadiumService from '../../services/stadiumService.js';
import '../MyProfile/MyProfile.css';

const MyProfile = () => {
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();
    let [usernameError, setUsernameError] = useState({ type: 'no-error' });
    let [aboutError, setAboutError] = useState({ type: 'no-error' });


    const [stadiums, setStadiums] = useState([]);
    useEffect(() => {
        stadiumService.getMyStadiums(user._id)
            .then(result => {
                setStadiums(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [user._id]);

    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        authService.getUserInfo(user._id)
            .then(userInfo => {
                setUserInfo(userInfo);
            })
            .catch(err => {
                console.log(err);
            })
    }, [user._id]);

    const onClickUpdateUsername = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let username = formData.get('username');

        if (usernameError.type !== 'no-error') {
            return;
        }

        authService.updateUsername(userInfo, username, user.accessToken)
            .then(result => {
                setUserInfo(result);
                addNotification('Username updated successfully', types.success);
                e.target.reset();
            })
            .catch(err => {
                console.log(err);
                addNotification(`An error occurred - ${err.message}`, types.error);
            })
    }

    const validateName = (e) => {
        let userNameInput = e.currentTarget.value;
        if (!userNameInput.match(/^[A-Za-z0-9]{3,15}$/)) {
            setUsernameError({ type: 'Username should be between 3 and 15 characters (English letters and Numbers allowed, No spaces)' });
        } else {
            setUsernameError({ type: 'no-error' })
        }
    }

    const onClickUpdateAboutMe = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let aboutMe = formData.get('aboutMe');

        if (aboutError.type !== 'no-error') {
            return;
        }

        authService.updateAboutMe(userInfo, aboutMe, user.accessToken)
            .then(result => {
                console.log(result)
                setUserInfo(result);
                addNotification('About Me updated successfully', types.success);
                e.target.reset();
            })
            .catch(err => {
                console.log(err);
                addNotification(`An error occurred - ${err.message}`, types.error);
            })
    }

    const validateAboutMe = (e) => {
        let aboutMeInput = e.currentTarget.value;
        if (aboutMeInput.length == 0) {
            setAboutError({ type: 'Please add info about yourself' });
        } else {
            setAboutError({ type: 'no-error' })
        }
    }

    const [myStadiumComments, setStadiumComments] = useState([]);
    useEffect(() => {
        authService.getUserStadiumComments(user._id)
            .then(stadiumCommentsResult => {
                setStadiumComments(stadiumCommentsResult);
            })
            .catch(err => {
                console.log(err);
            })
    }, [user._id]);


    let [profileImg, setProfileImg] = useState('');

    const onFileChange = (e) => {
        setProfileImg(e.target.files[0]);
    }

    const onClickUpdateAvatar = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", profileImg);
        formData.append("upload_preset", BASEURLIMAGEOPTIONS.cloudinaryPreset);

        axios.post(`${BASEURLIMAGEOPTIONS.cloudinary}/image/upload`, formData)
            .then(res => {
                let avatar = res.data.url;

                authService.updateAvatar(userInfo, avatar, user.accessToken)
                    .then(result => {
                        // console.log(result)
                        setUserInfo(result);
                        addNotification('Avatar updated successfully', types.success);
                    })
                    .catch(err => {
                        console.log(err);
                        addNotification(`An error occurred - ${err.message}`, types.error);
                    })
                console.log(res);
            }).catch(err => {
                console.log(err);
                addNotification(`An error occurred - ${err.message}`, types.error);
            })
    }

    return (
        <>
            <section className="my-profile-wrapper">
                <section className="my-profile-details-main">
                    <section className="my-profile-avatar">
                        <img src={userInfo?.avatar} alt="avatar" />
                        <article>
                            <form onSubmit={onClickUpdateAvatar}>
                                <input type="file" onChange={onFileChange} accept="image/png, image/gif, image/jpeg" />
                                <button className="btn-save" type="submit">Update Avatar</button>
                            </form>
                        </article>
                    </section>
                    <section className="my-profile-details-all">
                        <article className="my-profile-details-top">
                            {userInfo?.username !== "Please add your nickname"
                                ? <span>{userInfo?.username}</span>
                                : null
                            }
                            <h3>{user.email}</h3>
                        </article>
                        <article className="my-profile-details-username">
                            <h3>Username: {userInfo?.username}</h3>
                            <form className="my-profile-form" onSubmit={onClickUpdateUsername} method="POST">
                                <article className="my-profile-form-group">
                                    <input type="username" name="username" className="my-profile-form-input" placeholder="username" required onBlur={validateName} />
                                    {usernameError.type !== 'no-error'
                                        ? <p className="error">{usernameError.type}</p>
                                        : null
                                    }
                                </article>
                                <article className="buttons">
                                    <button className="btn-save" type="submit">Update Username</button>
                                </article>
                            </form>
                        </article>
                        <article className="my-profile-details-about">
                            <h3>About Me</h3>
                            <p>User Info:  {userInfo?.aboutMe}</p>
                            <form className="my-profile-form" onSubmit={onClickUpdateAboutMe} method="POST">
                                <article className="my-profile-form-group">
                                    <textarea type="username" name="aboutMe" className="my-profile-form-textarea" placeholder="about me" onBlur={validateAboutMe} rows={5} required />
                                    {aboutError.type !== 'no-error'
                                        ? <p className="error">{aboutError.type}</p>
                                        : null
                                    }
                                </article>
                                <article className="buttons">
                                    <button className="btn-save" type="submit">Update About Me</button>
                                </article>
                            </form>
                        </article>
                    </section>
                </section>
            </section>

            <section className="my-profile-created-stadiums">
                <section className="list-items-section">
                    {stadiums
                        ? <h2 className="list-items-results">Created Stadiums ({stadiums?.length})</h2>
                        : <h2 className="list-items-results">Created Stadiums (0)</h2>
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
                            ? <h2 className="list-items-results"> Latest Comments ({myStadiumComments?.length})</h2>
                            : <h2 className="list-items-results" >Latest Comments (0)</h2>
                        }
                    </article>
                    <article>
                        {myStadiumComments?.length > 0
                            ? myStadiumComments.map(x => <CommentsMyProfileCard key={x._id} myStadiumComments={x} />)
                            : <h2 className="list-items-results">No comments yet</h2>
                        }
                    </article>
                </section>
            </section>
        </>
    );
}

export default MyProfile;
