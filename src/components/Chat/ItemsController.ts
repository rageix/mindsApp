import BasicController from '@/util/BasicController';
import {
  IModelResponse,
} from '@/types/HistoryItem';
import { MongoId } from '@/types/MongoDocument';
import { postApiResponsesPaginated } from '@/requests/api/responses/paginated';
import { IHasId } from '@/types/HasId';

export interface IState {
  items: IHasId<IModelResponse>[];
  page: number;
  loading: boolean;
}

export function newIState(): IState {
  return {
    items: [],
    page: 0,
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
      this.getPage(0);
    }
  }

  getPage = async (pageIndex: number) => {
    this.setState({ loading: true });

    const items = await postApiResponsesPaginated({
      chatId: this.chatId,
      pageIndex,
    });

    if (items) {
      const mergedItems = this.mergeItems(items.data.reverse());
      console.log('mergedItems', mergedItems);

      this.setState({ items: mergedItems, page: items.pageIndex, loading: false });
    }
  };

  /**
   * Adds new items to items we already have but removes any duplicates.
   * @param newItems
   */
  mergeItems = (newItems: IHasId<IModelResponse>[]): IHasId<IModelResponse>[] => {
    const toAdd = newItems.filter((v) => this.state.items.findIndex(i => i._id === v._id) === -1);
    console.log('toAdd', toAdd);
    return [...this.state.items, ...toAdd];
  }

  addItems = (items:  IHasId<IModelResponse>[]) => {
    this.setState({items: this.mergeItems(items)});
  }
}
