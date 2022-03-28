import { Link } from 'react-router-dom';
// import { useEffect } from 'react';

import { useAuthContext } from '../../contexts/AuthContext.js';
import { useNotificationContext } from '../../contexts/NotificationContext.js';

import Notification from '../common/Notification/Notification.js';
import '../Header/Header.css'

const Header = () => {

    const { user } = useAuthContext();
    const { notification } = useNotificationContext();

    // useEffect(() => {
    //     window.addEventListener('scroll', isSticky);
    //     return () => {
    //         window.removeEventListener('scroll', isSticky);
    //     };
    // }, []);

    // const isSticky = (e) => {
    //     const header = document.querySelector('.header-section');
    //     const scrollTop = window.scrollY;
    //     scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    // };

    let navigationGuest = (
        <>
            <li> <Link to="/login">Login</Link></li>
            <li> <Link to="/register">Register</Link></li>
        </>
    );

    let navigationUser = (
        <>
            <li> <Link to="/my-profile">{user.email}</Link></li>
            <li> <Link to="/logout">Logout</Link></li>
        </>
    );

    return (
            <header className="header-section">
                <nav className="header-navigation">
                    <ul className="header-row">
                        <li>
                            <a target="_blank" rel="noreferrer" href="https://github.com/milen-hristov/world-stadia-v1.0.1--reactjs-">
                                <i className="fab fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/milenhristovbg/">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </li>
                        {user.email
                            ? navigationUser
                            : navigationGuest
                        }
                    </ul>
                    <ul className="header-row">
                        <li >
                            <Link to="/home/all"> Home</Link>
                        </li>
                        {user.email
                            ? (
                                <>
                                    <li>
                                        <Link to="/stadiums/create"> Create</Link>
                                    </li>
                                    <li>
                                        <Link to="/users">Users</Link>
                                    </li>
                                </>
                            )
                            : null
                        }
                        {user.email
                            ? (
                                <>
                                    <li>
                                        <Link to="/my-profile">My Profile</Link>
                                    </li>
                                    <li className="my-stadiums-header">
                                        <Link to="/my-stadiums">My Stadiums</Link>
                                    </li>
                                </>)

                            : <li><Link to="/login">I'm Guest</Link></li>
                        }
                    </ul>
                </nav>

                <section className="notification">
                    <article >
                        {notification.show
                            ? <Notification />
                            : <p className="notification-world-stadia">World Stadia</p>
                        }
                    </article>
                </section>
            </header>
    );
}

export default Header;
