import React from 'react';
import { NavLink } from 'react-router-dom';

import '../ByCountryNavigation/ByCountryNavigation.css'

const ByCountryNavigation = (countryList) => {

    let countries = countryList.value;

    return (
        <section className="filter">
            <ul className="filter-list">
                {countries.length > 0
                    ? countries.map(x => <li key={x}><NavLink  to={`/home/by-country/${x}`}>{x}</NavLink ></li>)
                    : <h3 className="list-items-results">No stadiums added yet</h3>
                }
            </ul>
        </section>
    );
}

export default ByCountryNavigation;
