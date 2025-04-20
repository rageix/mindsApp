import { EventEmitter } from 'eventemitter3';

export enum emitterMessage {
  newChat = 'newChat',
  globalChatInput = 'globalChatInput',
  showChatsModal = 'showChatsModal',
  loadChatId = 'loadChatId',
  toggleIdeaBoard = 'toggleIdeaBoard',
  subscriptionRequiredModalOpen = 'subscriptionRequiredModalOpen',
  subscriptionRequiredModalClose = 'subscriptionRequiredModalClose',
}

export class Emitter {
  emitter = new EventEmitter();

  on = <T>(message: emitterMessage, fn: (arg: T) => void) => {
    this.emitter.on(message, fn);
  };

  off = <T>(message: emitterMessage, fn: (arg: T) => void) => {
    this.emitter.off(message, fn);
  };

  emitNewChat = () => {
    this.emitter.emit(emitterMessage.newChat);
  };

  emitGlobalChatInput = () => {
    this.emitter.emit(emitterMessage.globalChatInput);
  };

  emitShowChatsModal = () => {
    this.emitter.emit(emitterMessage.showChatsModal);
  };

  emitToggleIdeaBoard = () => {
    this.emitter.emit(emitterMessage.toggleIdeaBoard);
  };

  emitSubscriptionRequiredModalOpen = () => {
    this.emitter.emit(emitterMessage.subscriptionRequiredModalOpen);
  };

  emitSubscriptionRequiredModalClose = () => {
    this.emitter.emit(emitterMessage.subscriptionRequiredModalClose);
  };
}

const emitter = new Emitter();
export default emitter;
