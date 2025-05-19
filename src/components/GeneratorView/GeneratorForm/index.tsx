'use client';
import Button from '@/components/Buttton';
import GeneratorFormController, {
  IForm,
} from '@/components/GeneratorView/GeneratorForm/GeneratorFormController';
import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import FormErrors from '@/components/FormErrors';
import _ from 'lodash';
import Form from '@/components/Form';
import Textarea from '@/components/Textarea';
import Switch from '@/components/Switch';
import { EModel } from '@/types/Model';

interface IProps {
  controller: GeneratorFormController;
  onSubmit: () => void;
}

export default function GeneratorForm({ controller, onSubmit }: IProps) {
  controller.useController();

  const { state, form } = controller;

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2">
        <div className="shrink-0">
          <FormLabel<IForm> field="count">Generate me</FormLabel>
          <Input<IForm>
            field="count"
            type="number"
            errors={state.errors}
            value={form.count}
            onChange={controller.onChangeCount}
            className="sm:max-w-20"
          />
          <FormErrors<IForm>
            field="count"
            errors={state.errors}
          />
        </div>
        <div className="grow">
          <FormLabel<IForm> field="directions">Directions</FormLabel>
          <Input<IForm>
            field="directions"
            errors={state.errors}
            value={form.directions}
            onChange={controller.onChangeDirections}
          />
          <FormErrors<IForm>
            field="directions"
            errors={state.errors}
          />
        </div>
      </div>
      <div>
        <FormLabel<IForm> field="text">Text</FormLabel>
        <Textarea<IForm>
          field="text"
          errors={state.errors}
          value={form.text}
          onChange={controller.onChangeText}
        />
        <FormErrors<IForm>
          field="directions"
          errors={state.errors}
        />
      </div>
      <div>
        <FormLabel>Using these models:</FormLabel>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3">
          <div className="flex gap-x-3">
            <Switch
              checked={form.models[EModel.ChatGPT4o]}
              onChange={() => controller.onChangeModel(EModel.ChatGPT4o)}
              label={EModel.ChatGPT4o}
            />
            <div>{EModel.ChatGPT4o}</div>
          </div>
          <div className="flex gap-x-3">
            <Switch
              checked={form.models[EModel.Gemini2]}
              onChange={() => controller.onChangeModel(EModel.Gemini2)}
              label={EModel.Gemini2}
            />
            <div>{EModel.Gemini2}</div>
          </div>
          <div className="flex gap-x-3">
            <Switch
              checked={form.models[EModel.Claude37Sonnet]}
              onChange={() => controller.onChangeModel(EModel.Claude37Sonnet)}
              label={EModel.Claude37Sonnet}
            />
            <div>{EModel.Claude37Sonnet}</div>
          </div>
          <div className="flex gap-x-3">
            <Switch
              checked={form.models[EModel.NovaPro]}
              onChange={() => controller.onChangeModel(EModel.NovaPro)}
              label={EModel.NovaPro}
            />
            <div>{EModel.NovaPro}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="blue"
          disabled={!_.isEmpty(state.errors)}
          onClick={onSubmit}
          isInline
        >
          Generate
        </Button>
      </div>
    </Form>
  );
}
