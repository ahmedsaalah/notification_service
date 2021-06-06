import { Router } from 'express';
import FetchNotificationsController from '@controllers/fetchNotifications.controller';

import Route from '@interfaces/routes.interface';

class FetchNotificationsRoute implements Route {
  public path = '/notification';
  public router = Router();
  private fetchNotificationsController: FetchNotificationsController;
  constructor() {
    this.fetchNotificationsController = new FetchNotificationsController();
    this.initializeRoutes();
  
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.fetchNotificationsController.middleware());
  }
}

export default FetchNotificationsRoute;
