import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext.js';

import StadiumCardHome from '../StadiumCards/StadiumCardHome/StadiumCardHome.js'
import * as stadiumService from '../../services/stadiumService.js';
import '../MyStadiums/MyStadiums.css';

const MyStadiums = () => {

    const { user } = useAuthContext();

    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        stadiumService.getMyStadiums(user._id)
            .then(result => {
                setStadiums(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [user._id]);

    return (
        <section className="container">
            <ul className="filter-list">
                {stadiums
                    ? <li><Link className="active">All ({stadiums?.length})</Link></li>
                    : <li><Link className="active">All (0)</Link></li>
                }
            </ul>
            <section className="list-items">
                {stadiums?.length > 0
                    ? stadiums.map(x => <StadiumCardHome key={x._id} stadiums={x} />)
                    : <h3 className="list-items-results">No stadiums added yet. Add your first one now - <Link to="/stadiums/create">  <span>here</span></Link></h3>
                }
            </section>
        </section>
    );
}

export default MyStadiums;