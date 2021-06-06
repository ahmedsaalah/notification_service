import { model, Schema, Document } from 'mongoose';
import { Notification } from '@interfaces/notifications.interface';

let notificationSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  consumers: {
    type: [String],
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }

});
notificationSchema.methods.getById = function getById(id: string) {
  return new Promise((resolve, reject) => {
      this.findOne({ _id: id }, (err: any, notification: any) => {
          if (err) return reject(err);
          return resolve(notification)
      });
  });
}
const notificationModel = model<Notification & Document>('Notification', notificationSchema);

export default notificationModel;



