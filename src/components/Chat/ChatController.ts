import BasicController from '@/util/BasicController';
import { MongoId } from '@/types/MongoDocument';
import { EModel } from '@/types/Model';
import { IChat } from '@/types/Chat';
import { toast } from 'react-toastify';
import { postApiChats } from '@/requests/api/chats';
import { ChangeEvent } from 'react';
import { postApiChatsFindOne } from '@/requests/api/chats/findOne';
import ItemsController from '@/components/Chat/ItemsController';
import ChatInputController from '@/components/Chat/ChatInput/ChatInputController';
import { postApiRequests } from '@/requests/api/responses';

export interface IState {
  _id?: MongoId;
  name: string;
  model: EModel;
  itemsController: ItemsController;
  inputController: ChatInputController;
}

export function newIState(): IState {
  return {
    name: 'New Chat',
    model: EModel.ChatGPT4o,
    itemsController: new ItemsController(),
    inputController: new ChatInputController(),
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

  sendInput = async () => {
    let chatId = this.state._id;

    if(!chatId) {
      chatId = await this.onSave(false);

      if(!chatId) {
        toast.error('Failed to create chat!');
        return;
      }
    }

    const inputForm = this.state.inputController.getForm();

    const response = await postApiRequests({
      chatId: chatId,
      model: this.state.model,
      text: inputForm.text,
      fileId: inputForm.fileId,
    });

    if (!response) {
      return;
    }

    this.state.itemsController.addItems([response]);
  };

  loadId = async (_id: MongoId) => {
    const chat = await postApiChatsFindOne({ _id });

    if (!chat) {
      toast.error('Failed to load Chat!');
      return;
    }
    const itemsController = new ItemsController(chat._id);
    const inputController = new ChatInputController();

    this.setState({
      _id: chat._id,
      name: chat.name,
      itemsController,
      inputController,
    });
  };

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  getValue = (): IChat => {
    const state = this.getState();
    return {
      _id: state._id,
      model: this.state.model,
      name: state.name,
    };
  };

  onSave = async (notice = true): Promise<MongoId | undefined> => {
    const value = this.getValue();
    const response = await postApiChats(value);

    if (response && !this.state._id) {
      this.setState({ _id: response._id });
    }

    if (notice) {
      toast.success('Chat saved.');
    }

    return response?._id
  };

  onNew = async () => {
    // await this.onSave(false);
    this.setState(newIState());
  };

  onChangeModel = (model: EModel) => {
    this.setState({ model });
  };
}
