import FormController from '@/util/FormController';
import { ChangeEvent } from 'react';
import { IRBDetail, newIRBDetail } from '@/types/ResumeBuilder';

export interface IForm extends IRBDetail {}

export function defaultForm(): IForm {
  return newIRBDetail();
}

export default class DetailFormController extends FormController<IForm> {
  resetForm = defaultForm();
  defaultForm = defaultForm();

  onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ title: e.target.value });
  };

  onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ image: e.target.value });
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

  onChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ address: e.target.value });
  };

  onChangePostalCode = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ postalCode: e.target.value });
  };

  onChangeLicense = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ license: e.target.value });
  };

  onChangeNationality = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ nationality: e.target.value });
  };

  onChangePlaceOfBirth = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ placeOfBirth: e.target.value });
  };

  onChangeDateOfBirth = (e: ChangeEvent<HTMLInputElement>) => {
    this.onChangeForm({ dateOfBirth: e.target.value });
  };

}
