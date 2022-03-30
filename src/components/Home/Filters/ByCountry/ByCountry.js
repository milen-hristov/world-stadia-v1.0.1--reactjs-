import React, { useEffect, useState } from 'react';

import FilterNavigation from '../FilterNavigation/FilterNavigation.js';
import ByCountryNavigation from '../ByCountry/ByCountryNavigation/ByCountryNavigation.js';
import * as stadiumService from '../../../../services/stadiumService.js';
import '../../Home.css';

const ByCountry = () => {

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

    return (
        <section className="container">
            <section className="list-items-section">
                <FilterNavigation />
                <ByCountryNavigation value={countryList} />
                {/* <article> */}
                    {/* <h4 className="list-items-results">Results ({stadiums.length})</h4> */}
                {/* </article> */}
                <section className="list-items">
                    {countryList.length > 0
                        ? < h3 className="list-items-results">Please select country</h3>
                        : null
                    }
                </section>
            </section>
        </section>
    );
}

export default ByCountry;
