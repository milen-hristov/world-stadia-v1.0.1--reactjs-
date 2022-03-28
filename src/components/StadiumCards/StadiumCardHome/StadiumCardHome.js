import { Link } from 'react-router-dom';

import '../StadiumCardHome/StadiumCardHome.css';

const StadiumCardHome = ({
    stadiums
}) => {

    return (
        <article className="stadium" >
            <h3 className="stadium-name">{stadiums.name}</h3>
            <Link to={`/stadiums/details/${stadiums._id}`}><img className="stadium-image" src={stadiums.imageUrl} alt="img" /></Link>
            {/* <Link className="tg-theme-tag bottom-left" data-rel="prettyPhoto[iframe]" to={`/stadiums/details/${stadiums._id}`}><i className="fa fa-play" />Details</Link> */}
        </article>
    );
}

export default StadiumCardHome;
