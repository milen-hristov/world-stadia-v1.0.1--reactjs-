import { useEffect, useState } from 'react';

import StadiumCardHome from '../../../../StadiumCards/StadiumCardHome/StadiumCardHome.js';
import FilterNavigation from '../../FilterNavigation/FilterNavigation.js';
import ByCountryNavigation from '../ByCountryNavigation/ByCountryNavigation.js';
import * as stadiumService from '../../../../../services/stadiumService.js';
import '../../../Home.css';

const ByCountryView = ({ match }) => {

    const [countryList, setCountryList] = useState([]);
    useEffect(() => {
        stadiumService.getCountryList()
            .then(result => {
                let sortAphabetically = result.sort((a, b) => a.localeCompare(b));
                setCountryList(sortAphabetically);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    let country = match.params.country;
    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        stadiumService.getCountryStadiums(country)
            .then(result => {
                // console.log(result)
                setStadiums(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [country]);

    return (
        <section className="container">
            <section className="list-items-section">
                <FilterNavigation />
                <ByCountryNavigation value={countryList} />
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

export default ByCountryView;
