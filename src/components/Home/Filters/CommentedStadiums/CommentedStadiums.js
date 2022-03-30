import React, { useEffect, useState } from 'react';

import StadiumCardHome from '../../../StadiumCards/StadiumCardHome/StadiumCardHome.js';
import FilterNavigation from '../FilterNavigation/FilterNavigation.js';
import * as stadiumService from '../../../../services/stadiumService.js';
import '../../Home.css';

const CommentedStadiums = () => {

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

    const [commentedStadiums, setCommentedStadiums] = useState([]);

    useEffect(() => {
        stadiumService.getCommentedStadiums()
            .then(result => {
                setCommentedStadiums(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    let stadiums = stadiumsAll.filter(x => commentedStadiums.includes(x._id));

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
                        : <h3 className="list-items-results">No stadiums with comments</h3>
                    }
                </section>
            </section>
        </section>
    );
}

export default CommentedStadiums;
