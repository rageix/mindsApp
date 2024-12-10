import { MongoId } from '@/types/MongoDocument';
import { IResponseRating } from "@/types/ResponseRating";

export interface IResponseRatingRequest extends Pick<IResponseRating, '_id' | 'formResponseId' | 'teamId' | 'thumbsUp' | 'comment'> {

}
export interface IDeleteRequest {
  ids: MongoId[];
  teamId: MongoId;
}
