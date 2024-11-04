import { IForm } from '@/components/ProfilesView/ProfileEditor/TextItemForm/TextItemFormController';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import useTeamId from '@/hooks/UseTeamId';
import AvatarItemFormController from '@/components/ProfilesView/ProfileEditor/AvatarItemForm/AvatarItemFormController';
import FormErrors from '@/components/FormErrors';
import FormLabel from '@/components/FormLabel';
import ProtectedImage from '@/components/ProtectedImage';

interface IProps {
  controller: AvatarItemFormController;
}

export default function AvatarItemForm({ controller }: IProps) {
  controller.useController();
  const { form, state } = controller;
  const teamId = useTeamId();

  return (
    <div className="col-span-full">
      <FormLabel className="mb-2">Images</FormLabel>
      <ImageUploader
        onUpload={(ids) => controller.onSetValue(ids || [])}
        route={`/api/profiles/avatar/${teamId}`}
        maxFiles={1}
        maxFileSize={2000000}
        params={{ teamId }}
      />
      <div className="mt-6 flex gap-x-3">
        {(form.value || []).map((v) => (
          <div
            key={String(v)}
            className="mt-2"
          >
            <div className="aspect-[4/5] w-52 h-[17.5rem] relative rounded-2xl overflow-hidden cursor-pointer">
              <ProtectedImage
                _id={v}
                alt="Profile Image"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <FormErrors<IForm>
        field="value"
        errors={state.errors}
      />
    </div>
  );
}
