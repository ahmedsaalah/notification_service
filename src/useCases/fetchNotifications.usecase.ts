import { Presenter } from '@controllers/baseController';
import notificationModel from "@models/notifications.model"
import {Notification as INotification} from '@interfaces/notifications.interface'



export class FetchNotificationsUseCase {
  public notificationModel = notificationModel;

  async execute(params?: FetchNotificationsInput, presenter?: Presenter<FetchNotificationsOutput>): Promise<void> {
    await this.run(params, presenter);
  }

  async  run(notificationData: FetchNotificationsInput, presenter: Presenter<FetchNotificationsOutput>):Promise<void> {
    let notificationsArr :any
    this.notificationModel.find({}, function(err,res){
      notificationsArr=  res.map((data:INotification)=>{
        return {
        provider:(data.provider === "S")? "SMS Notifications" : "Push Notifications",
        type:(data.type === "P")? "Personalized Notifications":"Group Notifications" ,
        title:data.title,
        body:data.body,
        consumers: data.consumers,
        }
      })
    }).then(()=>{
      presenter.show({ notifications: notificationsArr });
    }
    )

  }
}

export interface FetchNotificationsInput {
}
export interface FetchNotificationsOutput {
  notifications: INotification[]
}
