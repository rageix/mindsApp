'use client';
import useTeamId from '@/hooks/UseTeamId';
import Loading from '@/components/Loading';
import Card from '@/components/Card';
import CardBody from '@/components/Card/CardBody';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useParams } from 'next/navigation';
import { MongoId } from '@/types/MongoDocument';
import { CONFIRM_DELETE_ONE } from '@/common/Confirm';
import useResponseRatings from '@/hooks/UseResponseRatings';
import { UserAvatar } from '@/components/UserAvatar';
import usePagination from '@/hooks/UsePagination';
import MenuItemButton from '@/components/MenuItemButton';
import TableOptionsMenu from '@/components/TableOptionsMenu';
import Button from '@/components/Buttton';
import FormattedDate from '@/components/FormattedDate';
import { ETheme } from '@/common/Theme';
import { cn } from '@/util/Cn';
import useTheme from '@/hooks/UseTheme';

export default function ResponseRatingsList() {
  const theme = useTheme();
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
        <Card>
          <CardBody>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-center">
                <ThumbsUp
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
      )}
      {hasItems && (
        <div>
          {(formResponses.data?.data || []).map((v) => (
            <div key={String(v._id)}>
              <Card>
                {/*<CardHeader>*/}
                {/*  <div className="flex justify-between items-center">*/}
                {/*    <span>Rating</span>*/}
                {/*<TableOptionsMenu className="flex justify-end">*/}
                {/*  <MenuItemButton onClick={() => onClickDeleteOne(v._id)}>*/}
                {/*    Delete*/}
                {/*  </MenuItemButton>*/}
                {/*</TableOptionsMenu>*/}
                {/*  </div>*/}
                {/*</CardHeader>*/}
                <CardBody>
                  <div className="flex min-w-0 gap-x-3">
                    <div className="grow space-y-3">
                      <div className="flex">
                        <div className="grow flex items-center space-x-3">
                          <div className="shrink-0 flex">
                            <div className="size-12 flex-none rounded-full overflow-hidden bg-gray-500">
                              <UserAvatar value={v.user?.avatar} />
                            </div>
                          </div>
                          <div className="flex gap-x-1">
                            {v.user?.name && (
                              <div className={'font-semibold'}>
                                {v.user?.name}
                              </div>
                            )}
                            <div
                              className={cn(
                                theme === ETheme.light ? 'text-gray-500' : null,
                                theme === ETheme.dark ? 'text-gray-200' : null,
                              )}
                            >
                              {v.user?.email}
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <TableOptionsMenu className="flex justify-end">
                            <MenuItemButton
                              onClick={() => onClickDeleteOne(v._id)}
                            >
                              Delete
                            </MenuItemButton>
                          </TableOptionsMenu>
                        </div>
                      </div>
                      <div>{v.comment}</div>
                      <div className="flex justify-between items-baseline">
                        {v.thumbsUp && (
                          <Button
                            variant="blue"
                            isInline
                            className="w-[5.25rem] !bg-blue-500"
                          >
                            <ThumbsUp />
                            <span className="ms-2">Yes</span>
                          </Button>
                        )}
                        {!v.thumbsUp && (
                          <Button
                            variant="blue"
                            isInline
                            className="w-[5.25rem] !bg-blue-500"
                          >
                            <ThumbsDown />
                            <span className="ms-2">No</span>
                          </Button>
                        )}
                        <FormattedDate
                          className={cn(
                            theme === ETheme.light ? 'text-gray-500' : null,
                            theme === ETheme.dark ? 'text-gray-400' : null,
                          )}
                          value={v.updatedAt}
                        />
                      </div>
                    </div>
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
