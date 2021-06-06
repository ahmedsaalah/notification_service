import { Request } from 'express';
import {FetchNotificationsInput,FetchNotificationsOutput, FetchNotificationsUseCase } from '@/useCases/fetchNotifications.usecase'
import baseController from '@controllers/baseController'



class FetchNotificationsController extends baseController<FetchNotificationsOutput>  {
  public fetchNotificationsUseCase = new FetchNotificationsUseCase();

  constructor() {
    super()
  }
  async execute(httpRequest: Request) {
    const requestModel : FetchNotificationsInput= {};
    await  this.fetchNotificationsUseCase.execute(requestModel,this);
  }
  


}
export default FetchNotificationsController;
