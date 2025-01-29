import FormErrors from '../FormErrors';
import FormLabel from '@/components/FormLabel';
import _ from 'lodash';
import Button from '@/components/Buttton';
import Form from '@/components/Form';
import ResponseRatingFormController, {
  IForm,
} from '@/components/ResponseRatingForm/ResponseRatingFormController';
import { postApiResponseRatings } from '@/requests/api/responseRatings';
import { toast } from 'react-toastify';
import Textarea from '@/components/Textarea';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/util/Cn';

interface IProps {
  controller: ResponseRatingFormController;
}

export default function ResponseRatingForm({ controller }: IProps) {
  // const { formResponseId } = useParams<{ formResponseId: string }>();
  // const [controller] = useState(new ResponseRatingFormController());

  controller.useController(async (form) => {
    const response = await postApiResponseRatings(form);

    if (response) {
      toast.success('Rating saved.');
    }
  });

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <FormLabel<IForm> field="comment">Comments</FormLabel>
        <Textarea<IForm>
          field="comment"
          errors={state.errors}
          value={form.comment}
          autoComplete="email"
          onChange={controller.onChangeComment}
        />
        <FormErrors<IForm>
          field="comment"
          errors={state.errors}
        />
      </div>
      <div className="flex gap-x-3 justify-center">
        <Button
          variant="blue"
          isInline
          className={cn('w-[5.25rem]', form.thumbsUp ? '!bg-blue-600' : null)}
          onClick={() => controller.onChangeThumbs(true)}
        >
          <ThumbsUp />
          <span className="ms-2">Yes</span>
        </Button>
        <Button
          variant="blue"
          isInline
          className={cn('w-[5.25rem]', !form.thumbsUp ? '!bg-blue-600' : null)}
          onClick={() => controller.onChangeThumbs(false)}
        >
          <ThumbsDown />
          <span className="ms-2">No</span>
        </Button>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="blue"
          data-testid="submitButton"
          disabled={!_.isEmpty(state.errors)}
          isInline
        >
          Save
        </Button>
      </div>
    </Form>
  );
}
