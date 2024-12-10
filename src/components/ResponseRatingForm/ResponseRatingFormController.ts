import FormController from '@/util/FormController';
import { z } from 'zod';
import { zStringRequiredValidator } from '@/util/Validators';
import { ChangeEvent } from 'react';
import { IResponseRatingRequest } from '@/requests/api/responseRatings/schema';
import {
  postApiResponseRatingsFindMine
} from "@/requests/api/responseRatings/findMine";
import { isEmpty } from "lodash";
import { IHasId } from "@/types/HasId";
import { IResponseRating } from "@/types/ResponseRating";

export interface IForm extends IResponseRatingRequest {}

export function defaultForm(): IForm {
  return {
    _id: '',
    formResponseId: '',
    teamId: '',
    thumbsUp: false,
    comment: '',
  };
}

const formValidator = z.object({
  comment: zStringRequiredValidator,
});

export default class ResponseRatingFormController extends FormController<IForm> {
  defaultForm = defaultForm();
  formValidator = () => formValidator;

  constructor(formResponseId: string, teamId: string) {
    super();
    this.load(formResponseId, teamId);
  }

  onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.onChangeForm({ comment: e.target.value });
  };

  onChangeThumbs = (value: boolean) => {
    this.onChangeForm({ thumbsUp: value });
  };

  load = async (formResponseId: string, teamId: string) => {
    const response = await postApiResponseRatingsFindMine({ _id: formResponseId, teamId });

    if(!isEmpty(response)) {
      this.setForm(response as IHasId<IResponseRating>);
    }
  }
}
