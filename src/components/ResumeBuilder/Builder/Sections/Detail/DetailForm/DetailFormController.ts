import { ChangeEvent } from 'react';
import { IRBDetail, newIRBDetail } from '@/types/Resume';
import SectionItemController from '@/components/ResumeBuilder/Builder/Sections/SectionItem/SectionItemController';
import { MongoId } from '@/types/MongoDocument';

export interface IForm extends IRBDetail {}

export function defaultForm(): IForm {
  return newIRBDetail();
}

export default class DetailFormController extends SectionItemController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeIsExpanded = () => {
    this.onChangeForm({ isExpanded: !this.form.isExpanded });
  };

  onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ title: e.target.value });
  };

  onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ photo: e.target.value });
  };

  onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ firstName: e.target.value });
  };

  onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ lastName: e.target.value });
  };

  onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ email: e.target.value });
  };

  onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ phone: e.target.value });
  };

  onChangeCountry = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ country: e.target.value });
  };

  onChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ city: e.target.value });
  };

  onChangeState = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ state: e.target.value });
  };

  onChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ address: e.target.value });
  };

  onChangeAddress2 = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ address2: e.target.value });
  };

  onChangePostalCode = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ postalCode: e.target.value });
  };

  onChangeLinkedIn = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ linkedIn: e.target.value });
  };

  onChangeOther = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ other: e.target.value });
  };

  onImageUpload = (ids?: MongoId[]) => {
    if (ids && ids.length > 0) {
      this.onChangeForm({ photo: String(ids[0] || '') });
    }
  };

  onClearPhoto = () => {
    this.onChangeForm({ photo: '' });
  };
}
