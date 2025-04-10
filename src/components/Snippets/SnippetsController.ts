import BasicController from '@/util/BasicController';
import SnippetInputController from '@/components/Snippets/SnippetItem/SnippetInputController';
import uniqueId from '@/util/UniqueId';
import { DragEndEvent } from '@dnd-kit/core';
import _ from 'lodash';

export interface IState {
  controllers: SnippetInputController[];
}

export function newIState(): IState {
  return {
    controllers: [],
  };
}

export default class SnippetsController extends BasicController<IState> {
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
    const newController = new SnippetInputController();
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
    const index = this.state.controllers.findIndex((v) => v.id === id);

    if (index === -1) {
      return;
    }

    const controllers = [...this.state.controllers];
    controllers.splice(index, 1);

    this.setState({ controllers });
  };
}
