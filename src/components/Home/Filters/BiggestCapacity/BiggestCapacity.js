import { useEffect, useState } from 'react';

import StadiumCardHomeCapacity from '../../../StadiumCards/StadiumCardHomeCapacity/StadiumCardHomeCapacity.js';
import FilterNavigation from '../FilterNavigation/FilterNavigation.js';
import * as stadiumService from '../../../../services/stadiumService.js';
import '../../Home.css';

const BiggestCapacity = () => {

    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        stadiumService.getAllByCapacity()
            .then(result => {
                setStadiums(result);
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
                        ? stadiums.map(x => <StadiumCardHomeCapacity key={x._id} stadiums={x} />)
                        : <h3 className="list-items-results">No stadiums added yet</h3>
                    }
                </section>
            </section>
        </section>
    );
}

export default BiggestCapacity;