import BasicController from '@/util/BasicController';
import {
  EModelContentType,
  EStatus,
  IModelResponse,
} from '@/types/HistoryItem';
import { MongoId } from '@/types/MongoDocument';
import { postApiResponsesPaginated } from '@/requests/api/responses/paginated';
import { postApiRequests } from '../../requests/api/responses';
import { EModel } from '@/types/Model';

export interface IState {
  items: IModelResponse[];
  page: number;
  loading: boolean;
}

export function newIState(): IState {
  return {
    items: [
      {
        userId: '67f04e9b5ae06bf35831db19',
        chatId: '67f063fd8ed438372ab0c634',
        model: EModel.ChatGPT4o,
        status: EStatus.Completed,
        errorCode: null,
        errorMessage: null,
        incompleteDetails: null,
        instructions: null,
        input: [
          {
            type: EModelContentType.Text,
            value: 'How many lions would it take to fill an Olympic pool?',
            annotations: [],
          },
        ],
        output: [
          {
            type: EModelContentType.Text,
            value:
              "Determining how many lions it would take to fill an Olympic-sized pool involves a bit of estimation and some assumptions. \n\nAn Olympic-sized swimming pool is about 50 meters long, 25 meters wide, and 2 meters deep, totaling 2,500 cubic meters, or 2,500,000 liters.\n\nAn adult male lion has an average volume of roughly 1 cubic meter, though this can vary. \n\nBased on these rough estimates, you would need approximately 2,500 lions to fill the volume of an Olympic-sized pool. Keep in mind, this is a theoretical calculation and doesn't account for factors like the lions' ability to compress or gaps between them.",
            annotations: [],
          },
        ],
        responseId: 'resp_67f063fcfb588192a55b97339c534c5b0a686d016d67a588',
        modelVersion: 'gpt-4o-2024-08-06',
        _id: '67f063ff8ed438372ab0c636',
        __v: 0,
      },
      {
        userId: '67f04e9b5ae06bf35831db19',
        chatId: '67f063fd8ed438372ab0c634',
        model: EModel.ChatGPT4o,
        status: EStatus.Completed,
        errorCode: null,
        errorMessage: null,
        incompleteDetails: null,
        instructions: null,
        input: [
          {
            type: EModelContentType.Text,
            value: 'How many lions would it take to fill an Olympic pool?',
            annotations: [],
          },
        ],
        output: [
          {
            type: EModelContentType.Text,
            value:
              "Determining how many lions it would take to fill an Olympic-sized pool involves a bit of estimation and some assumptions. \n\nAn Olympic-sized swimming pool is about 50 meters long, 25 meters wide, and 2 meters deep, totaling 2,500 cubic meters, or 2,500,000 liters.\n\nAn adult male lion has an average volume of roughly 1 cubic meter, though this can vary. \n\nBased on these rough estimates, you would need approximately 2,500 lions to fill the volume of an Olympic-sized pool. Keep in mind, this is a theoretical calculation and doesn't account for factors like the lions' ability to compress or gaps between them.",
            annotations: [],
          },
        ],
        responseId: 'resp_67f063fcfb588192a55b97339c534c5b0a686d016d67a588',
        modelVersion: 'gpt-4o-2024-08-06',
        _id: '67f063ff8ed438372ab0c637',
        __v: 0,
      },
      {
        userId: '67f04e9b5ae06bf35831db19',
        chatId: '67f063fd8ed438372ab0c634',
        model: EModel.ChatGPT4o,
        status: EStatus.Completed,
        errorCode: null,
        errorMessage: null,
        incompleteDetails: null,
        instructions: null,
        input: [
          {
            type: EModelContentType.Text,
            value: 'How many lions would it take to fill an Olympic pool?',
            annotations: [],
          },
        ],
        output: [
          {
            type: EModelContentType.Text,
            value:
              "Determining how many lions it would take to fill an Olympic-sized pool involves a bit of estimation and some assumptions. \n\nAn Olympic-sized swimming pool is about 50 meters long, 25 meters wide, and 2 meters deep, totaling 2,500 cubic meters, or 2,500,000 liters.\n\nAn adult male lion has an average volume of roughly 1 cubic meter, though this can vary. \n\nBased on these rough estimates, you would need approximately 2,500 lions to fill the volume of an Olympic-sized pool. Keep in mind, this is a theoretical calculation and doesn't account for factors like the lions' ability to compress or gaps between them.",
            annotations: [],
          },
        ],
        responseId: 'resp_67f063fcfb588192a55b97339c534c5b0a686d016d67a588',
        modelVersion: 'gpt-4o-2024-08-06',
        _id: '67f063ff8ed438372ab0c638',
        __v: 0,
      },
    ],
    page: 1,
    loading: false,
  };
}

export default class ItemsController extends BasicController<IState> {
  defaultState = newIState();
  chatId: MongoId | undefined;

  constructor(chatId?: MongoId) {
    super();

    if (chatId) {
      this.chatId = chatId;
      this.getPage(1);
    }
  }

  getPage = async (pageIndex: number) => {
    this.setState({ loading: true });

    const items = await postApiResponsesPaginated({ pageIndex });

    if (items) {
      const newItems = (this.state.items || []).concat(items.data.reverse());

      this.setState({ items: newItems, page: items.pageIndex, loading: false });
    }
  };

  sendInput = async (model: EModel, text: string, fileId?: string) => {
    const response = await postApiRequests({
      chatId: this.chatId,
      model,
      text,
      fileId,
    });

    if (!response) {
      return;
    }

    const items = [...this.state.items, response];
    this.setState({ items });
  };
}
