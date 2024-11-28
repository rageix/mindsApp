'use client';
import Container from '@/components/Container';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { useState } from 'react';
import PublicFormEditorController from '@/components/PublicFormView/PublicFormEditor/PublicFormEditorController';
import Form from '@/components/Form';
import _ from 'lodash';
import Alert from '@/components/Alert';
import Button from '@/components/Buttton';
import Section from '@/components/PublicFormView/PublicFormEditor/Section';

export default function PublicFormView() {
  const { formId } = useParams<{ formId: string }>();
  const [controller] = useState(new PublicFormEditorController(formId));
  controller.useController((response) => {
    console.log(response);
  });
  const router = useRouter();

  if (!controller.state.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const { state } = controller;

  if (!state.form) {
    router.push('/404');
    return null;
  }

  return (
    <div className="min-h-screen h-full flex items-center">
      <Container size="3xl">
        <Card rounded="2xl">
          <CardBody className="space-y-12">
            <Form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 space-y-12"
            >
              {state.sectionControllers.map((v) => (
                <Section
                  key={v.section.key}
                  controller={v}
                />
              ))}
              <div className="mt-6 flex flex-col space-y-3">
                {!_.isEmpty(state.hasErrors) && (
                  <Alert variant="red">
                    The form has errors. Please fix them and try to save again.
                  </Alert>
                )}
                <div className="flex items-center justify-end gap-x-6">
                  <Button
                    type="button"
                    variant="blue"
                    disabled={!_.isEmpty(state.hasErrors)}
                    isInline
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
