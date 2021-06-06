import RabbitMQUseCase from '@/useCases/rabbitMQ.usecase'
import {Notification as INotification} from '@interfaces/notifications.interface'
import {ProviderFactory} from '@/factories/provider.factory'
import Provider  from "@/interfaces/provider.interface";

export default class  NotificationListenerConsumer  {

    public static initializeListener(): void {
        const  rabbitMQ = new RabbitMQUseCase();
        rabbitMQ.queue.activateConsumer((message:any):void => {
            console.log(message)
            console.log("=========================================")
            let notificationData : INotification = message.getContent();
            let provider: Provider = ProviderFactory.createProvider(notificationData.provider);
            provider.send(notificationData);
        }, {noAck: true});
    }
    
}