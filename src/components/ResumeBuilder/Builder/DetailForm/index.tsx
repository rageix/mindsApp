'use client';
import FormLabel from '@/components/FormLabel';
import Form from '@/components/Form';
import DetailFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/DetailForm/DetailFormController';
import Input from '@/components/Input';
import { useState } from 'react';
import { cn } from '@/util/Cn';
import Button from '@/components/Buttton';

interface IProps {
  controller: DetailFormController;
}

export default function DetailForm({ controller }: IProps) {
  controller.useController();
  const [showMore, setShowMore] = useState(false);

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1">
          <FormLabel<IForm> field="title">Title</FormLabel>
          <Input<IForm>
            field="title"
            errors={state.errors}
            value={form.title}
            onChange={controller.onChangeTitle}
          />
        </div>
        <div className="flex-1">
          <FormLabel<IForm> field="title">Email</FormLabel>
          <Input<IForm>
            field="title"
            errors={state.errors}
            value={form.title}
            onChange={controller.onChangeTitle}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1">
          <FormLabel<IForm> field="firstName">First Name</FormLabel>
          <Input<IForm>
            field="firstName"
            errors={state.errors}
            value={form.firstName}
            onChange={controller.onChangeFirstName}
          />
        </div>
        <div className="flex-1">
          <FormLabel<IForm> field="title">Last Name</FormLabel>
          <Input<IForm>
            field="lastName"
            errors={state.errors}
            value={form.lastName}
            onChange={controller.onChangeLastName}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1">
          <FormLabel<IForm> field="email">Email</FormLabel>
          <Input<IForm>
            field="email"
            errors={state.errors}
            value={form.email}
            onChange={controller.onChangeEmail}
          />
        </div>
        <div className="flex-1">
          <FormLabel<IForm> field="phone">Phone</FormLabel>
          <Input<IForm>
            field="phone"
            errors={state.errors}
            value={form.phone}
            onChange={controller.onChangePhone}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1">
          <FormLabel<IForm> field="country">Country</FormLabel>
          <Input<IForm>
            field="country"
            errors={state.errors}
            value={form.country}
            onChange={controller.onChangeCountry}
          />
        </div>
        <div className="flex-1">
          <FormLabel<IForm> field="city">City</FormLabel>
          <Input<IForm>
            field="city"
            errors={state.errors}
            value={form.city}
            onChange={controller.onChangeCity}
          />
        </div>
      </div>
      <div className={cn(showMore ? null : 'hidden')}>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1">
            <FormLabel<IForm> field="address">Address</FormLabel>
            <Input<IForm>
              field="address"
              errors={state.errors}
              value={form.address}
              onChange={controller.onChangeAddress}
            />
          </div>
          <div className="flex-1">
            <FormLabel<IForm> field="postalCode">Postal Code</FormLabel>
            <Input<IForm>
              field="postalCode"
              errors={state.errors}
              value={form.postalCode}
              onChange={controller.onChangePostalCode}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1">
            <FormLabel<IForm> field="license">License</FormLabel>
            <Input<IForm>
              field="license"
              errors={state.errors}
              value={form.license}
              onChange={controller.onChangeLicense}
            />
          </div>
          <div className="flex-1">
            <FormLabel<IForm> field="nationality">Nationality</FormLabel>
            <Input<IForm>
              field="nationality"
              errors={state.errors}
              value={form.nationality}
              onChange={controller.onChangeNationality}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1">
            <FormLabel<IForm> field="placeOfBirth">Place Of Birth</FormLabel>
            <Input<IForm>
              field="placeOfBirth"
              errors={state.errors}
              value={form.placeOfBirth}
              onChange={controller.onChangePlaceOfBirth}
            />
          </div>
          <div className="flex-1">
            <FormLabel<IForm> field="dateOfBirth">Date Of Birth</FormLabel>
            <Input<IForm>
              field="dateOfBirth"
              errors={state.errors}
              value={form.dateOfBirth}
              onChange={controller.onChangeDateOfBirth}
            />
          </div>
        </div>
      </div>
      <Button
        variant="link"
        isInline
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'Show less fields...' : 'Show more fields...'}
      </Button>
    </Form>
  );
}
