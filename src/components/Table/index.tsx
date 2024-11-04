import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction, useRef } from 'react';
import PageNumberInput from '@/components/Table/PageNumberInput';
import TableNavButton from '@/components/Table/TableNavButton';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '@/util/Cn';
import useSize from '@/hooks/UseSize';

interface Props<T> {
  data: T[];
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  columns: ColumnDef<T, any>[];
  dataFetchFn: () => T[];
  onClickEdit?: (item: T) => void;
  count: number;
  hasCheckbox?: boolean;
}

export default function Table<T>(props: Props<T>) {
  const ref = useRef(null);
  const size = useSize(ref);

  const table = useReactTable<T>({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: Math.ceil(props.count / props.pagination.pageSize),
    state: {
      pagination: props.pagination,
      rowSelection: props.rowSelection,
      sorting: props.sorting,
    },
    enableRowSelection: true, //enable row selection for all rows
    onRowSelectionChange: props.setRowSelection,
    onPaginationChange: props.setPagination,
    onSortingChange: props.setSorting,
    manualPagination: true,
    manualSorting: true,
  });

  const countStart =
    props.data.length === 0
      ? 0
      : props.pagination.pageIndex * props.pagination.pageSize + 1;
  const countEnd = countStart + props.pagination.pageSize - 1;

  return (
    <div className="overflow-x-auto">
      <table
        ref={ref}
        className="relative min-w-full rounded-t-lg bg-gray-800"
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b-2 border-gray-700"
            >
              {headerGroup.headers.map((header, i) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    scope="col"
                    className={cn(
                      'py-3.5 text-left text-sm font-semibold text-gray-400',
                      props.hasCheckbox && i === 0
                        ? 'w-10 text-center'
                        : 'px-3',
                    )}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'flex items-center cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
                        {{
                          asc: (
                            <span className="ml-1">
                              <ChevronUpIcon className="h-4 w-4" />
                            </span>
                          ),
                          desc: (
                            <span className="ml-1">
                              <ChevronDownIcon className="h-4 w-4" />
                            </span>
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="cursor-pointer border-t border-gray-700"
              onDoubleClick={() =>
                props.onClickEdit ? props.onClickEdit(row.original) : null
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-3 py-4 text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className="flex gap-x-6 items-center justify-between py-3 px-3 bg-gray-700 rounded-b-lg text-gray-400"
        aria-label="Pagination"
        style={{ width: size?.width }}
      >
        <div className="hidden shrink-0 sm:block">
          <p className="text-sm">
            Showing <span className="font-medium">{countStart}</span>
            &nbsp;to{' '}
            <span className="font-medium">
              {Math.min(countEnd, props.count)}
            </span>{' '}
            of&nbsp;
            <span className="font-medium">{props.count}</span> results
          </p>
        </div>
        <div className="flex flex-1 gap-x-3 justify-between sm:justify-end">
          <TableNavButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </TableNavButton>
          <div>
            <label
              htmlFor="page"
              className="sr-only"
            >
              Page
            </label>
            <PageNumberInput
              value={props.pagination.pageIndex}
              onChange={table.setPageIndex}
            />
          </div>
          <TableNavButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </TableNavButton>
        </div>
      </nav>
    </div>
  );
}
