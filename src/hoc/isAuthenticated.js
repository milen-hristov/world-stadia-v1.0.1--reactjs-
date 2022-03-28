import { Redirect } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext.js';

export const isAuth = (Component) => {

    const WrapperComponent = (props) => {
        const { isAuthenticated, user } = useAuthContext();

        return isAuthenticated
            ? <Component {...props} user={user} />
            : <Redirect to="/login" />
    }

    return WrapperComponent;
};
