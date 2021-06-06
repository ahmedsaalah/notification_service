import request from 'supertest';
import App from '@/app';
import SendNotificationRoute from '@routes/sendNotification.route';
import FetchNotificationsRoute from '@routes/fetchNotifications.route';
import { Notification } from '@/interfaces/notifications.interface';
import {ProviderFactory} from '@/factories/provider.factory';
import SMSProvider from "@/providers/sms.provider";


afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Send Notification', () => {
  describe('[POST] /notification', () => {
    it('send Push Notification Request successfully', () => {
      const notificationData: Notification = {
          type: "P",
          provider: "P",
          title: "test title",
          body: "test body",
          consumers: ["5cc80789836abe1"]
      };
      const SendNotification = new SendNotificationRoute();
      const app = new App([SendNotification]);
      return request(app.getServer()).post('/notification').send(notificationData).expect({ platform: 'Notification Service', liteResponse: { success: true } });
    });
    it('send SMS Notification Request successfully', () => {
      const notificationData: Notification = {
          type: "P",
          provider: "S",
          title: "test title",
          body: "test body",
          consumers: ["5cc80789836abe1testsalah"]
      };
      const SendNotification = new SendNotificationRoute();
      const app = new App([SendNotification]);
      return request(app.getServer()).post('/notification').send(notificationData).expect({ platform: 'Notification Service', liteResponse: { success: true } });
    });

    
    it('send Notification Request missing params', () => {
      const notificationData: any = {
          provider: "P",
          title: "test title",
          body: "test body",
          consumers: ["5cc80789836abe1testsalah"]
      };
      const SendNotification = new SendNotificationRoute();
      const app = new App([SendNotification]);
      return request(app.getServer()).post('/notification').send(notificationData).expect({ error: { message: 'Missing argument type', code: 1000, subcode: 1 } });
    });

      it('send Notification Request with to cosumers for personalized notification', () => {
        const notificationData: Notification = {
            type: "P",
            provider: "P",
            title: "test title",
            body: "test body",
            consumers: ["5cc80789836abe1","5cc80789wwds836abe1"]
        };
        const SendNotification = new SendNotificationRoute();
        const app = new App([SendNotification]);
        return request(app.getServer()).post('/notification').send(notificationData).expect( {
          error: {
            name: 'ArgumentError',
            message: 'Invalid argument consumers. single consumer is expected',
            code: 1000,
            subcode: 2
          }
        });
      });
  });


  
describe('Testing GET Notifications', () => {
  describe('[GET] /notification', () => {
    it('get Notifications Request successfully', () => {

      const fetchNotificationsRoute = new FetchNotificationsRoute();
      const app = new App([fetchNotificationsRoute]);
      return request(app.getServer()).get('/notification').expect(200);
    });

  });
});
  // describe('[POST] /login', () => {
  //   it('response should have the Set-Cookie header with the Authorization token', async () => {
  //     const userData: CreateUserDto = {
  //       email: 'test@email.com',
  //       password: 'q1w2e3r4',
  //     };

  //     const authRoute = new AuthRoute();
  //     const app = new App([authRoute]);

  //     return request(app.getServer())
  //       .post('/login')
  //       .send(userData)
  //       .expect('Set-Cookie', /^Authorization=.+/);
  //   });
  // });

  // error: StatusCode : 404, Message : Authentication token missing
  // describe('[POST] /logout', () => {
  //   it('logout Set-Cookie Authorization=; Max-age=0', () => {
  //     const authRoute = new AuthRoute();
  //     const app = new App([authRoute]);

  //     return request(app.getServer())
  //       .post('/logout')
  //       .expect('Set-Cookie', /^Authorization=\;/);
  //   });
  // });
});
