import React, { useEffect, useState } from 'react';

import StadiumCardHome from '../../../StadiumCards/StadiumCardHome/StadiumCardHome.js';
import FilterNavigation from '../FilterNavigation/FilterNavigation.js';
import * as stadiumService from '../../../../services/stadiumService.js';
import '../LikedStadiums/LikedStadiums.css';

const LikedStadiums = () => {

    const [stadiumsAll, setStadiumsAll] = useState([]);

    useEffect(() => {
        stadiumService.getAll()
            .then(result => {
                setStadiumsAll(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const [likedStadiums, setLikedStadiums] = useState([]);

    useEffect(() => {
        stadiumService.getLikedStadiums()
            .then(result => {
                setLikedStadiums(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    let stadiums = stadiumsAll.filter(x => likedStadiums.includes(x._id));

    return (
        <section className="container">
            <section className="list-items-section">
                <FilterNavigation />
                <article>
                    <h4 className="list-items-results">Results ({stadiums.length})</h4>
                </article>
                <section className="list-items">
                    {stadiums.length > 0
                        ? stadiums.map(x => <StadiumCardHome key={x._id} stadiums={x} />)
                        : <h3 className="list-items-results">No stadiums with likes</h3>
                    }
                </section>
            </section>
        </section>
    );
}

export default LikedStadiums;
