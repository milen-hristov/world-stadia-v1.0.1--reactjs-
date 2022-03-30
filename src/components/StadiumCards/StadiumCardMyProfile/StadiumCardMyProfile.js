import React from 'react';
import { Link } from 'react-router-dom';

import './StadiumCardMyProfile.css';

const StadiumCardMyProfile = ({
    stadiums
}) => {

    return (
        <article className="stadium" >
            <h3 className="stadium-name">{stadiums.name}</h3>
            <Link to={`/stadiums/details/${stadiums._id}`}>  <img className="stadium-image" src={stadiums.imageUrl} alt={stadiums.name} /></Link>
        </article>
    );
}

export default StadiumCardMyProfile;
