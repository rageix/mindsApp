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
import ResponseRatingsList from '@/components/ResponseRatingsList';
import ResponseRatingForm from '@/components/ResponseRatingForm';
import { useState } from 'react';
import ResponseRatingFormController from '@/components/ResponseRatingForm/ResponseRatingFormController';
import CardHeader from '@/components/Card/CardHeader';
import FormattedDate from '@/components/FormattedDate';
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function FormResponseView() {
  const teamId = useTeamId();
  const { formResponseId } = useParams<{ formResponseId: string }>();
  const formResponse = useFormResponse(formResponseId, teamId);
  const router = useRouter();
  const [formController] = useState(
    new ResponseRatingFormController(formResponseId, teamId),
  );

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
    <div className="max-w-3xl w-full mx-auto">
      <DashboardPageHeader title="Form Response" />
      <BackButton onClick={back} />
      <div className="space-y-3">
        <Card>
          <CardBody>
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
            <div className="mt-3 flex justify-between">
              <div className="flex gap-x-5">
                <div className="flex gap-x-3">
                  <ThumbsUp />
                  <span>{formResponse.data?.thumbsUp || 0}</span>
                </div>
                <div className="flex gap-x-3">
                  <ThumbsDown />
                  <span>{formResponse.data?.thumbsDown || 0}</span>
                </div>
              </div>
              <div>
                <FormattedDate value={formResponse.data?.createdAt} />
              </div>
            </div>
          </CardBody>
        </Card>
        {/*<h2 className="text-xl font-bold tracking-tight text-white">*/}
        {/*  Your Rating*/}
        {/*</h2>*/}
        <Card>
          <CardHeader>Your Rating</CardHeader>
          <CardBody>
            <ResponseRatingForm controller={formController} />
          </CardBody>
        </Card>
        <div className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Ratings
          </h2>
          <ResponseRatingsList />
        </div>
      </div>
    </div>
  );
}
