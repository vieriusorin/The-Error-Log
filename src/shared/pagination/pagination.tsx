import { useState, useEffect } from "react";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const [page, setPage] = useState(currentPage || 1);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState({}, "", url);

    return () => {
      url.searchParams.delete("page");
      window.history.pushState({}, "", url);
    };
  }, [page]);

  return (
    <nav className="pagination">
      {page > 1 && (
        <button onClick={() => setPage(page - 1)} className="pagination-prev">
          Previous
        </button>
      )}

      <span>
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <button onClick={() => setPage(page + 1)} className="pagination-next">
          Next
        </button>
      )}
    </nav>
  );
}
