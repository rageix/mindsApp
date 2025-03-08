'use client';
import FormLabel from '@/components/FormLabel';
import DetailFormController, {
  IForm,
} from '@/components/ResumeBuilder/Builder/Sections/Detail/DetailForm/DetailFormController';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import { cn } from '@/util/Cn';
import Button from '@/components/Buttton';
import SectionItemHeader from '@/components/ResumeBuilder/Builder/Sections/SectionItemHeader';
import SectionItem from '@/components/ResumeBuilder/Builder/Sections/SectionItem';
import SectionItemBody from '@/components/ResumeBuilder/Builder/Sections/SectionItemBody';
import { ChevronDown } from 'lucide-react';
import ImageUploadModal from '@/components/ImageUploadModal';
import { UserAvatar } from '@/components/UserAvatar';
import { MongoId } from '@/types/MongoDocument';
import Tooltip from '@/components/Tooltip';
import TooltipBox from '@/components/TooltipBox';
import emitter from '@/util/Emitter';

interface IProps {
  controller: DetailFormController;
}

export default function DetailForm({ controller }: IProps) {
  controller.useController();
  const [showMore, setShowMore] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const { form, state } = controller;

  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      emitter.emitSaveResume();
      return;
    }

    setInit(true);
  }, [form.photo]);

  return (
    <SectionItem>
      <SectionItemHeader
        onClickHeader={controller.onChangeIsExpanded}
        menu={false}
        id={controller.id}
      >
        <div>
          {(form.firstName + ' ' + form.lastName).trim() || '(Not specified)'}
        </div>
      </SectionItemHeader>
      <SectionItemBody isExpanded={form.isExpanded}>
        <div>
          <FormLabel<IForm> field="firstName">First Name</FormLabel>
          <Input<IForm>
            field="firstName"
            errors={state.errors}
            value={form.firstName}
            onChange={controller.onChangeFirstName}
            onBlur={controller.onBlurInput}
          />
        </div>
        <div>
          <FormLabel<IForm> field="title">Last Name</FormLabel>
          <Input<IForm>
            field="lastName"
            errors={state.errors}
            value={form.lastName}
            onChange={controller.onChangeLastName}
            onBlur={controller.onBlurInput}
          />
        </div>
        <div>
          <FormLabel<IForm> field="title">Title</FormLabel>
          <Input<IForm>
            field="title"
            errors={state.errors}
            value={form.title}
            onChange={controller.onChangeTitle}
            onBlur={controller.onBlurInput}
          />
        </div>
        <div>
          <FormLabel<IForm>
            field="title"
            className="flex gap-x-1"
          >
            <span>Photo</span>
            <Tooltip size={15}>
              <TooltipBox>
                It&apos;s generally recommended NOT to include a photo on your
                resume. If you do, crop it to a square before you try and upload
                it. If not, we will attempt to crop it to a square.
              </TooltipBox>
            </Tooltip>
          </FormLabel>
          <div className="flex items-center gap-x-3">
            <div className="size-[2.75rem] rounded-full overflow-hidden bg-gray-100 shrink-0">
              <UserAvatar
                value={form.photo}
                alt="UserPhoto"
              />
            </div>
            <div className="grow flex gap-2 items-center">
              {!form.photo ? (
                <Button
                  variant="link"
                  onClick={() => setShowImageUpload(true)}
                >
                  Upload photo
                </Button>
              ) : (
                <Button
                  variant="linkRed"
                  onClick={() => controller.onClearPhoto()}
                >
                  Remove photo
                </Button>
              )}
            </div>
          </div>
        </div>
        <div>
          <FormLabel<IForm> field="email">Email</FormLabel>
          <Input<IForm>
            field="email"
            errors={state.errors}
            value={form.email}
            onChange={controller.onChangeEmail}
            onBlur={controller.onBlurInput}
          />
        </div>
        <div>
          <FormLabel<IForm> field="phone">Phone</FormLabel>
          <Input<IForm>
            field="phone"
            errors={state.errors}
            value={form.phone}
            onChange={controller.onChangePhone}
            onBlur={controller.onBlurInput}
          />
        </div>
        <div>
          <FormLabel<IForm> field="city">City </FormLabel>
          <Input<IForm>
            field="city"
            errors={state.errors}
            value={form.city}
            onChange={controller.onChangeCity}
            onBlur={controller.onBlurInput}
          />
        </div>
        <div>
          <FormLabel<IForm> field="state">State</FormLabel>
          <Input<IForm>
            field="state"
            errors={state.errors}
            value={form.state}
            onChange={controller.onChangeState}
            onBlur={controller.onBlurInput}
          />
        </div>
        <div>
          <FormLabel<IForm> field="country">Country</FormLabel>
          <Input<IForm>
            field="country"
            errors={state.errors}
            value={form.country}
            onChange={controller.onChangeCountry}
            onBlur={controller.onBlurInput}
          />
        </div>
        <div></div>
        <div
          className={cn(
            showMore ? 'col-span-2 grid grid-cols-2 gap-2' : 'hidden',
          )}
        >
          <div>
            <FormLabel<IForm> field="address">Address Line 1</FormLabel>
            <Input<IForm>
              field="address"
              errors={state.errors}
              value={form.address}
              onChange={controller.onChangeAddress}
              onBlur={controller.onBlurInput}
            />
          </div>
          <div>
            <FormLabel<IForm> field="address2">Address Line 2</FormLabel>
            <Input<IForm>
              field="address"
              errors={state.errors}
              value={form.address2}
              onChange={controller.onChangeAddress2}
              onBlur={controller.onBlurInput}
            />
          </div>
          <div>
            <FormLabel<IForm> field="postalCode">Postal Code</FormLabel>
            <Input<IForm>
              field="postalCode"
              errors={state.errors}
              value={form.postalCode}
              onChange={controller.onChangePostalCode}
              onBlur={controller.onBlurInput}
            />
          </div>
          <div>
            {/*Include this section if your profession requires a certain type of license. If not, leave it blank.*/}
            <FormLabel<IForm> field="linkedIn">Linkedin Url</FormLabel>
            <Input<IForm>
              field="linkedIn"
              errors={state.errors}
              value={form.linkedIn}
              onChange={controller.onChangeLinkedIn}
              onBlur={controller.onBlurInput}
            />
          </div>
          <div>
            <FormLabel<IForm>
              field="other"
              className="flex items-end gap-x-1"
            >
              <div>Other</div>
              <div>
                <Tooltip size={15}>
                  <TooltipBox>
                    This will appear in the details section as it&apos;s own
                    line. You can place any text in it. For example visa/work
                    sponsorship status...
                  </TooltipBox>
                </Tooltip>
              </div>
            </FormLabel>
            <Input<IForm>
              field="other"
              errors={state.errors}
              value={form.other}
              onChange={controller.onChangeOther}
              onBlur={controller.onBlurInput}
            />
          </div>
        </div>
        <div className="col-span-2">
          <Button
            variant="link"
            onClick={() => setShowMore(!showMore)}
          >
            <div className="flex w-full">
              <div className="grow text-left">
                {showMore ? 'Show less' : 'Show more'}
              </div>
              <div className="shrink-0 text-gray-500">
                <ChevronDown />
              </div>
            </div>
          </Button>
        </div>
      </SectionItemBody>
      <ImageUploadModal
        open={showImageUpload}
        onClose={() => setShowImageUpload(false)}
        onUpload={(ids?: MongoId[]) => {
          controller.onImageUpload(ids);
          setShowImageUpload(false);
        }}
        route="/api/resumes/photo"
        maxFileSize={2097152}
      />
    </SectionItem>
  );
}
