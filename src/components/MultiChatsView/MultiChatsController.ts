import BasicController from '@/util/BasicController';
import { MongoId } from '@/types/MongoDocument';
import ChatController from '@/components/Chat/ChatController';
import ChatInputController from '@/components/ChatInput/ChatInputController';

export interface IState {
  _id?: MongoId;
  name: string;
  controllers: ChatController[];
  inputController: ChatInputController;
  maximizeIndex: number | null;
}

export function newIState(): IState {
  return {
    name: 'New Multi Chat',
    controllers: [new ChatController()],
    inputController: new ChatInputController(),
    maximizeIndex: null,
  };
}

export default class MultiChatsController extends BasicController<IState> {
  defaultState = newIState();
  chatId: MongoId | undefined;

  constructor(chatId?: MongoId) {
    super();

    if (chatId) {
      this.chatId = chatId;
      // this.loadId(chatId);
    }
  }

  onClickNew = () => {
    const controllers = [...this.state.controllers, new ChatController()];
    this.setState({ controllers });
  };

  onClickRemove = (index: number) => {
    const controllers = [...this.state.controllers];
    controllers.splice(index, 1);

    this.setState({ controllers, maximizeIndex: null });
  };

  onSendInput = () => {
    const input = this.state.inputController.getForm();
    this.state.inputController.reset();
    for (const controller of this.state.controllers) {
      controller.sendInput(input);
    }
  };

  onClickMaximize = (index: number) => {
    console.log('onClickMaximize');
    if (index === this.state.maximizeIndex) {
      this.state.controllers[index].onCache();
      this.setState({ maximizeIndex: null });
      return;
    }

    for (const controller of this.state.controllers) {
      controller.onCache();
    }

    this.setState({ maximizeIndex: index });
  };

  onReset = () => {
    console.log('onReset');
    this.setState(newIState());
  }
}
