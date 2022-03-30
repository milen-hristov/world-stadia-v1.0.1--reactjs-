import React from 'react';
import { NavLink } from 'react-router-dom';

const FilterNavigation = () => {

    return (
        <section className="filter">
            <ul className="filter-list">
                <li><NavLink to="/home/all" >All</NavLink ></li>
                <li><NavLink to="/home/liked" > With Likes</NavLink ></li>
                <li><NavLink to="/home/commented" > With Comments</NavLink ></li>
                <li><NavLink to="/home/capacity" >By Capacity</NavLink ></li>
                <li><NavLink to="/home/alphabetical" >Alphabetical Order</NavLink ></li>
                <li><NavLink to="/home/by-country" >By Country</NavLink ></li>
            </ul>
        </section>
    );
}

export default FilterNavigation;
