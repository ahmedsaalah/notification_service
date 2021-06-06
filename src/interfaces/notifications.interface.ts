export interface Notification {
  _id?: string;
  type:string;
  provider: string;
  title: string;
  body: string;
  consumers: string[];  
}
