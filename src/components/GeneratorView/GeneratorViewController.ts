import BasicController from '@/util/BasicController';
import { MongoId } from '@/types/MongoDocument';
import GeneratorFormController from '@/components/GeneratorView/GeneratorForm/GeneratorFormController';
import { postApiGenerators } from '@/requests/api/generators';
import { IGenerator } from '@/types/Generator';

export interface IState {
  inputController: GeneratorFormController;
  data: IGenerator | null;
  isLoading: boolean;
}

export function newIState(): IState {
  return {
    inputController: new GeneratorFormController(),
    data: null,
    isLoading: false,
  };
}

export default class GeneratorViewController extends BasicController<IState> {
  defaultState = newIState();
  chatId: MongoId | undefined;

  onSubmit = async () => {
    this.setState({ isLoading: true });

    const response = await postApiGenerators(this.state.inputController.form);

    if (!response) {
      this.setState({ data: null, isLoading: false });
      return;
    }

    this.setState({ data: response, isLoading: false });
  };
}
