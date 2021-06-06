import { Presenter } from '@controllers/baseController';
import notificationModel from "@models/notifications.model"
import RabbitMQUseCase from "./rabbitMQ.usecase"


export class SendNotificationUseCase {

  public rabbitMQ = new RabbitMQUseCase();

  async execute(params?: SendNotificationInput, presenter?: Presenter<SendNotificationOutput>): Promise<void> {
    if (!params.body) return presenter.showMissingArgumentError('body');
    if (!params.title) return presenter.showMissingArgumentError('title');
    if (!params.consumers) return presenter.showMissingArgumentError('consumers');
    if (!params.type) return presenter.showMissingArgumentError('type');
    if (!params.provider) return presenter.showMissingArgumentError('provider');
    if ((!Array.isArray(params.consumers)) || params.consumers.length < 1) {
      return presenter.showInvalidArgumentError('consumers', 'array')
    }
    if (!Object.values(Types).includes(params.type)) {
      return presenter.showInvalidArgumentError('type', Object.values(Types).toString())
    }
    if (!Object.values(Providers).includes(params.provider)) {
      return presenter.showInvalidArgumentError('provider', Object.values(Providers).toString())
    }
    if (params.type === Types.PERSONALIZED_NOTIFICATION && params.consumers.length !== 1) {
      return presenter.showInvalidArgumentError('consumers', 'single consumer')
    }
    await this.run(params, presenter);
  }

  async  run(notificationData: SendNotificationInput, presenter: Presenter<SendNotificationOutput>):Promise<void> {
   try{
    const notificationDoc= new notificationModel(notificationData);
    const document  =await notificationDoc.save();
    await this.rabbitMQ.publish(document);
    presenter.show({ success: true });
   }catch(error){
     throw error;
   }

  }
}

export interface SendNotificationInput {
  type: Types,
  provider: Providers,
  title: string,
  body: string,
  consumers: string[],
}

export interface SendNotificationOutput {
  success: boolean
}
enum Providers {
  SMS = "S",
  PUSH_NOTIFICATIONS = "P",
}
enum Types {
  GROUP_NOTIFICATION = "G",
  PERSONALIZED_NOTIFICATION = "P"
}