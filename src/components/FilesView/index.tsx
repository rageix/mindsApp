'use client';
import { useEffect, useRef } from 'react';
import FilesViewItem from '@/components/FilesView/FilesViewItem';
import Button from '@/components/Buttton';
import useIsVisible from '@/hooks/UseIsVisible';
import usePagination from '@/hooks/UsePagination';
import useFiles from '@/hooks/UseFiles';

export default function FilesView() {
  const loadMoreRef = useRef(null);
  const loadMoreVisible = useIsVisible(loadMoreRef);
  const pagination = usePagination(0, 10);
  const files = useFiles({
    pageIndex: pagination.page,
    pageSize: pagination.pageSize,
  });

  useEffect(() => {
    if (!loadMoreVisible || files.query.isLoading) {
      return;
    }
    pagination.nextPage();
  }, [loadMoreVisible]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {(files.files || []).map((file) => (
          <FilesViewItem
            key={String(file._id)}
            file={file}
          />
        ))}
      </div>
      <div className="mt-6">
        <Button
          ref={loadMoreRef}
          variant="blue"
          onClick={pagination.nextPage}
        >
          Load More...
        </Button>
      </div>
    </div>
  );
}
