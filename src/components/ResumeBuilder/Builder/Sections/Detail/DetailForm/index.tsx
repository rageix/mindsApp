'use client';
import FormLabel from '@/components/FormLabel';
import DetailFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Detail/DetailForm/DetailFormController';
import Input from '@/components/Input';
import { useState } from 'react';
import { cn } from '@/util/Cn';
import Button from '@/components/Buttton';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import FormRow from '@/components/ResumeBuilder/Builder/Sections/FormRow';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ImageUploadModal from '@/components/ImageUploadModal';
import { UserAvatar } from '@/components/UserAvatar';
import { MongoId } from '@/types/MongoDocument';
import Tooltip from '@/components/Tooltip';
import TooltipBox from '@/components/TooltipBox';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

interface IProps {
  controller: DetailFormController;
}

export default function DetailForm({ controller }: IProps) {
  controller.useController();
  const [showMore, setShowMore] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const { form, state } = controller;

  return (
    <SectionItem>
      <SectionItemHeader
        isExpanded={form.isExpanded}
        onClickHeader={controller.onChangeIsExpanded}
        menu={false}
        id={controller.id}
      >
        <div>{form.title || '(Not specified)'}</div>
      </SectionItemHeader>
      <SectionItemBody isExpanded={form.isExpanded}>
        <FormRow>
          <div className="flex-1">
            <FormLabel<IForm> field="title">Title</FormLabel>
            <Input<IForm>
              field="title"
              errors={state.errors}
              value={form.title}
              onChange={controller.onChangeTitle}
            />
          </div>
          <div className="flex-1 flex items-end">
            <div className="flex items-center gap-x-3">
              <div className="size-[4.25rem] rounded-full overflow-hidden bg-gray-100 shrink-0">
                <Popover className="relative">
                  <PopoverButton as="div">
                    <UserAvatar
                      value={form.photo}
                      alt="UserPhoto"
                    />
                  </PopoverButton>
                  <PopoverPanel
                    anchor="bottom"
                    className="mt-1 overflow-hidden"
                  >
                    <TooltipBox>
                      <Button
                        variant="linkRed"
                        onClick={() => controller.onClearPhoto()}
                      >
                        Remove photo
                      </Button>
                    </TooltipBox>
                  </PopoverPanel>
                </Popover>
              </div>
              <div className="grow flex flex-col gap-y-2">
                <Button
                  variant="link"
                  onClick={() => setShowImageUpload(true)}
                >
                  Upload photo
                </Button>
              </div>
            </div>
          </div>
        </FormRow>
        <FormRow>
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
        </FormRow>
        <FormRow>
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
        </FormRow>
        <FormRow>
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
        </FormRow>
        <div className={cn(showMore ? 'flex flex-col gap-y-2' : 'hidden')}>
          <FormRow>
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
          </FormRow>
          <FormRow>
            <div className="flex-1">
              {/*Include this section if your profession requires a certain type of license. If not, leave it blank.*/}
              <FormLabel<IForm>
                field="license"
                className="flex items-end gap-x-1"
              >
                <div>License</div>
                <div>
                  <Tooltip size={15}>
                    <TooltipBox>
                      Include this only if your profession or application
                      requires a certain type of license. If not, leave blank.
                    </TooltipBox>
                  </Tooltip>
                </div>
              </FormLabel>
              <Input<IForm>
                field="license"
                errors={state.errors}
                value={form.license}
                onChange={controller.onChangeLicense}
              />
            </div>
            <div className="flex-1">
              <FormLabel<IForm>
                field="nationality"
                className="flex items-end gap-x-1"
              >
                <div>Nationality</div>
                <div>
                  <Tooltip size={15}>
                    <TooltipBox>
                      Include this only if your profession or application
                      requires your nationality to be known. If not, leave
                      blank.
                    </TooltipBox>
                  </Tooltip>
                </div>
              </FormLabel>
              <Input<IForm>
                field="nationality"
                errors={state.errors}
                value={form.nationality}
                onChange={controller.onChangeNationality}
              />
            </div>
          </FormRow>
          <FormRow>
            <div className="flex-1">
              <FormLabel<IForm>
                field="placeOfBirth"
                className="flex items-end gap-x-1"
              >
                <div>Place Of Birth</div>
                <div>
                  <Tooltip size={15}>
                    <TooltipBox>
                      Include this only if your profession or application
                      requires your place of birth to be known. If not, leave
                      blank.
                    </TooltipBox>
                  </Tooltip>
                </div>
              </FormLabel>
              <Input<IForm>
                field="placeOfBirth"
                errors={state.errors}
                value={form.placeOfBirth}
                onChange={controller.onChangePlaceOfBirth}
              />
            </div>
            <div className="flex-1">
              <FormLabel<IForm>
                field="dateOfBirth"
                className="flex items-end gap-x-1"
              >
                <div>Date Of Birth</div>
                <div>
                  <Tooltip size={15}>
                    <TooltipBox>
                      Include this only if your profession or application
                      requires your date of birth to be known. If not, leave
                      blank.
                    </TooltipBox>
                  </Tooltip>
                </div>
              </FormLabel>
              <Input<IForm>
                field="dateOfBirth"
                errors={state.errors}
                value={form.dateOfBirth}
                onChange={controller.onChangeDateOfBirth}
              />
            </div>
          </FormRow>
        </div>
        <Button
          variant="link"
          onClick={() => setShowMore(!showMore)}
        >
          <div className="flex w-full">
            <div className="grow text-left">
              {showMore ? 'Show less fields' : 'Show more fields'}
            </div>
            <div className="shrink-0 text-gray-500">
              {showMore ? <ChevronDown /> : <ChevronUp />}
            </div>
          </div>
        </Button>
      </SectionItemBody>
      <ImageUploadModal
        open={showImageUpload}
        onClose={() => setShowImageUpload(false)}
        onUpload={(ids?: MongoId[]) => {
          controller.onImageUpload(ids);
          setShowImageUpload(false);
        }}
        route="/api/resumes/photo"
        maxFileSize={2000000}
      />
    </SectionItem>
  );
}
