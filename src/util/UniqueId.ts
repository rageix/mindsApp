import { nanoid } from 'nanoid';

export default function uniqueId (ids: string[]): string {
  while (true) {
    const id = nanoid();

    if (ids.findIndex((v) => v === id) === -1) {
      return id;
    }
  }
};