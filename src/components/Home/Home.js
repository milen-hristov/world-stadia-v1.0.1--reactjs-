import { useEffect, useState } from 'react';

import { useNotificationContext, types } from '../../contexts/NotificationContext';
import { useAuthContext } from '../../contexts/AuthContext.js';

import StadiumCardHome from '../StadiumCards/StadiumCardHome/StadiumCardHome.js'
import FilterNavigation from './Filters/FilterNavigation/FilterNavigation.js';
import * as stadiumService from '../../services/stadiumService.js';
import * as authService from '../../services/authService.js';
import '../Home/Home.css';

const Home = () => {

    const [stadiums, setStadiums] = useState([]);
    const { addNotification } = useNotificationContext();

    const { user } = useAuthContext();

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        authService.getUserInfo(user._id)
            .then(userInfo => {
                setUserInfo(userInfo);
            })
            .catch(err => {
                console.log(err);
            })
    }, [user._id]);

    useEffect(() => {
        if (user.email !=='' && (userInfo === undefined)) {
            authService.createUserData(user.accessToken, user.email)
                .then(res => {
                    // console.log(res);
                })
        }
    }, [user, userInfo]);

    useEffect(() => {
        stadiumService.getAll()
            .then(result => {
                setStadiums(result);
                // addNotification('Stadiums loaded successfullly', types.success);
            })
            .catch(err => {
                console.log(err);
                addNotification('No response from server', types.error);
            })

        return () => {
            setStadiums([]);
        };
    }, [addNotification]);

    const onChangeSearch = (e) => {
        let formData = new FormData(e.currentTarget);

        let search = formData.get('search').trim();

        let filterStadiums = stadiums.filter((x => x.name.includes(search)));

        if (search == '') {
            stadiumService.getAll()
                .then(result => {
                    setStadiums(result);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            setStadiums(filterStadiums);
        }
    }

    return (
        <section className="container">
            <form className="form" onChange={onChangeSearch}>
                <article className="form-item">
                    <input type="text" name="search" id="search" className="search-input" placeholder="Search by team..." required />
                </article>
            </form>
            <section className="list-items-section">
                <FilterNavigation />
                <article>
                    <h4 className="list-items-results">Results ({stadiums.length})</h4>
                </article>
                <section className="list-items">
                    {stadiums.length > 0
                        ? stadiums.map(x => <StadiumCardHome key={x._id} stadiums={x} />)
                        : <h3 className="list-items-results">No results found</h3>
                    }
                </section>
            </section>
        </section>
    );
}

export default Home;
