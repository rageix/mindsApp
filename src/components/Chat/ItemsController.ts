import BasicController from '@/util/BasicController';
import { IModelResponse } from '@/types/HistoryItem';
import { MongoId } from '@/types/MongoDocument';
import { postApiResponsesPaginated } from '@/requests/api/responses/paginated';
import { IHasId } from '@/types/HasId';

export interface IState {
  items: IHasId<IModelResponse>[];
  page: number;
  isNewItemLoading: boolean;
  loadingItemText: string;
}

export function newIState(): IState {
  return {
    items: [],
    page: 0,
    isNewItemLoading: false,
    loadingItemText: '',
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

  loadChatId = async (chatId: MongoId) => {
    this.chatId = chatId;
    this.getPage(0, true);
  };

  getPage = async (pageIndex: number, clear = false) => {
    const response = await postApiResponsesPaginated({
      chatId: this.chatId,
      pageIndex,
      pageSize: 5,
    });

    if (response) {
      if (clear) {
        this.setState({
          items: response.data.reverse(),
          page: 0,
          isNewItemLoading: false,
        });
      } else if (response.data.length > 0) {
        this.setState({
          items: this.mergeItems(response.data),
          page: pageIndex,
          isNewItemLoading: false,
        });
      }
    }
  };

  /**
   * Adds new items to items we already have but removes any duplicates.
   * @param newItems
   */
  mergeItems = (
    newItems: IHasId<IModelResponse>[],
  ): IHasId<IModelResponse>[] => {
    const toAdd = newItems.filter(
      (v) => this.state.items.findIndex((i) => i._id === v._id) === -1,
    );
    return [...toAdd, ...this.state.items];
  };

  addItems = (items: IHasId<IModelResponse>[]) => {
    this.setState({ items: this.mergeItems(items) });
  };

  onItemIsLoading = (loadingItemText: string) => {
    this.setState({ isNewItemLoading: true, loadingItemText });
  };

  onAddLoadingItem = (item: IHasId<IModelResponse>) => {
    this.setState({
      items: [...this.state.items, item],
      isNewItemLoading: false,
      loadingItemText: '',
    });
  };

  onReset = () => {
    this.setState(newIState());
  };

  onChangeItems = (items: IHasId<IModelResponse>[]) => {
    this.setState({ items });
  };

  onClickLoadMore = () => {
    this.getPage(this.state.page + 1);
  };
}
