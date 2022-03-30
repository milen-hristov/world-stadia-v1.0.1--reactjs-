import React from 'react';
import { Link } from 'react-router-dom';
import '../StadiumCardLatestFooter/StadiumCardLatestFooter.css'

const StadiumCardLatestFooter = ({
    stadiums
}) => {

    return (
        <section className="footer-stadium-card">
            <article className="footer-stadium-card-image-container">
                <Link to={`/stadiums/details/${stadiums._id}`}>
                    <img src={stadiums.imageUrl} alt={stadiums.name} />
                </Link>
            </article>
            <article className="footer-stadium-card-info-container">
                <h4><Link to={`/stadiums/details/${stadiums._id}`}>{stadiums.name}</Link></h4>
                <span>Capacity: {stadiums.capacity}</span>
            </article>
        </section>
    );
}

export default StadiumCardLatestFooter;