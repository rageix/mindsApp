import BasicController from '@/util/BasicController';
import IdeaController from '@/components/IdeaBoard/IdeaItem/IdeaController';
import uniqueId from '@/util/UniqueId';
import { DragEndEvent } from '@dnd-kit/core';
import _ from 'lodash';
import { MongoId } from '@/types/MongoDocument';
import { postApiIdeaBoardsFindOne } from '@/requests/api/ideaBoards/findOne';
import { toast } from 'react-toastify';
import { IIdeaBoard } from '@/types/IdeaBoard';
import { postApiIdeaBoards } from '@/requests/api/ideaBoards';

export interface IState {
  _id?: MongoId;
  name: string;
  controllers: IdeaController[];
}

export function newIState(): IState {
  return {
    name: 'New Idea Board',
    controllers: [new IdeaController()],
  };
}

export default class IdeaBoardController extends BasicController<IState> {
  defaultState = newIState();

  onMoveUpItem = (id: string) => {
    const index = this.state.controllers.findIndex((v) => v.id === id);

    if (index <= 0) {
      return;
    }

    const controllers = [...this.state.controllers];
    const removed = controllers.splice(index, 1);

    controllers.splice(index - 1, 0, removed[0]);
    this.setState({ controllers });
  };

  onMoveDownSection = (id: string) => {
    const index = this.state.controllers.findIndex((v) => v.id === id);

    if (index >= this.state.controllers.length - 1) {
      return;
    }

    const controllers = [...this.state.controllers];
    const removed = controllers.splice(index, 1);

    controllers.splice(index + 1, 0, removed[0]);
    this.setState({ controllers });
  };

  onAdd = (text: string) => {
    const newId = uniqueId(this.state.controllers.map((v) => v.id));
    const newController = new IdeaController();
    newController.id = newId;
    newController.setForm({ text });

    const controllers = [...this.state.controllers, newController];
    this.setState({ controllers });
  };

  onDragEnd = (event: DragEndEvent) => {
    const newIndex = event.over?.data?.current?.sortable?.index;

    if (!_.isNumber(newIndex)) {
      return;
    }

    const currentIndex = this.state.controllers.findIndex(
      (v) => v.id === event.active.id,
    );

    if (currentIndex === -1) {
      return;
    }

    const controllers = [...this.state.controllers];
    const removed = controllers.splice(currentIndex, 1);

    controllers.splice(newIndex, 0, removed[0]);

    this.setState({ controllers });
  };

  onRemove = (id: string) => {
    if(this.state.controllers.length === 1) {
      return;
    }

    const index = this.state.controllers.findIndex((v) => v.id === id);

    if (index === -1) {
      return;
    }

    const controllers = [...this.state.controllers];
    controllers.splice(index, 1);

    this.setState({ controllers });
  };

  onAddNew = () => {
    this.onAdd('');
  };

  loadId = async (_id: MongoId) => {
    const ideaBoard = await postApiIdeaBoardsFindOne({ _id });

    if (!ideaBoard) {
      toast.error('Failed to load Idea Board!');
      return;
    }

    const controllers: IdeaController[] = [];

    for (const item of ideaBoard.items) {
      const newId = uniqueId(controllers.map((v) => v.id));
      const newController = new IdeaController();
      newController.id = newId;
      newController.setForm({ text: item.text });
      controllers.push(newController);
    }

    this.setState({ _id: ideaBoard._id, controllers, name: ideaBoard.name });
  };

  onChangeName = (name: string) => {
    this.setState({ name });
  };

  getValue = (): IIdeaBoard => {
    const state = this.getState();
    return {
      _id: state._id,
      name: state.name,
      items: state.controllers.map((v) => v.getValue()),
    };
  };

  onSave = async (notice = true) => {
    const value = this.getValue();
    const response = await postApiIdeaBoards(value);

    if (response && !this.state._id) {
      this.setState({ _id: response._id });
    }

    if (notice) {
      toast.success('Idea board saved.');
    }
  };

  onNew = async () => {
    await this.onSave(false);
    this.setState(newIState());
  };
}
