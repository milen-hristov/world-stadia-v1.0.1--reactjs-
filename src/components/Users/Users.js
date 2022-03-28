import { useEffect, useState } from 'react';

import UserCard from './UserCard/UserCard.js';
import * as authService from '../../services/authService.js';
import '../Users/Users.css';

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        authService.getAllUsers()
            .then(result => {
                setUsers(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const onChangeSearch = (e) => {
        let formData = new FormData(e.currentTarget);

        let search = formData.get('search').trim();

        let filterUsers = [];

        for (const userEntry in users) {
            if (users[userEntry].email.includes(search)) {
                filterUsers.push(users[userEntry]);
            }
        }

        if (search == '') {
            authService.getAllUsers()
                .then(result => {
                    setUsers(result);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            setUsers(filterUsers);
        }
    }

    return (
        <section className="stadium-users">
            <section className="stadium-users-search">
                <article className="stadium-users-all-heading">
                    <h2>Users</h2>
                </article>
                <article className="stadium-users-search-description">
                    <p>Thank you for being part of our community.</p>
                </article>
                <form className="stadium-users-search-form" onChange={onChangeSearch} >
                    <article >
                        <input type="text" name="search" id="search" className="user-search-input" placeholder="Search by email..." />
                    </article>
                </form>
            </section>
            <section className="stadium-users-all">
                <article className="stadium-users-all-heading">
                    <h2>World Stadia Users</h2>
                </article>
                <section>
                    <ul className="stadium-users-container">
                        {users?.length > 0
                            ? users.map(x => <UserCard key={x._id} user={x} />)
                            : <h3 className="stadium-user-result">No users to show</h3>
                        }
                    </ul>
                </section>
            </section>

        </section >
    );
}

export default Users;