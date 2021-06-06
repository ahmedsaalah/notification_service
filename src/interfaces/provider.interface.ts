import {Notification as INotification } from './notifications.interface'
export default interface Provider {
    send(notificationData:INotification): void;
}