import { Notification } from "grommet";

interface Props {
    status: any,
    title: string,
    message: string,
    onCloseNotification: any
}
const NotificationComponent = ({ status, title, message, onCloseNotification }: Props) => {
    return (
        <Notification
            toast
            status={status}
            title={title}
            message={message}
            onClose={() => onCloseNotification()}
        />);
};
export default NotificationComponent