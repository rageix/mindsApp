'use client';
import useTeamId from '@/hooks/UseTeamId';
import Loading from '@/components/Loading';
import Container from '@/components/Container';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import { SquareUserRound } from 'lucide-react';
import { useParams } from 'next/navigation';
import { MongoId } from '@/types/MongoDocument';
import { CONFIRM_DELETE_ONE } from '@/common/Confirm';
import useResponseRatings from '@/hooks/UseResponseRatings';
import { UserAvatar } from '@/components/UserAvatar';
import usePagination from '@/hooks/UsePagination';
import CardHeader from "@/components/Card/CardHeader";
import MenuItemButton from "@/components/MenuItemButton";
import TableOptionsMenu from "@/components/TableOptionsMenu";

export default function ResponseRatingsList() {
  const teamId = useTeamId();
  const { formResponseId } = useParams<{ formResponseId: string }>();
  const pagination = usePagination(0, 10);

  const formResponses = useResponseRatings({
    pageIndex: pagination.page,
    pageSize: pagination.pageSize,
    formResponseId,
    teamId,
  });

  async function onClickDeleteOne(_id: MongoId) {
    if (confirm(CONFIRM_DELETE_ONE)) {
      await formResponses.deleteItems([_id], teamId);
    }
  }

  if (!formResponses.initLoad) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading
          size="lg"
          showAfter={2000}
        />
      </div>
    );
  }

  const hasItems = (formResponses.data?.data || []).length > 0;

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
                  <p className="text-center font-bold text-2xl">
                    No Ratings Found.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      )}
      {hasItems && (
        <div className="max-w-3xl m-auto">
          {(formResponses.data?.data || []).map((v) => (
            <div key={String(v._id)}>
              <Card>
                <CardHeader>
                  <TableOptionsMenu className="flex justify-end">
                    <MenuItemButton onClick={() => onClickDeleteOne(v._id)}>
                      Delete
                    </MenuItemButton>
                  </TableOptionsMenu>
                </CardHeader>
                <CardBody>
                  <div className="flex min-w-0 gap-x-4 items-center gap-x-3">
                    <div className="shrink-0">
                      <div className="h-12 w-12 flex-none rounded-full overflow-hidden bg-gray-500">
                        <UserAvatar value={v.user?.avatar} />
                      </div>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-white">
                          {v.user?.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-200">
                          {v.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="grow bg-gray-900">{v.comment}</div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
