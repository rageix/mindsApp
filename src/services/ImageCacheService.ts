import { MongoId } from '@/types/MongoDocument';

class ImageCacheService {
  genKey(_id: MongoId): string {
    return 'image/' + String(_id);
  }

  set = (_id: MongoId, data: string) => {
    localStorage.setItem(this.genKey(_id), data);
  };

  get = (_id: MongoId): string | null => {
    return localStorage.getItem(this.genKey(_id));
  };

  remove = (_id: MongoId) => {
    localStorage.removeItem(this.genKey(_id));
  };
}

const imageCacheService = new ImageCacheService();
export default imageCacheService;
