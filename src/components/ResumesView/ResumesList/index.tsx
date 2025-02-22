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
import Loading from '@/components/Loading';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import Button from '@/components/Buttton';
import { FileIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MenuItemButton from '@/components/MenuItemButton';
import { MongoId } from '@/types/MongoDocument';
import { CONFIRM_DELETE_ONE, CONFIRM_DELETE_SELECTED } from '@/common/Confirm';
import EllipsisMenu from '../../EllipsisMenu';
import { MenuItem } from '@headlessui/react';
import Link from 'next/link';
import FilterPopover from '@/components/FilterPopover';
import { IResume } from '@/types/Resume';
import ResumesFiltersController, {
  IForm,
} from '@/components/ResumesView/ResumesFiltersForm/ResumesFiltersController';
import useResumes from '@/hooks/UseResumes';
import ResumesFiltersForm from '@/components/ResumesView/ResumesFiltersForm';
import { postApiResumesCreate } from '@/requests/api/resumes/create';
import { postApiResumesDuplicate } from '@/requests/api/resumes/duplicate';

function getColumns(
  onClickDuplicateOne: (_id: MongoId) => void,
  onClickDeleteOne: (_id: MongoId) => void,
  onClickDeleteSelected: (arg: RowModel<IHasId<IResume>>) => void,
): ColumnDef<IHasId<IResume>>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <div
          className="flex w-full items-center justify-center"
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
          className="flex w-full items-center justify-center"
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
        <Link href={`/resumes/${row.original._id}`}>
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
          <MenuItemButton onClick={() => onClickDuplicateOne(row.original._id)}>
            Duplicate
          </MenuItemButton>
          <MenuItemButton onClick={() => onClickDeleteOne(row.original._id)}>
            Delete
          </MenuItemButton>
        </EllipsisMenu>
      ),
    },
  ];
}

export default function ResumesList() {
  const router = useRouter();
  const [filterController] = useState(new ResumesFiltersController());
  const [filter, setFilter] = useState<IForm>(filterController.defaultForm);
  const [showFilters, setShowFilters] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const resumes = useResumes({
    ...pagination,
    ...filter,
  });

  function onEdit(item: IHasId<IResume>) {
    router.push(`/resumes/${item._id}`);
  }

  async function onDuplicateOne(_id: MongoId) {
    const result = await postApiResumesDuplicate({ _id });

    if (result) {
      resumes.query.refetch();
    }
  }

  async function onClickDeleteOne(_id: MongoId) {
    if (confirm(CONFIRM_DELETE_ONE)) {
      await resumes.deleteItems([_id]);
      setRowSelection({});
    }
  }

  async function onClickDeleteSelected(arg: RowModel<IHasId<IResume>>) {
    const ids = arg.rows.map((v) => v.original._id);

    if (ids.length > 0 && confirm(CONFIRM_DELETE_SELECTED)) {
      await resumes.deleteItems(ids);
      setRowSelection({});
    }
  }

  async function onClickNew() {
    const response = await postApiResumesCreate();

    if (response) {
      router.push(`/resumes/${response._id}`);
    }
  }

  const columns = useMemo(
    () => getColumns(onDuplicateOne, onClickDeleteOne, onClickDeleteSelected),
    [],
  );

  if (!resumes.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const hasItems = (resumes.data?.data || []).length > 0;

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
          <ResumesFiltersForm
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
          <span className="ms-1">New Resume</span>
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
                <p className="text-center font-bold text-2xl">
                  No Resumes Found
                </p>
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
            <Table<IHasId<IResume>>
              data={resumes.data?.data || []}
              pagination={pagination}
              setPagination={setPagination}
              sorting={sorting}
              setSorting={setSorting}
              columns={columns}
              dataFetchFn={() => []}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              count={resumes.data?.count || 0}
              onClickEdit={(item) => onEdit(item)}
              hasCheckbox
            />
          </div>
        </div>
      )}
    </div>
  );
}
