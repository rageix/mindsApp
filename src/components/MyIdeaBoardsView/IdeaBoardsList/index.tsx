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
import Loading from '@/components/Loading';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import Button from '@/components/Buttton';
import { PlusIcon, Rows4Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MenuItemButton from '@/components/MenuItemButton';
import { MongoId } from '@/types/MongoDocument';
import { CONFIRM_DELETE_ONE, CONFIRM_DELETE_SELECTED } from '@/common/Confirm';
import EllipsisMenu from '../../EllipsisMenu';
import { MenuItem } from '@headlessui/react';
import FilterPopover from '@/components/FilterPopover';
import IdeaBoardFilterForm from '@/components/MyIdeaBoardsView/IdeaBoardsFilterForm/IdeaBoardFilterFormController';
import useIdeaBoards from '@/hooks/UseIdeaBoards';
import { postApiIdeaBoardsDuplicate } from '@/requests/api/ideaBoards/duplicate';
import { IIdeaBoard } from '@/types/IdeaBoard';
import { IIdeaBoardFilter } from '@/requests/api/ideaBoards/paginated/schema';
import IdeaBoardsFilterForm from '@/components/MyIdeaBoardsView/IdeaBoardsFilterForm';

function getColumns(
  onClickDuplicateOne: (_id: MongoId) => void,
  onClickDeleteOne: (_id: MongoId) => void,
  onClickDeleteSelected: (arg: RowModel<IHasId<IIdeaBoard>>) => void,
  onClickOpen: (_id: MongoId) => void,
): ColumnDef<IHasId<IIdeaBoard>>[] {
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
      id: 'open',
      header: () => <div></div>,
      cell: ({ row }) => (
        <Button
          variant="link"
          isInline
          onClick={() => onClickOpen(row.original._id)}
        >
          Open
        </Button>
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

interface IProps {
  onOpenId: (_id: MongoId) => void;
  onNew: () => void;
}

export default function IdeaBoardsList({ onOpenId, onNew }: IProps) {
  const router = useRouter();
  const [filterController] = useState(new IdeaBoardFilterForm());
  const [filter, setFilter] = useState<IIdeaBoardFilter>(
    filterController.defaultForm,
  );
  const [showFilters, setShowFilters] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const ideaBoards = useIdeaBoards({
    ...pagination,
    ...filter,
  });

  function onEdit(item: IHasId<IIdeaBoard>) {
    router.push(`/resumes/${item._id}`);
  }

  async function onDuplicateOne(_id: MongoId) {
    const result = await postApiIdeaBoardsDuplicate({ _id });

    if (result) {
      ideaBoards.query.refetch();
    }
  }

  async function onClickDeleteOne(_id: MongoId) {
    if (confirm(CONFIRM_DELETE_ONE)) {
      await ideaBoards.deleteItems([_id]);
      setRowSelection({});
    }
  }

  async function onClickDeleteSelected(arg: RowModel<IHasId<IIdeaBoard>>) {
    const ids = arg.rows.map((v) => v.original._id);

    if (ids.length > 0 && confirm(CONFIRM_DELETE_SELECTED)) {
      await ideaBoards.deleteItems(ids);
      setRowSelection({});
    }
  }

  async function onClickNew() {
    onNew();
    // const response = await postApiResumesCreate();
    //
    // if (response) {
    //   router.push(`/resumes/${response._id}`);
    // }
  }

  async function onClickOpen(_id: MongoId) {
    onOpenId(_id);
  }

  const columns = useMemo(
    () =>
      getColumns(
        onDuplicateOne,
        onClickDeleteOne,
        onClickDeleteSelected,
        onClickOpen,
      ),
    [],
  );

  if (!ideaBoards.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const hasItems = (ideaBoards.data?.data || []).length > 0;

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
          <IdeaBoardsFilterForm
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
          <span className="ms-1">New Idea Board</span>
        </Button>
      </div>
      {!hasItems && (
        <Card>
          <CardBody>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-center">
                <Rows4Icon
                  className="text-gray-400"
                  size="48"
                />
              </div>
              <div>
                <p className="text-center font-bold text-2xl">
                  No Idea Boards Found
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
            <Table<IHasId<IIdeaBoard>>
              data={ideaBoards.data?.data || []}
              pagination={pagination}
              setPagination={setPagination}
              sorting={sorting}
              setSorting={setSorting}
              columns={columns}
              dataFetchFn={() => []}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              count={ideaBoards.data?.count || 0}
              onClickEdit={(item) => onEdit(item)}
              hasCheckbox
            />
          </div>
        </div>
      )}
    </div>
  );
}
