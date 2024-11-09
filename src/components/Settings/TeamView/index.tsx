'use client';
import { useEffect, useState } from 'react';
import useTeam from '@/hooks/UseTeam';
import TeamFormController from '@/components/Settings/TeamView/TeamForm/TeamFormController';
import TeamForm from './TeamForm';
import useTeamId from '@/hooks/UseTeamId';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { toast } from 'react-toastify';
import CardBody from '@/components/Card/CardBody';
import FormBlock from '@/components/FormBlock';
import FormBlockBody from '@/components/FormBlock/FormBlockBody';
import Card from '@/components/Card';
import TeamAvatar from '@/components/TeamAvatar';

export default function TeamView() {
  const [formController] = useState(new TeamFormController());
  const teamId = useTeamId();
  const team = useTeam(teamId);

  function onUpdated() {
    team.query.refetch();
  }

  useEffect(() => {
    if (team.query.isFetched && team.data) {
      formController.setForm(team.data);
    }
  }, [team.data]);

  return (
    <Card>
      <CardBody className="space-y-12">
        <FormBlock
          heading="Avatar"
          description="Your team avatar."
        >
          <FormBlockBody className="flex flex-col gap-6">
            <ImageUploader
              onUpload={() => {
                onUpdated();
                toast.success('Avatar uploaded successfully.');
              }}
              route={`/api/teams/avatar/${teamId}`}
              maxFileSize={2000000}
            />
            <div className="h-36 w-36 flex-none overflow-hidden rounded-full bg-gray-500 m-auto">
              <TeamAvatar value={team?.data?.avatar} />
            </div>
          </FormBlockBody>
        </FormBlock>
        <FormBlock
          heading="Team Information"
          description="Basic information about your team."
        >
          <FormBlockBody>
            <TeamForm
              controller={formController}
              onUpdated={onUpdated}
            />
          </FormBlockBody>
        </FormBlock>
      </CardBody>
    </Card>
  );
}
