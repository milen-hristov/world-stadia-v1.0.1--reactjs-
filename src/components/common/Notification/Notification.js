import { useNotificationContext } from '../../../contexts/NotificationContext.js';
import '../Notification//Notification.css';

const Notification = () => {
    const { notification } = useNotificationContext();

    if (!notification.show) {
        return null;
    }

    return (
        <>
            <p className="notification-world-stadia">{notification.type}</p>
            <p className="notification-world-stadia-message">{notification.message}</p>
        </>
    );
};

export default Notification;