import { EventEmitter } from 'eventemitter3';

export enum emitterMessage {
  newChat = 'newChat',
  globalChatInput = 'globalChatInput',
  showChatsModal = 'showChatsModal',
  loadChatId = 'loadChatId',
  toggleIdeaBoard = 'toggleIdeaBoard',
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
}

const emitter = new Emitter();
export default emitter;
