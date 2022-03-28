import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { useUpdateContext } from '../../contexts/UpdateContextFooter.js';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import CommentCard from '../CommentCards/CommentsDetails/CommentsDetails.js';
import * as stadiumService from '../../services/stadiumService.js';
import '../Details/Details.css';

const Details = ({
    match
}) => {
    const { user } = useAuthContext();
    const { addUpdateComment } = useUpdateContext();
    const { addNotification } = useNotificationContext();
    const history = useHistory();

    let stadiumId = match.params.stadiumId;

    const [stadium, setStadium] = useState({});
    useEffect(() => {
        stadiumService.getOne(stadiumId)
            .then(stadiumResult => {
                setStadium(stadiumResult);
            })
            .then(() => {
                stadiumService.getStadiumComments(stadiumId)
                    .then(comments => {
                        // console.log(comments)
                        setStadium((state => ({ ...state, comments })))
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .then(() => {
                stadiumService.getStadiumLikes(stadiumId)
                    .then(likes => {
                        // console.log(likes)
                        if (likes.some(x => x._ownerId === user._id)) {
                            setStadium((state => ({ ...state, likes, isLiked: 'Liked' })))
                        } else {
                            setStadium((state => ({ ...state, likes, isLiked: 'Not liked' })))
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
                history.push('/NotFound');
            })
    }, [stadiumId, history, user._id]);

    const onClickSendComment = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let message = formData.get('message');
        let newComment = { stadiumId: stadiumId, message: message, postId: user.accessToken };

        stadiumService.addComment(newComment, user.accessToken)
            .then(result => {
                addUpdateComment(newComment);
                setStadium((state => ({ ...state, comments: [...state.comments, result] })));
                e.target.reset();
                addNotification('Comment sent successfully', types.success);
            })
            .catch(err => {
                console.log(err);
                addNotification(`An error occurred - ${err.message}`, types.error);
            })
    }

    const onClickSendLike = (e) => {
        e.preventDefault();

        let newLike = { stadiumId: stadiumId };

        stadiumService.addLike(newLike, user.accessToken)
            .then(result => {
                setStadium((state => ({ ...state, likes: [...state.likes, user._id], isLiked: 'Liked' })));
                addNotification('Stadium liked successfully', types.success);
            })
            .catch(err => {
                console.log(err);
                addNotification(`An error occurred - ${err.message}`, types.error);
            })
    }

    let likeElement =
        <>
            {user._id && (user._id === stadium._ownerId
                ? null
                : (
                    <article>
                        <button onClick={onClickSendLike} className="btn-like">Like Stadium</button>
                    </article>
                )
            )}
        </>

    // console.log(stadium)

    return (
        <>
            <main>
                <section className="stadium-details-wrapper">
                    <section className="stadium-column-left">
                        <article className="stadium-image-details">
                            <img src={stadium.imageUrl} alt={stadium.name} />
                        </article>
                        <article className="stadium-address">
                            <iframe title={stadium._id} src={stadium.address}> </iframe>
                        </article>
                    </section>
                    <section className="stadium-column-right">
                        <article className="stadium-header">
                            <h3>{stadium.name}</h3>
                            <span className="stadium-country">{stadium.country}</span>
                            <h5>Likes: {stadium.likes?.length}</h5>
                            {stadium.isLiked === "Liked"
                                ? null
                                : likeElement
                            }
                        </article>
                        <article className="stadium-details">
                            <table className="stadium-details-table">
                                <tbody>
                                    <tr>
                                        <th>Stadium Name</th>
                                        <td>{stadium.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Country</th>
                                        <td>{stadium.country}</td>
                                    </tr>
                                    <tr>
                                        <th>City</th>
                                        <td>{stadium.city}</td>
                                    </tr>
                                    <tr>
                                        <th>Capacity</th>
                                        <td>{stadium.capacity}</td>
                                    </tr>
                                    <tr>
                                        <th>Clubs</th>
                                        <td>{stadium.clubs}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </article>
                        <article className="stadium-buttons">
                            {user._id && (user._id === stadium._ownerId
                                ? (
                                    <article className="buttons">
                                        <p><Link to={`/stadiums/details/${stadium._id}/delete`} className="btn-delete">Delete</Link></p>
                                        <p><Link to={`/stadiums/details/${stadium._id}/edit`} className="btn-edit">Edit</Link></p>
                                    </article>
                                )
                                : null
                            )}
                        </article>
                    </section>
                </section>
                <section className="stadium-description">
                    <article className="info-image-container">
                        <img className="info-image" src="/images/info.png" alt="info icon" />
                    </article>
                    <article className="info-text-container">
                        <h2>Info</h2>
                        <p>{stadium.description}</p>
                    </article>
                </section>
                <section className="stadium-comments">
                    <section className="stadium-comments-all">
                        <article className="stadium-comments-all-heading">
                            <h2>Latest Comments</h2>
                        </article>
                        <ul>
                            {stadium.comments?.length > 0
                                ? stadium.comments.map(x => <CommentCard key={x._id} stadiumComments={x} />)
                                : <h2>No comments yet</h2>
                            }
                        </ul>
                    </section>
                </section>
                <section className="stadium-comments">
                    {user.email
                        ? (
                            <>
                                <article className="stadium-comments-all-heading">
                                    <h2>Leave Your Comment</h2>
                                </article>
                                <form className="comment-form" onSubmit={onClickSendComment} method="POST">
                                    <article className="form-group">
                                        <input type="email" readOnly name="email" className="form-input" placeholder="Email*" value={user.email} />
                                    </article>
                                    <article className="form-group">
                                        <textarea name="message" className="form-textarea" placeholder="Message*" rows={4} required />
                                    </article>
                                    <article>
                                        <button className="btn-comment" type="submit">send</button>
                                    </article>
                                </form>
                            </>
                        )
                        : (

                            <article className="stadium-comments-all-heading">
                                <h2>Please login to comment</h2>
                            </article>

                        )}
                </section>
            </main>
        </>
    );
}

export default Details;
