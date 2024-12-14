'use client';
import useStatsDashboard from '@/hooks/UseStatsDashboard';
import useTeamId from '@/hooks/UseTeamId';
import StatBlock from '@/components/DashboardIdView/StatBlock';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import CardHeader from "@/components/Card/CardHeader";

export default function DashboardIdView() {
  const teamId = useTeamId();
  const stats = useStatsDashboard(teamId);

  return (
    <div className="max-w-3xl mx-auto">
      <Card rounded="lg">
        <CardHeader>Stats</CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatBlock
              label="Last 24 Hours"
              value={String(stats?.data?.last24Hours || 0)}
            />
            <StatBlock
              label="All Time"
              value={stats?.data?.numResponses || ''}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
