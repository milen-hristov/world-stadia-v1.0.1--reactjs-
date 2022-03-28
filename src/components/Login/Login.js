import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext.js';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import * as authService from '../../services/authService.js';
import '../Login/Login.css';

const Login = () => {

    let history = useHistory();
    const { login } = useAuthContext();
    let [serverResponse, setServerResponse] = useState('');
    const { addNotification } = useNotificationContext();

    const onLoginHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        authService.login(email, password)
            .then((authData) => {
                let userData = { _id: authData._id, email: authData.email, accessToken: authData.accessToken };
                login(userData);
                addNotification('You logged in successfully', types.success);
            })
            .then(() => {
                // history.push('/welcome');
                history.push('/');
            })
            .catch(err => {
                setServerResponse(err.message);
                addNotification(`An error occurred - ${err.message}`, types.error);
            });
    }

    return (
        <section className="auth">
            <article className="auth-heading">
                <h3>Login</h3>
            </article>
            <form className="auth-form" onSubmit={onLoginHandler} method="POST">
                <article className="form-group">
                    <input type="text" name="email" id="email" className="auth-input" placeholder="email" required />
                </article>
                <article className="form-group">
                    <input type="password" name="password" id="password" className="auth-input" placeholder="password" required />
                </article>
                <article className="form-group">
                    {serverResponse !== ''
                        ? <p className="error">Cannot login due to {serverResponse}. Please make sure your password and email address are correct</p>
                        : null
                    }
                </article>
                <article className="form-group">
                    <button className="btn-submit" type="submit">Login Now</button>
                </article>
                <article className="switch-form">
                    <p>Don't have an account yet? <Link to="/register"><span>Sign Up Now</span></Link></p>
                </article>
            </form>
        </section>
    );
}

export default Login;
