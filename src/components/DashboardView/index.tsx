'use client';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import Link from 'next/link';
import Button from '@/components/Buttton';

export default function DashboardView() {
  return (
    <Card>
      <CardBody className="space-y-6">
        <p>Welcome to GigaBrainAi!</p>
        <div>
          <p>
            To get started a subscription is required. Please check out the
            plans and get your 14 day trial started.
          </p>
          <div className="mt-3">
            <Link href="/billing/plans">
              <Button
                variant="green"
                isInline
              >
                See Plans
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <p>
            To start a new chat click New Chat in the side bar or the button
            below.
          </p>
          <div className="mt-3">
            <Link
              href="/dashboard/chat"
              className="mt-3"
            >
              <Button
                variant="blue"
                isInline
              >
                New Chat
              </Button>
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
