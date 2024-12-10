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

interface IProps {
  controller: ResponseRatingFormController
}

export default function ResponseRatingForm({controller}: IProps) {
  // const { formResponseId } = useParams<{ formResponseId: string }>();
  // const [controller] = useState(new ResponseRatingFormController());

  controller.useController(async (form) => {
    const response = await postApiResponseRatings(form);

    if (response) {
      toast.success('Changes saved.');
    }
  });

  const { form, state } = controller;

  return (
    <Form onSubmit={controller.onSubmitForm}>
      <div>
        <FormLabel<IForm> field="comment">Comment</FormLabel>
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
      <div className="flex justify-center">
        <Button
          variant="blue"
          isInline
          className={form.thumbsUp ? '!bg-blue-400' : ''}
          onClick={() => controller.onChangeThumbs(true)}
        >
          <ThumbsUp /> Yes
        </Button>
        <Button
          variant="blue"
          isInline
          className={!form.thumbsUp ? '!bg-blue-400' : ''}
          onClick={() => controller.onChangeThumbs(false)}
        >
          <ThumbsDown /> No
        </Button>
      </div>
      <div>
        <Button
          type="submit"
          variant="blue"
          data-testid="submitButton"
          className="w-full"
          disabled={!_.isEmpty(state.errors)}
        >
          Save
        </Button>
      </div>
    </Form>
  );
}
