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
import useTheme from '@/hooks/UseTheme';
import { ETheme } from '@/common/Theme';

interface Props<T> {
  data: T[];
  pagination?: PaginationState;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  rowSelection?: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  columns: ColumnDef<T>[];
  dataFetchFn: () => T[];
  onClickEdit?: (item: T) => void;
  count?: number;
  hasCheckbox?: boolean;
}

export default function Table<T>(props: Props<T>) {
  const ref = useRef(null);
  const size = useSize(ref);
  const theme = useTheme();

  const table = useReactTable<T>({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: Math.ceil(
      (props.count || 0) / (props.pagination?.pageSize || 0),
    ),
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
      : (props.pagination?.pageIndex || 0) * (props.pagination?.pageSize || 0) +
        1;
  const countEnd = countStart + (props.pagination?.pageSize || 0) - 1;

  return (
    <div className="overflow-x-auto">
      <div
        className={cn(
          'rounded-lg overflow-hidden',
          theme === ETheme.light ? 'border border-gray-200' : null,
          theme === ETheme.dark ? '' : null,
        )}
      >
        <table
          ref={ref}
          className={cn(
            'relative min-w-full',
            theme === ETheme.light ? 'bg-white' : null,
            theme === ETheme.dark ? 'bg-gray-800' : null,
          )}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={cn(
                  'border-b',
                  theme === ETheme.light ? 'bg-white border-gray-200' : null,
                  theme === ETheme.dark ? 'border-gray-700' : null,
                )}
              >
                {headerGroup.headers.map((header, i) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      scope="col"
                      className={cn(
                        'py-3.5 text-sm font-semibold ',
                        theme === ETheme.light ? 'text-gray-500' : null,
                        theme === ETheme.dark ? 'text-gray-400' : null,
                        props.hasCheckbox && i === 0
                          ? 'text-center w-10 '
                          : 'text-left px-3',
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
                className={cn(
                  'border-t ',
                  theme === ETheme.light ? 'border-gray-200' : null,
                  theme === ETheme.dark ? 'border-gray-700' : null,
                )}
                // onDoubleClick={() =>
                //   props.onClickEdit ? props.onClickEdit(row.original) : null
                // }
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
        {props.pagination && (
          <nav
            className={cn(
              'flex gap-x-6 items-center justify-between py-3 px-3',
              theme === ETheme.light
                ? 'bg-white text-gray-900 border-t border-gray-200'
                : null,
              theme === ETheme.dark ? 'bg-gray-700 text-gray-400' : null,
            )}
            aria-label="Pagination"
            style={{ width: size?.width }}
          >
            <div
              className={cn(
                'hidden shrink-0',
                (size?.width || 0) >= 640 ? 'block' : null,
              )}
            >
              <p className="text-sm">
                Showing <span className="font-medium">{countStart}</span>
                &nbsp;to{' '}
                <span className="font-medium">
                  {Math.min(countEnd, props?.count || 0)}
                </span>{' '}
                of&nbsp;
                <span className="font-medium">{props.count}</span> results
              </p>
            </div>
            <div
              className={cn(
                'flex flex-1 gap-x-3 justify-between',
                (size?.width || 0) >= 640 ? 'justify-end' : null,
              )}
            >
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
                  value={props.pagination?.pageIndex || 0}
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
        )}
      </div>
    </div>
  );
}
