import { Request, Response, NextFunction } from 'express';


// In case of a web service a controller is also a presenter
export default abstract class Controller<T = any> implements Presenter<T> {
  protected req: Request;
  protected res: Response;
  private isOutputWritten = false;

  public middleware(): (req: Request, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
      this.isOutputWritten = false;
      this.req = req;
      this.res = res;
      this.execute(this.req).catch(error => next(error));
    };
  }

  protected abstract execute(httpRequest: Request): Promise<void>;



  show(lite: T, original?: Record<string, any>): void {
    this.send(200, { platform: "Notification Service", liteResponse: lite, originalResponse: original });
  }

  showMissingArgumentError(argName: string | string[], helper?: Record<string, any>): void {
    if (Array.isArray(argName))
      this.send(400, {
        error: {
          name: 'ArgumentError',
          message: `Please provide one of ${argName.map(v => this.mapUseCaseParamToExpressParam(v)).join(',')}`,
          code: 1000,
          subcode: 1,
          helper,
        },
      });
    else this.send(400, { error: { message: `Missing argument ${this.mapUseCaseParamToExpressParam(argName)}`, code: 1000, subcode: 1 } });
  }
  
  showInvalidRequestError(): void {
    this.send(400, {
      error: { message: `Invalid request`, code: 100, subcode: 33 },
    });
  }
  showInvalidArgumentError(argName: string, expected: string, helper?: Record<string, any>): void {
    this.send(400, {
      error: {
        name: 'ArgumentError',
        message: `Invalid argument ${this.mapUseCaseParamToExpressParam(argName)}. ${expected} is expected`,
        code: 1000,
        subcode: 2,
        helper,
      },
    });
  }


  showException(exception: Exception): void{
    this.send(exception.http_code, { error: { name: exception.name, message: exception.message, code :exception.code,subcode :exception.subcode  } });
  }
  showNotSupportedError(thing: string, helper?: Record<string, any>): void {
    this.send(400, { error: { name: 'UnsupportedError', message: `${thing} is not supported`, code: 1100, subcode: 2, helper } });
  }

  showNotFoundError(resource?: string, helper?: Record<string, any>): void {
    if (resource) this.send(404, { error: { message: `${resource} not found`, code: 1500, subcode: 1, helper } });
    this.send(404, { error: { name: 'NotFoundError', message: `Resource not found`, code: 1500, subcode: 1, helper } });
  }
  
  showInvalidPayloadSignatureError(): void {
    this.send(401, { error: { message: `Invalid payloadSignature`, code: 1600, subcode: 2 } });
  }

  // Override this if you need to show different arg names in error messages
  protected mapUseCaseParamToExpressParam(param: string) {
    return param;
  }

  protected send(status: number, body: unknown) {
    if (!this.isOutputWritten) {
      this.res.status(status).send(body);
      this.isOutputWritten = true;
    }
  }
}
export  interface Exception{
  name: string;
  message:string;
  code:number;
  subcode:number;
  http_code:number;
}


export  interface Presenter<UseCaseOutput> {
  show(lite: UseCaseOutput, original?: Record<string, any>): void;
  showMissingArgumentError(argName: string | string[], helper?: Record<string, any>): void;
  showInvalidArgumentError(argName: string, expected: string, helper?: Record<string, any>): void;
  showNotSupportedError(thing: string, helper?: Record<string, any>): void;
  showException(exception: Exception): void;
  showInvalidRequestError(): void;
  showNotFoundError(resource?: string, helper?: Record<string, any>): void;
}