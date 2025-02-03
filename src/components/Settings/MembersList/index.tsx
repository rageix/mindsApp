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
import FormattedBoolean from '@/components/FormattedBoolean';
import { EMemberRole, IMember } from '@/types/Member';
import UserInfo from '@/components/UserInfo';
import useMembers from '@/hooks/UseMembers';
import useTeamId from '@/hooks/UseTeamId';
import Loading from '@/components/Loading';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import { UsersRoundIcon } from 'lucide-react';
import TableOptionsMenu from '@/components/TableOptionsMenu';
import { MenuItem } from '@headlessui/react';
import MenuItemButton from '@/components/MenuItemButton';
import { MongoId } from '@/types/MongoDocument';
import { CONFIRM_DELETE_SELECTED } from '@/common/Confirm';
import { toast } from 'react-toastify';
import { roleSelectOptions } from '@/common/SelectOptions';
import Select from '@/components/Select';
import WarningAlert from '@/components/Alert/WarningAlert';
import useSubscription from '@/hooks/UseSubscription';
import MemberForm from '@/components/Settings/MemberForm';
import { nanoid } from 'nanoid';
import FilterPopover from '@/components/FilterPopover';
import MembersFiltersForm from '@/components/Settings/MembersList/MembersFiltersForm';
import MembersFiltersController, {
  IForm,
} from '@/components/Settings/MembersList/MembersFiltersForm/MembersFiltersController';

function getColumns(
  onClickDeleteOne: (_id: MongoId) => void,
  onClickDeleteSelected: (arg: RowModel<IHasId<IMember>>) => void,
  onClickDisableOne: (_id: MongoId, enabled: boolean) => void,
  onClickResendInvite: (_id: MongoId) => void,
  onChangeRole: (_id: MongoId, role: EMemberRole) => void,
): ColumnDef<IHasId<IMember>>[] {
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
      id: 'user',
      header: () => 'User',
      cell: ({ row }) => {
        if (!row.original.userId) {
          return (
            <p className="text-sm font-normal leading-6 text-white">
              <span>{row.original.inviteEmail}</span>
              <br />
              <span className="text-gray-400 italic">Invite sent</span>
            </p>
          );
        }
        return <UserInfo value={row.original.user} />;
      },
      enableSorting: false,
    },
    {
      id: 'enabled',
      header: () => 'Enabled',
      cell: ({ row }) => <FormattedBoolean value={row.original.enabled} />,
      enableSorting: false,
    },
    {
      id: 'role',
      header: () => 'Role',
      cell: ({ row }) => (
        <Select
          options={roleSelectOptions}
          value={roleSelectOptions.find((v) => v.value === row.original.role) || null}
          onChange={(option) => onChangeRole(row.original._id, option.value)}
          className="w-28 relative z-10"
        />
      ),
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
          {row.original.enabled && (
            <MenuItemButton
              onClick={() => onClickDisableOne(row.original._id, false)}
            >
              Disable
            </MenuItemButton>
          )}
          {!row.original.enabled && (
            <MenuItemButton
              onClick={() => onClickDisableOne(row.original._id, true)}
            >
              Enable
            </MenuItemButton>
          )}
          {!row.original.user && (
            <MenuItemButton
              onClick={() => onClickResendInvite(row.original._id)}
            >
              Re-send Invite
            </MenuItemButton>
          )}
          <MenuItemButton onClick={() => onClickDeleteOne(row.original._id)}>
            Delete
          </MenuItemButton>
        </TableOptionsMenu>
      ),
    },
  ];
}

export default function MembersList() {
  // const [show, setShow] = useState(false);
  // const [formController] = useState(new MemberFormController());
  const [id, setId] = useState(nanoid());
  const teamId = useTeamId();
  const subscription = useSubscription();
  const [filterController] = useState(new MembersFiltersController());
  const [filter, setFilter] = useState<IForm>(filterController.defaultForm);
  const [showFilters, setShowFilters] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const members = useMembers(
    {
      ...pagination,
      teamId: teamId,
      ...filter,
    },
    id,
  );

  const canMakeNew: boolean = useMemo(() => {
    return (
      !subscription.data?.plan ||
      (members.data?.count || 0) < subscription.data.members
    );
  }, [subscription.data, members.data]);

  async function onClickDisableOne(_id: MongoId, enabled: boolean) {
    const response = await members.enableItem(_id, enabled);

    if (response) {
      toast.success('Member ' + (enabled ? 'enabled.' : 'disabled.'));
    }
  }

  async function onClickResendInvite(_id: MongoId) {
    const response = await members.resendInvite(_id);

    if (response) {
      toast.success('Invite email was resent.');
    }
  }

  async function onClickDeleteOne(_id: MongoId) {
    if (
      confirm(
        "Are you sure? This will also delete anything linked to the user like cards and profiles!\n\nIf you want to keep these things disable the user instead.\n\nThis can't be undone!",
      )
    ) {
      await members.deleteItems([_id], teamId);
      setRowSelection({});
    }
  }

  async function onChangeRole(_id: MongoId, role: EMemberRole) {
    const response = await members.changeRole(_id, role);

    if (response) {
      toast.success('Member role updated.');
    }
  }

  async function onClickDeleteSelected(arg: RowModel<IHasId<IMember>>) {
    const ids = arg.rows.map((v) => v.original._id);

    if (ids.length > 0 && confirm(CONFIRM_DELETE_SELECTED)) {
      await members.deleteItems(ids, teamId);
      setRowSelection({});
    }
  }

  const columns = useMemo(
    () =>
      getColumns(
        onClickDeleteOne,
        onClickDeleteSelected,
        onClickDisableOne,
        onClickResendInvite,
        onChangeRole,
      ),
    [],
  );

  if (!members.initLoad) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const hasItems = (members.data?.data || []).length > 0;

  return (
    <div className="space-y-3">
        <div className="space-y-3">
          {canMakeNew && (
            <Card className="mb-12">
              <CardBody>
                <div className="flex justify-center">
                  <MemberForm onUpdated={() => setId(nanoid())} />
                </div>
              </CardBody>
            </Card>
          )}
          {!canMakeNew && (
            <WarningAlert className="mb-3">
              You are at the maximum limit of members for your team.
            </WarningAlert>
          )}
          <div>
            <FilterPopover
              show={showFilters}
              onClickButton={() => {
                if (showFilters) {
                  setFilter(filterController.form);
                }
                setShowFilters(!showFilters);
              }}
            >
              <MembersFiltersForm
                controller={filterController}
                onUpdate={() => {
                  setFilter(filterController.form);
                  setShowFilters(false);
                }}
              />
            </FilterPopover>
          </div>
          {!hasItems && (
              <Card>
                <CardBody>
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-center">
                      <UsersRoundIcon
                        className="text-gray-400"
                        size="48"
                      />
                    </div>
                    <p className="text-center font-bold text-2xl">
                      No members found
                    </p>
                    {/*<div>*/}
                    {/*  <p className="text-center text-gray-200">*/}
                    {/*    You can invite by using the form above.*/}
                    {/*  </p>*/}
                    {/*</div>*/}
                  </div>
                </CardBody>
              </Card>
          )}
          {hasItems && (
            <Table<IHasId<IMember>>
              data={members.data?.data || []}
              pagination={pagination}
              setPagination={setPagination}
              sorting={sorting}
              setSorting={setSorting}
              columns={columns}
              dataFetchFn={() => []}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              count={members.data?.count || 0}
              onClickEdit={() => null}
              hasCheckbox
            />
          )}
        </div>
    </div>
  );
}
