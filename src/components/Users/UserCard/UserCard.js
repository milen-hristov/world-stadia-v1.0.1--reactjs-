import { Link } from 'react-router-dom';

import '../UserCard/UserCard.css';

const UserCard = ({ user }) => {

    return (
        <section className="user-card">
            <article className="image-container">
                <Link to={`/users/${user._ownerId}`}>
                    <img src={user.avatar} alt="avatar" />
                </Link>
            </article>

            <section className="user-container">
                <article className="user-item">
                    {user.username == "Please add your nickname"
                        ? null
                        : <span className="user-username">{user.username}</span>
                    }
                </article>
                <article className="user-item">
                    <h3 className="user-email"><Link to={`/users/${user._ownerId}`}>{user.email}</Link></h3>
                </article>
                <article className="user-item">
                    {user?.aboutMe
                        ? <p>{user.aboutMe.slice(0, 100)}..</p>
                        : null
                    }
                </article>
            </section>
        </section>
    );
}

export default UserCard;