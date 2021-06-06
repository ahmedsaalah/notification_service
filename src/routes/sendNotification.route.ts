import { Router } from 'express';
import sendNotificationController from '@/controllers/sendNotification.controller';

import Route from '@interfaces/routes.interface';

class SendNotificationRoute implements Route {
  public path = '/notification';
  public router = Router();
  private sendNotification: sendNotificationController;
  constructor() {
    this.sendNotification = new sendNotificationController();
    this.initializeRoutes();
  
  }


  private initializeRoutes() {
    this.router.post(`${this.path}`, this.sendNotification.middleware());
  }
}

export default SendNotificationRoute;
