import { useEffect, useState } from 'react';

import { useUpdateContext } from '../../contexts/UpdateContextFooter.js';

import StadiumCardLatestFooter from '../StadiumCards/StadiumCardLatestFooter/StadiumCardLatestFooter.js';
import CommentsLatestFooter from '../CommentCards/CommentsLatestFooter/CommentsLatestFooter.js';
import * as stadiumService from '../../services/stadiumService.js';
import "../Footer/Footer.css"

const Footer = () => {

    const { updateStadium, updateComment } = useUpdateContext();

    const [stadiums, setStadiums] = useState([]);
    useEffect(() => {
        stadiumService.getLatestStadiums()
            .then(result => {
                setStadiums(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [updateStadium]);

    const [latestComments, setLatestComments] = useState([]);
    useEffect(() => {
        stadiumService.getLatestComments()
            .then(result => {
                // console.log(result)
                setLatestComments(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [updateComment]);


    return (
        <>
            <footer className="footer-wrapper">

                <section className="footer-latest-comments">
                    <article>
                        <h3 className="footer-heading">Latest Comments</h3>
                    </article>
                    {latestComments.length > 0
                        ? latestComments.slice(0, 3).map(x => <CommentsLatestFooter key={x._id} latestComments={x} />)
                        : (<article>
                            <article className="">
                                <p>No comments added yet</p>
                            </article>
                        </article>)
                    }
                </section>

                <section className="footer-latest-stadiums">
                    <article>
                        <h3 className="footer-heading">Latest Stadiums</h3>
                    </article>
                    {stadiums.length > 0
                        ? stadiums.slice(0, 3).map(x => <StadiumCardLatestFooter key={x._id} stadiums={x} />)
                        : (<>
                            {/* <article>
                                <img src="images/no-latest.jpg" alt="img" />
                            </article> */}
                            <article>
                                <h4> No stadiums added yet </h4>
                            </article>
                        </>)
                    }
                </section>

                <section className="footer-about">
                    <article >
                        <h3 className="footer-heading">World Stadia</h3>
                    </article>
                    <ul className="footer-list-items">
                        <li>
                            <a href="mailto:milenskibg88@gmail.com"><i className="far fa-envelope"></i> milenskibg88@gmail.com</a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/milenhristovbg/"> <i className="fab fa-linkedin"></i>Milen Hristov</a>
                        </li>
                    </ul>
                </section>

            </footer>
            <p className="footer-outro">  World Stadia - React Application 2021 / Milen Hristov</p>
        </>
    );
}

export default Footer;
