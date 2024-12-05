'use client';
import useTeamId from '@/hooks/UseTeamId';
import Loading from '@/components/Loading';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import BackButton from '@/components/BackButton';
import DashboardPageHeader from '@/components/DashboardPageHeader';
import useFormResponse from '@/hooks/UseFormResponse';
import FormResponseSection from '@/components/FormResponseView/Section';

export default function FormResponseView() {
  const teamId = useTeamId();
  const { id } = useParams<{ id: string }>();
  const formResponse = useFormResponse(id, teamId);
  const router = useRouter();

  function back() {
    router.push(`/dashboard/${teamId}/formResponses`);
  }

  if (!formResponse.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  return (
    <>
      <DashboardPageHeader title="Form Response" />
      <BackButton onClick={back} />
      <Card>
        <CardBody className="space-y-12">
          <div className="mt-3 space-y-12">
            {formResponse.data?.sections.map((v, i) => (
              <FormResponseSection
                key={i}
                section={v}
              />
            ))}
            {/*<div className="flex items-center justify-end gap-x-6">*/}
            {/*  <Button*/}
            {/*    variant="text"*/}
            {/*    onClick={onClickCancel}*/}
            {/*    isInline*/}
            {/*  >*/}
            {/*    Cancel*/}
            {/*  </Button>*/}
            {/*  <Button*/}
            {/*    type="submit"*/}
            {/*    variant="blue"*/}
            {/*    disabled={!_.isEmpty(state.errors)}*/}
            {/*    isInline*/}
            {/*  >*/}
            {/*    Save*/}
            {/*  </Button>*/}
            {/*</div>*/}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
