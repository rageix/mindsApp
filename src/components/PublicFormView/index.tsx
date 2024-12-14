'use client';
import Container from '@/components/Container';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { useState } from 'react';
import PublicFormEditorController from '@/components/PublicFormView/PublicFormEditor/PublicFormEditorController';
import Form from '@/components/Form';
import Alert from '@/components/Alert';
import Button from '@/components/Buttton';
import Section from '@/components/PublicFormView/PublicFormEditor/Section';
import { postApiFormsPublic } from '@/requests/api/forms/public';
import useTheme from '@/hooks/UseTheme';
import { cn } from '@/util/Cn';
import { ETheme } from '@/common/Theme';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function PublicFormView() {
  const theme = useTheme();
  const { formId } = useParams<{ formId: string }>();
  const router = useRouter();
  const [controller] = useState(new PublicFormEditorController(formId));
  controller.useController(async (formResponse) => {
    const response = await postApiFormsPublic(formResponse);

    if (response !== null) {
      if (controller.state.form?.settings?.completionUrl) {
        window.location.href = controller.state.form?.settings?.completionUrl;
        return;
      }
      router.push('/form/success');
    }
  });

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
    <div
      className={cn(
        'min-h-screen h-full flex items-center',
        theme === ETheme.light ? 'bg-gray-200 text-gray-900' : null,
        theme === ETheme.dark ? 'bg-gray-900 text-white' : null,
      )}
    >
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
                {state.hasErrors && (
                  <Alert variant="red">
                    The form has errors. Please fix them and try to submit
                    again.
                  </Alert>
                )}
                <div className="flex items-center justify-end gap-x-6">
                  <Button
                    type="button"
                    variant="blue"
                    // disabled={state.hasErrors}
                    isInline
                    onClick={controller.onClickSave}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
      {controller.state.form?.settings?.googleAnalyticsId && (
        <GoogleAnalytics gaId="G-DQFYW924BM" />
      )}
    </div>
  );
}
