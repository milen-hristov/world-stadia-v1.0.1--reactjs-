import React, { useEffect, useState } from 'react';

import StadiumCardHome from '../../../StadiumCards/StadiumCardHome/StadiumCardHome.js';
import FilterNavigation from '../FilterNavigation/FilterNavigation.js';
import sortStadiumsByAlphabeticalOrder from '../../../../helpers/sortStadiumsByAlphabeticalOrder.js';
import * as stadiumService from '../../../../services/stadiumService.js';
import '../../Home.css';

const AlphabeticalOrder = () => {

    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        stadiumService.getAll()
            .then(result => {
                let sortedResult = sortStadiumsByAlphabeticalOrder(result);
                setStadiums(sortedResult);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

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
                        : <h3 className="list-items-results">No stadiums added yet</h3>
                    }
                </section>
            </section>
        </section>
    );
}

export default AlphabeticalOrder;