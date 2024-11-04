import { useState } from 'react';

export default function usePagination(defaultPage = 0, defaultPageSize = 25) {
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  function nextPage() {
    setPage(page + 1);
  }

  function previousPage() {
    setPage(page - 1);
  }

  return { page, setPage, pageSize, setPageSize, nextPage, previousPage };
}
