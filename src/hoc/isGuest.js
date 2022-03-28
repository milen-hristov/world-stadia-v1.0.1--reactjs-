import { Redirect } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext.js';

export const isGuest = (Component) => {

    const WrapperComponent = (props) => {
        const { isAuthenticated } = useAuthContext();

        return isAuthenticated
            ? <Redirect to="/" />
            : <Component {...props} />
    }

    return WrapperComponent;
};
