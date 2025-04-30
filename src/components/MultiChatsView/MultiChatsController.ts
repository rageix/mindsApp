import BasicController from '@/util/BasicController';
import { MongoId } from '@/types/MongoDocument';
import ChatController from '@/components/Chat/ChatController';
import ChatInputController from '@/components/ChatInput/ChatInputController';
import emitter from '@/util/Emitter';

export interface IState {
  _id?: MongoId;
  name: string;
  controllers: ChatController[];
  inputController: ChatInputController;
  maximizeIndex: number | null;
  isGlobalSearchVisible: boolean;
}

export function newIState(): IState {
  return {
    name: 'New Multi Chat',
    controllers: [new ChatController()],
    inputController: new ChatInputController(),
    maximizeIndex: null,
    isGlobalSearchVisible: true,
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
    if (this.state.controllers.length === 1) {
      return;
    }
    const controllers = [...this.state.controllers];
    controllers.splice(index, 1);

    this.setState({ controllers, maximizeIndex: null });
  };

  onSendInput = () => {
    emitter.emitGlobalChatInput();
    const input = this.state.inputController.getForm();
    this.state.inputController.reset();
    for (const controller of this.state.controllers) {
      controller.sendInput(input);
    }
  };

  onClickMaximize = (index: number) => {
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
    this.setState(newIState());
  };

  onChangeIsGlobalSearchVisible = (isGlobalSearchVisible: boolean) => {
    this.setState({ isGlobalSearchVisible });
  };

  onClickNext = () => {
    console.log('onClickNext');
    if (this.state.maximizeIndex === null) {
      return;
    }

    let maximizeIndex = this.state.maximizeIndex + 1;

    if (maximizeIndex > this.state.controllers.length - 1) {
      maximizeIndex = 0;
    }

    this.setState({ maximizeIndex });
  };

  onClickPrev = () => {
    console.log('onClickPrev');

    if (this.state.maximizeIndex === null) {
      return;
    }

    let maximizeIndex = this.state.maximizeIndex - 1;

    if (maximizeIndex < 0) {
      maximizeIndex = this.state.controllers.length - 1;
    }

    this.setState({ maximizeIndex });
  };
}
