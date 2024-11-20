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
import { FileIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MenuItemButton from '@/components/MenuItemButton';
import { MongoId } from '@/types/MongoDocument';
import { CONFIRM_DELETE_ONE, CONFIRM_DELETE_SELECTED } from '@/common/Confirm';
import TableOptionsMenu from '@/components/TableOptionsMenu';
import { MenuItem } from '@headlessui/react';
import { IDynamicForm } from '@/types/DynamicForm';
import useDynamicForms from '@/hooks/UseDynamicForms';

function getColumns(
  onClickEditOne: (_id: MongoId) => void,
  onClickDeleteOne: (_id: MongoId) => void,
  onClickDeleteSelected: (arg: RowModel<IHasId<IDynamicForm>>) => void,
): ColumnDef<IHasId<IDynamicForm>>[] {
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
      id: 'options',
      header: ({ table }) => (
        <TableOptionsMenu>
          <MenuItem>
            <MenuItemButton
              onClick={() => onClickDeleteSelected(table.getSelectedRowModel())}
            >
              Delete Selected
            </MenuItemButton>
          </MenuItem>
        </TableOptionsMenu>
      ),
      cell: ({ row }) => (
        <TableOptionsMenu>
          <MenuItemButton onClick={() => onClickEditOne(row.original._id)}>
            Edit
          </MenuItemButton>
          <MenuItemButton onClick={() => onClickDeleteOne(row.original._id)}>
            Delete
          </MenuItemButton>
        </TableOptionsMenu>
      ),
    },
  ];
}

export default function DynamicFormsList() {
  const router = useRouter();
  const teamId = useTeamId();
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const dynamicForms = useDynamicForms({
    ...pagination,
    text: '',
    teamId: teamId,
  });

  function onEdit(item: IHasId<IDynamicForm>) {
    router.push(`/dashboard/${teamId}/dynamicForms/${item._id}`);
  }

  function onClickEditOne(_id: MongoId) {
    router.push(`/dashboard/${teamId}/dynamicForms/${_id}`);
  }

  async function onClickDeleteOne(_id: MongoId) {
    if (confirm(CONFIRM_DELETE_ONE)) {
      await dynamicForms.deleteItems([_id], teamId);
      setRowSelection({});
    }
  }

  async function onClickDeleteSelected(arg: RowModel<IHasId<IDynamicForm>>) {
    const ids = arg.rows.map((v) => v.original._id);

    if (ids.length > 0 && confirm(CONFIRM_DELETE_SELECTED)) {
      await dynamicForms.deleteItems(ids, teamId);
      setRowSelection({});
    }
  }

  function onClickNew() {
    router.push(`/dashboard/${teamId}/dynamicForms/new`);
  }

  const columns = useMemo(
    () => getColumns(onClickEditOne, onClickDeleteOne, onClickDeleteSelected),
    [],
  );

  if (!dynamicForms.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const hasItems = (dynamicForms.data?.data || []).length > 0;

  return (
    <>
      {!hasItems && (
        <Container size="md">
          <Card>
            <CardBody>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-center">
                  <FileIcon
                    className="text-gray-400"
                    size="48"
                  />
                </div>
                <div>
                  <p className="text-center font-bold text-2xl">
                    No Dynamic Forms
                  </p>
                  <div className="flex justify-center mt-6">
                    <Button
                      variant="blue"
                      onClick={() => onClickNew()}
                      isInline
                    >
                      <PlusIcon className="me-1" /> New Dynamic Form
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
          <div className="flex justify-end">
            <Button
              variant="blue"
              onClick={onClickNew}
              isInline
            >
              <PlusIcon size={16} />
              <span className="ms-1">New Profile</span>
            </Button>
          </div>
          <div className="mt-3">
            <Table<IHasId<IDynamicForm>>
              data={dynamicForms.data?.data || []}
              pagination={pagination}
              setPagination={setPagination}
              sorting={sorting}
              setSorting={setSorting}
              columns={columns}
              dataFetchFn={() => []}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              count={dynamicForms.data?.count || 0}
              onClickEdit={(item) => onEdit(item)}
              hasCheckbox
            />
          </div>
        </div>
      )}
    </>
  );
}
