'use client';
import {
  ColumnDef,
  PaginationState,
  RowModel,
  SortingState,
} from '@tanstack/react-table';
import Checkbox from '@/components/Checkbox';
import Table from '@/components/Table';
import { useMemo, useState } from 'react';
import { IHasId } from '@/types/HasId';
import FormattedDate from '@/components/FormattedDate';
import useTeamId from '@/hooks/UseTeamId';
import Loading from '@/components/Loading';
import Container from '@/components/Container';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import Button from '@/components/Buttton';
import { PlusIcon, SquareUserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MenuItemButton from '@/components/MenuItemButton';
import { MongoId } from '@/types/MongoDocument';
import { CONFIRM_DELETE_ONE, CONFIRM_DELETE_SELECTED } from '@/common/Confirm';
import EllipsisMenu from '../../EllipsisMenu';
import { MenuItem } from '@headlessui/react';
import useCards from '@/hooks/UseCards';
import { ICard } from '@/types/Card';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { copyToClipboard } from '@/util/CopyToClipboard';
import WarningAlert from '@/components/Alert/WarningAlert';
import useSubscription from '@/hooks/UseSubscription';

// const columnHelper = createColumnHelper<IHasId<ICard>>();

function getColumns(
  onClickEditOne: (_id: MongoId) => void,
  onClickDeleteOne: (_id: MongoId) => void,
  onClickDeleteSelected: (arg: RowModel<IHasId<ICard>>) => void,
): ColumnDef<IHasId<ICard>>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <div
          className="cursor-pointer"
          onClick={table.getToggleAllRowsSelectedHandler()}
        >
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              onChange: () => null,
            }}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={row.getToggleSelectedHandler()}
        >
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              onChange: () => null,
            }}
          />
        </div>
      ),
    },
    {
      id: 'name',
      header: () => 'Name',
      cell: ({ row }) => row.original.name || 'unknown',
      enableSorting: false,
    },
    {
      id: 'updatedAt',
      header: () => 'Updated At',
      cell: ({ row }) => <FormattedDate value={row.original.updatedAt} />,
      enableSorting: false,
    },
    {
      id: 'view',
      header: () => <div></div>,
      cell: ({ row }) => (
        <Link href={`/card/${row.original._id}`}>
          <Button
            variant="link"
            isInline
          >
            View
          </Button>
        </Link>
      ),
    },
    {
      id: 'options',
      header: ({ table }) => (
        <EllipsisMenu>
          <MenuItem>
            <MenuItemButton
              onClick={() => onClickDeleteSelected(table.getSelectedRowModel())}
            >
              Delete Selected
            </MenuItemButton>
          </MenuItem>
        </EllipsisMenu>
      ),
      cell: ({ row }) => (
        <EllipsisMenu>
          <MenuItemButton onClick={() => onClickEditOne(row.original._id)}>
            Edit
          </MenuItemButton>
          <MenuItemButton
            onClick={async () => {
              await copyToClipboard(
                process.env.NEXT_PUBLIC_HOST +
                  '/card/' +
                  String(row.original._id),
              );
              toast.success('Link copied.');
            }}
          >
            Copy Link
          </MenuItemButton>
          <MenuItemButton onClick={() => onClickDeleteOne(row.original._id)}>
            Delete
          </MenuItemButton>
        </EllipsisMenu>
      ),
    },
  ];
}

export default function CardsList() {
  const router = useRouter();
  const teamId = useTeamId();
  const subscription = useSubscription();
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const cards = useCards({
    ...pagination,
    text: '',
    teamId: teamId,
  });

  const canMakeNew: boolean = useMemo(() => {
    return (
      !subscription.data?.plan ||
      (cards.data?.count || 0) < subscription.data.cards
    );
  }, [subscription.data, cards.data]);

  function onEdit(item: IHasId<ICard>) {
    router.push(`/dashboard/${teamId}/cards/${item._id}`);
  }

  function onClickEditOne(_id: MongoId) {
    router.push(`/dashboard/${teamId}/cards/${_id}`);
  }

  async function onClickDeleteOne(_id: MongoId) {
    if (confirm(CONFIRM_DELETE_ONE)) {
      await cards.deleteItems([_id], teamId);
      setRowSelection({});
    }
  }

  async function onClickDeleteSelected(arg: RowModel<IHasId<ICard>>) {
    const ids = arg.rows.map((v) => v.original._id);

    if (ids.length > 0 && confirm(CONFIRM_DELETE_SELECTED)) {
      await cards.deleteItems(ids, teamId);
      setRowSelection({});
    }
  }

  function onClickNew() {
    router.push(`/dashboard/${teamId}/cards/new`);
  }

  const columns = useMemo(
    () => getColumns(onClickEditOne, onClickDeleteOne, onClickDeleteSelected),
    [],
  );

  if (!cards.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const hasItems = (cards.data?.data || []).length > 0;

  return (
    <>
      {!hasItems && (
        <Container size="md">
          <Card>
            <CardBody>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-center">
                  <SquareUserRound
                    className="text-gray-400"
                    size="48"
                  />
                </div>
                <div>
                  <p className="text-center font-bold text-2xl">No Cards</p>
                  <div className="flex justify-center mt-6">
                    <Button
                      variant="blue"
                      onClick={() => onClickNew()}
                      isInline
                    >
                      <PlusIcon />
                      <span className="st-1">New Card</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      )}
      {hasItems && (
        <div className="max-w-3xl m-auto">
          {!canMakeNew && (
            <WarningAlert>
              You are at the maximum limit of cards for your team.
              {/*<a*/}
              {/*  href="#"*/}
              {/*  className="font-medium text-yellow-800 underline hover:text-yellow-600"*/}
              {/*>*/}
              {/*  Upgrade your account to add more credits.*/}
              {/*</a>*/}
            </WarningAlert>
          )}
          {canMakeNew && (
            <div className="flex justify-end">
              <Button
                variant="blue"
                onClick={onClickNew}
                isInline
              >
                <PlusIcon size={16} />
                <span className="ms-1">New Card</span>
              </Button>
            </div>
          )}
          <div className="mt-3">
            <Table<IHasId<ICard>>
              data={cards.data?.data || []}
              pagination={pagination}
              setPagination={setPagination}
              sorting={sorting}
              setSorting={setSorting}
              columns={columns}
              dataFetchFn={() => []}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              count={cards.data?.count || 0}
              onClickEdit={(item) => onEdit(item)}
              hasCheckbox
            />
          </div>
        </div>
      )}
    </>
  );
}
