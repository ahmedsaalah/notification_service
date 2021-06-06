import { Request } from 'express';
import {SendNotificationInput,SendNotificationOutput, SendNotificationUseCase } from '@/useCases/sendNotification.usecase'
import baseController from '@controllers/baseController'



class sendNotificationController extends baseController<SendNotificationOutput>  {
  public sendNotificationUseCase = new SendNotificationUseCase();

  constructor() {
    super()
  }
  async execute(httpRequest: Request) {
    const requestModel: SendNotificationInput = {
      type:httpRequest.body.type,
      provider: httpRequest.body.provider,
      title: httpRequest.body.title,
      body: httpRequest.body.body,
      consumers: httpRequest.body.consumers,  
    };
    await  this.sendNotificationUseCase.execute(requestModel,this);
  }
  


}
export default sendNotificationController;
