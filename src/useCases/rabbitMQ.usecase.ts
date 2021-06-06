
import { Notification } from "@/interfaces/notifications.interface";
import * as Amqp from "amqp-ts";

export default class RabbitMQUseCase {

  public connection;
  public exchange;
  public queue;
  constructor() {
    this.connection = new Amqp.Connection(process.env.RABBITMQ_HOST);
    this.exchange = this.connection.declareExchange("ExchangeName");
    this.queue = this.connection.declareQueue(process.env.RABBITMQ_QUEUE);
    this.queue.bind(this.exchange);
  }

  public publish(data: Notification): void{
    this.exchange.send(new Amqp.Message(data));
  }

}
