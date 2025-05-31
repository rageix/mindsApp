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
import { EModelContentType, IModelResponse } from '@/types/HistoryItem';
import { postApiChatsMessage } from '@/requests/api/chats/message';

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

  constructor(chatId?: MongoId) {
    super();

    if (chatId) {
      this.defaultState._id = chatId;
      this.loadId(chatId);
    }
  }

  sendInput = async (input: IChatInput) => {
    this.state.itemsController.onItemIsLoading(input.text);

    const response = await postApiChatsMessage({
      chatId: this.getState()._id,
      text: input.text,
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


    // @ts-ignore
    this.setState({ _id: undefined, name: '' });
  };

  onChangeModel = (model: EModel) => {
    this.setState({ model });
  };

  onCache = () => {
    this.cache();
    this.state.inputController.cache();
    this.state.itemsController.cache();
  };

  onRepeat = (response: IModelResponse) => {
    const text = response.input
      .filter((v) => v.type === EModelContentType.Text)
      .map((v) => v.value)
      .join(' ');
    const fileId = response.input.find(
      (v) => v.type === EModelContentType.File,
    )?.value;
    const input: IChatInput = {
      text: text,
      fileId: fileId,
    };

    this.sendInput(input);
  };
}
