import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext.js';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import * as authService from '../../services/authService.js';
import errorsCheck from '../../helpers/errorsCheck.js';
import '../Register/Register.css';

const Register = () => {

    const { login } = useAuthContext();
    const { addNotification } = useNotificationContext();

    let history = useHistory();
    const [errors, setErrors] = useState({
        name: false,
        password: false,
        credentials: false,
    });

    let [serverResponse, setServerResponse] = useState('');

    const registerSubmitHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let repeatPassword = formData.get('repeatPassword').trim();

        if (password != repeatPassword) {
            return setErrors(state => ({ ...state, credentials: 'Passwords do not match' }));
        } else {
            setErrors(state => ({ ...state, credentials: false }));
        }

        if (errorsCheck(errors, false)) {
            return;
        }

        authService.register(email, password)
            .then(authData => {
                let userData = { _id: authData._id, email: authData.email, accessToken: authData.accessToken };
                login(userData);
                addNotification('You registered successfully. Welcome!', types.success);
            })
            .then(() => {
                history.push('/');
                // history.push('/welcome');
            })
            .catch(err => {
                console.log(err);
                setServerResponse(err.message);
                addNotification(`An error occurred - ${err.message}`, types.error);
            })
    }

    const validateEmail = (e) => {
        let currentName = e.target.value;

        if (!currentName.match(/^\w+@{1}\w+\.{1}[a-z]{2,3}$/i)) {
            setErrors(state => ({ ...state, email: 'Please add valid email address' }));
        } else {
            setErrors(state => ({ ...state, email: false }));
        }
    };

    const validatePassword = (e) => {
        let currentName = e.target.value;

        if (!currentName.match(/^[a-zA-Z0-9]{6,}$/)) {
            setErrors(state => ({ ...state, password: 'Minimum length is 6 characters. Only English letters and numbers are allowed' }));
        } else {
            setErrors(state => ({ ...state, password: false }));
        }
    };

    return (
        <section className="auth">
            <article className="auth-heading">
                <h3>Signup</h3>
            </article>
            <form className="auth-form" onSubmit={registerSubmitHandler} method="POST">
                <article className="form-group">
                    <input type="email" name="email" className="auth-input" placeholder="email" required onBlur={validateEmail} />
                    {errors.email
                        ? <p className="error">{errors.email}</p>
                        : null
                    }
                </article>
                <article className="form-group">
                    <input type="password" name="password" className="auth-input" placeholder="password" required onBlur={validatePassword} />
                </article>
                <article className="form-group">
                    <input type="password" name="repeatPassword" className="auth-input" placeholder="repeat password" required onBlur={validatePassword} />
                    {errors.password
                        ? <p className="error">{errors.password}</p>
                        : null
                    }
                    {errors.credentials
                        ? <p className="error">{errors.credentials}</p>
                        : null
                    }
                </article>
                {serverResponse !== ''
                    ? <article className="error">Cannot register due to {serverResponse}. Please make sure your password and email address are correct</article>
                    : null
                }
                <article className="form-group">
                    <button className="btn-submit" type="submit">Register Now</button>
                </article>
                <article className="switch-form">
                    <p>Already have an account? <Link to="/login"><span>Go to Login</span></Link></p>
                </article>

            </form>
        </section>
    );
}

export default Register;
