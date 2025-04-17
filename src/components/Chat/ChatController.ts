import BasicController from '@/util/BasicController';
import { MongoId } from '@/types/MongoDocument';
import { EModel } from '@/types/Model';
import { IChat } from '@/types/Chat';
import { toast } from 'react-toastify';
import { postApiChats } from '@/requests/api/chats';
import { postApiChatsFindOne } from '@/requests/api/chats/findOne';
import ItemsController from '@/components/Chat/ItemsController';
import ChatInputController, {
  IChatInput,
} from '@/components/ChatInput/ChatInputController';
import { postApiRequests } from '@/requests/api/responses';

export interface IState {
  _id?: MongoId;
  name: string;
  model: EModel;
  maximize: boolean;
  itemsController: ItemsController;
  inputController: ChatInputController;
  isLoadingResponse: boolean;
}

export function newIState(): IState {
  return {
    name: '',
    model: EModel.ChatGPT4o,
    maximize: false,
    itemsController: new ItemsController(),
    inputController: new ChatInputController(),
    isLoadingResponse: false,
  };
}

export default class ChatController extends BasicController<IState> {
  defaultState = newIState();
  chatId: MongoId | undefined;

  constructor(chatId?: MongoId) {
    super();

    if (chatId) {
      this.chatId = chatId;
      this.loadId(chatId);
    }
  }

  sendInput = async (input: IChatInput) => {
    let chatId = this.state._id;

    if (!chatId) {
      const value = this.getValue();

      if (value.name.trim() === '') {
        value.name = input.text.substring(0, 24);
      }

      const response = await postApiChats(value);

      if (response && !this.state._id) {
        // this.setState({ _id: response._id });
        chatId = response._id;
      }

      if (!chatId) {
        toast.error('Failed to create chat!');
        return;
      }
    }

    this.state.itemsController.onItemIsLoading(input.text);

    const response = await postApiRequests({
      chatId: chatId,
      model: this.state.model,
      text: input.text,
      fileId: input.fileId,
    });

    if (!response) {
      return;
    }

    this.state.itemsController.onAddLoadingItem(response);
  };

  onClickSendInput = async () => {
    const input = this.state.inputController.getForm();
    this.state.inputController.onResetForm();

    this.sendInput(input);
  };

  loadId = async (_id: MongoId) => {
    const chat = await postApiChatsFindOne({ _id });

    if (!chat) {
      toast.error('Failed to load Chat!');
      return;
    }

    this.state.itemsController.loadChatId(_id);

    this.setState({
      _id: chat._id,
      name: chat.name,
    });
  };

  onChangeName = async (name: string) => {
    this.setState({ name });

    if (this.state._id) {
      await postApiChats({ _id: this.state._id, name });
    }
  };

  getValue = (): IChat => {
    const state = this.getState();
    return {
      _id: state._id,
      model: this.state.model,
      name: state.name,
    };
  };

  onNew = async () => {
    this.state.itemsController.onReset();

    this.setState({ name: '' });
  };

  onChangeModel = (model: EModel) => {
    this.setState({ model });
  };

  onCache = () => {
    this.cache();
    this.state.inputController.cache();
    this.state.itemsController.cache();
  };
}
