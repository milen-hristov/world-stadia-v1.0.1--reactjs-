import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext.js';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import * as authService from '../../services/authService.js';

const Logout = () => {
    const history = useHistory();
    const { user, logout } = useAuthContext();
    const { addNotification } = useNotificationContext();
    
    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                logout();
                addNotification('You logged out successfully. See you soon!', types.success);
                // history.push('/bye');
                history.push('/');
            })
            .catch(err => {
                console.log(err);
                addNotification(`An error occurred - ${err.message}`, types.err);
                history.push('/NotFound');
            })
    }, [user.accessToken, history, logout, addNotification])

    return null;
};

export default Logout;