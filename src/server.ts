process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';

import SendNotificationRoute from '@routes/sendNotification.route';
import FetchNotificationsRoute from '@routes/fetchNotifications.route';


import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new SendNotificationRoute(),new FetchNotificationsRoute()] );

app.listen();
