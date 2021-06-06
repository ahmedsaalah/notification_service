import { Notification } from "@/interfaces/notifications.interface";
import provider from "@/interfaces/provider.interface";
import PQueue from 'p-queue';


export default class NotificationProvider implements provider {
    public queue;
    public ratePerMin: number;
    constructor() {
        this.ratePerMin = isNaN(Number(process.env.PUSH_NOTIFICATION_RATE)) ? 10 : Number(process.env.PUSH_NOTIFICATION_RATE);
        this.queue = new PQueue({ concurrency: 1, intervalCap: this.ratePerMin, interval: 60 * 1000 });
    }
    public send(notificationData: Notification): void {
        const fs = require('fs');
        (async () => {
            this.queue.add(() => {
                console.log(`write to notif ${notificationData}`)

                fs.appendFile('pushNotification.txt', JSON.stringify(notificationData).toString(), function (err) {
                    if (err) throw err;
                });
            });
        })();

    }

}