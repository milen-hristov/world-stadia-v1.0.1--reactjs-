import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import { useUpdateContext } from '../../contexts/UpdateContextFooter.js';

import * as stadiumService from '../../services/stadiumService.js';
import '../Delete/Delete.css';

const Delete = ({
    match
}) => {
    const history = useHistory();
    const { user } = useAuthContext();
    const { addUpdateStadium } = useUpdateContext();
    const { addNotification } = useNotificationContext();

    let stadiumId = match.params.stadiumId;
    let [serverResponse, setServerResponse] = useState('');

    useEffect(() => {
        stadiumService.deleteStadium(stadiumId, user.accessToken)
            .then((result) => {
                addUpdateStadium(result);
            })
            .then(() => {
                addNotification('Stadium deleted successfully', types.success);
                history.push('/home/all');
            })
            .catch(err => {
                console.log(err);
                setServerResponse(err.message);
                addNotification(`An error occurred - ${err.message}`, types.error);
            })
    }, [stadiumId, user.accessToken, addUpdateStadium, history, addNotification])

    return (
        <section>
            <article>
                {serverResponse !== ''
                    ? <h3>{serverResponse}</h3>
                    : null
                }
            </article>
        </section >
    );
};

export default Delete;