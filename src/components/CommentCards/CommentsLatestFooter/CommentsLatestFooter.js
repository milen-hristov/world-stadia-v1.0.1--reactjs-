import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as stadiumService from '../../../services/stadiumService.js';
import '../CommentsLatestFooter/CommentsLatestFooter.css';

const CommentsLatestFooter = ({
    latestComments,
}) => {

    const [stadium, setStadium] = useState({});
    useEffect(() => {
        stadiumService.getOne(latestComments.stadiumId)
            .then(stadiumResult => {
                setStadium(stadiumResult);
            })
            .catch(err => {
                console.log(err);
            })
    }, [latestComments.stadiumId]);

    return (
        <section className="footer-comment-card">
            <span className="footer-comment-card-time"><time >DATE: {new Date(latestComments._createdOn).toString().slice(0, 21)}</time></span>
            {stadium.name !== undefined
                ? <h3><Link to={`/stadiums/details/${stadium._id}`}> STADIUM: {stadium?.name} </Link></h3>
                : <h3>Deleted Stadium</h3>
            }
            <h4> COMMENT: {latestComments?.message.slice(0, 100)}... </h4>
            {stadium.name !== undefined
                ? <h3><Link to={`/stadiums/details/${stadium._id}`}> Read More & Comment </Link></h3>
                : null
            }
        </section>
    );
}

export default CommentsLatestFooter;
