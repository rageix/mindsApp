import { EventEmitter } from 'eventemitter3';

export enum emitterMessage {
  resumeUpdated = 'resumeUpdated',
  saveResume= 'saveResume',
}

export class Emitter {
  emitter = new EventEmitter();

  on = <T>(message: emitterMessage, fn: (arg: T) => void) => {
    this.emitter.on(message, fn);
  };

  off = <T>(message: emitterMessage, fn: (arg: T) => void) => {
    this.emitter.off(message, fn);
  };

  emitResumeUpdated = () => {
    this.emitter.emit(emitterMessage.resumeUpdated);
  };

  emitSaveResume = () => {
    this.emitter.emit(emitterMessage.saveResume);
  };
}

const emitter = new Emitter();
export default emitter;
