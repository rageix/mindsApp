import { EventEmitter } from 'eventemitter3';
import { MongoId } from '@/types/MongoDocument';

export enum emitterMessage {
  newChat= 'newChat',
  showChatsModal= 'showChatsModal',
  loadChatId= 'loadChatId',
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
    console.log('emit newChat');
    this.emitter.emit(emitterMessage.newChat);
  };

  emitLoadChatId = (_id: MongoId) => {
    console.log('emit loadChatId');

    this.emitter.emit(emitterMessage.loadChatId, _id);
  };

  emitShowChatsModal = () => {
    console.log('emit emitShowChatsModal');

    this.emitter.emit(emitterMessage.showChatsModal);
  };

}

const emitter = new Emitter();
export default emitter;
