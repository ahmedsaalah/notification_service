import {Presenter} from '@controllers/baseController';
// Base Interactor
export default abstract class UseCase<InputModel = any, OutputModel = any> {
  abstract execute(params: InputModel, presenter: Presenter<OutputModel>): Promise<void>;
}
