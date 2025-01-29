'use client';
import { ColumnDef } from '@tanstack/react-table';
import Table from '@/components/Table';
import { useMemo, useState } from 'react';
import useTeamId from '@/hooks/UseTeamId';
import Loading from '@/components/Loading';
import Card from '@/components/Card';
import Container from '@/components/Container';
import CardBody from '@/components/Card/CardBody';
import { FileTextIcon } from 'lucide-react';
import { IStripeInvoiceResponse } from '@/requests/api/teams/invoices/schema';
import FormattedDate from '@/components/FormattedDate';
import { formatAsMoney } from '@/util/FormatAsMoney';
import useInvoices from '@/hooks/UseInvoices';
import Link from 'next/link';
import Button from '@/components/Buttton';

function getColumns(): ColumnDef<IStripeInvoiceResponse>[] {
  return [
    {
      id: 'created',
      header: () => 'Date',
      cell: ({ row }) => (
        <FormattedDate
          value={row.original.created}
          time={false}
          year={true}
        />
      ),
      enableSorting: false,
    },
    {
      id: 'subtotal',
      header: () => 'Subtotal',
      cell: ({ row }) => formatAsMoney(row.original.subtotal / 100),
      enableSorting: false,
    },
    {
      id: 'url',
      header: () => '',
      cell: ({ row }) => (
        <Link
          href={row.original.url || ''}
          target="_blank"
        >
          <Button
            variant="link"
            isInline
          >
            View
          </Button>
        </Link>
      ),
      enableSorting: false,
    },
    {
      id: 'pdf',
      header: () => '',
      cell: ({ row }) => (
        <Link
          href={row.original.pdf || ''}
          target="_blank"
        >
          <Button
            variant="link"
            isInline
          >
            Download PDF
          </Button>
        </Link>
      ),
      enableSorting: false,
    },
  ];
}

export default function InvoicesList() {
  const teamId = useTeamId();
  const [rowSelection, setRowSelection] = useState({});
  const invoices = useInvoices(teamId);

  const columns = useMemo(() => getColumns(), []);

  if (!invoices.initLoad) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const hasItems = (invoices.data?.data || []).length > 0;

  return (
    <>
      {!hasItems && (
        <Container size="md">
          <Card>
            <CardBody>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-center">
                  <FileTextIcon
                    className="text-gray-400"
                    size="48"
                  />
                </div>
                <p className="text-center font-bold text-2xl">
                  No invoices found
                </p>
              </div>
            </CardBody>
          </Card>
        </Container>
      )}
      {hasItems && (
        <div className="max-w-3xl w-full m-auto">
          <Table<IStripeInvoiceResponse>
            data={invoices.data?.data || []}
            columns={columns}
            dataFetchFn={() => []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            onClickEdit={() => null}
            hasCheckbox
          />
        </div>
      )}
    </>
  );
}
