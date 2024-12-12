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
import { IForm } from '@/types/Form';
import useForms from '@/hooks/UseForms';
import Link from 'next/link';
import FilterPopover from '@/components/FilterPopover';
import FormFiltersController, {
  IForm as IControllerForm,
} from '@/components/FormsView/FormFiltersForm/FormFiltersController';
import FormFiltersForm from '@/components/FormsView/FormFiltersForm';

function getColumns(
  onClickEditOne: (_id: MongoId) => void,
  onClickDeleteOne: (_id: MongoId) => void,
  onClickDeleteSelected: (arg: RowModel<IHasId<IForm>>) => void,
): ColumnDef<IHasId<IForm>>[] {
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
        <Link href={`/form/${row.original._id}`}>
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

export default function FormsList() {
  const router = useRouter();
  const teamId = useTeamId();
  const [filterController] = useState(new FormFiltersController());
  const [filter, setFilter] = useState<IControllerForm>(
    filterController.defaultForm,
  );
  const [showFilters, setShowFilters] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const forms = useForms({
    ...pagination,
    teamId: teamId,
    ...filter,
  });

  function onEdit(item: IHasId<IForm>) {
    router.push(`/dashboard/${teamId}/forms/${item._id}`);
  }

  function onClickEditOne(_id: MongoId) {
    router.push(`/dashboard/${teamId}/forms/${_id}`);
  }

  async function onClickDeleteOne(_id: MongoId) {
    if (confirm(CONFIRM_DELETE_ONE)) {
      await forms.deleteItems([_id], teamId);
      setRowSelection({});
    }
  }

  async function onClickDeleteSelected(arg: RowModel<IHasId<IForm>>) {
    const ids = arg.rows.map((v) => v.original._id);

    if (ids.length > 0 && confirm(CONFIRM_DELETE_SELECTED)) {
      await forms.deleteItems(ids, teamId);
      setRowSelection({});
    }
  }

  function onClickNew() {
    router.push(`/dashboard/${teamId}/forms/new`);
  }

  const columns = useMemo(
    () => getColumns(onClickEditOne, onClickDeleteOne, onClickDeleteSelected),
    [],
  );

  if (!forms.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const hasItems = (forms.data?.data || []).length > 0;

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <FilterPopover
          show={showFilters}
          onClickButton={() => {
            if (showFilters) {
              setFilter(filterController.form);
            }
            setShowFilters(!showFilters);
          }}
        >
          <FormFiltersForm
            controller={filterController}
            onUpdate={() => {
              setFilter(filterController.form);
              setShowFilters(false);
            }}
          />
        </FilterPopover>
        <Button
          variant="blue"
          onClick={onClickNew}
          isInline
        >
          <PlusIcon size={16} />
          <span className="ms-1">New Form</span>
        </Button>
      </div>
      {!hasItems && (
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
                <p className="text-center font-bold text-2xl">No Forms Found</p>
                {/*<div className="flex justify-center mt-6">*/}
                {/*  <Button*/}
                {/*    variant="blue"*/}
                {/*    onClick={() => onClickNew()}*/}
                {/*    isInline*/}
                {/*  >*/}
                {/*    <PlusIcon className="me-1" /> New Form*/}
                {/*  </Button>*/}
                {/*</div>*/}
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      {hasItems && (
        <div className="max-w-3xl m-auto">
          <div className="mt-3">
            <Table<IHasId<IForm>>
              data={forms.data?.data || []}
              pagination={pagination}
              setPagination={setPagination}
              sorting={sorting}
              setSorting={setSorting}
              columns={columns}
              dataFetchFn={() => []}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              count={forms.data?.count || 0}
              onClickEdit={(item) => onEdit(item)}
              hasCheckbox
            />
          </div>
        </div>
      )}
    </div>
  );
}
