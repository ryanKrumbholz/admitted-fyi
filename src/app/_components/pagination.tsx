import React from 'react'; // Import React

type PaginationProps = {
  itemCount: number;
  itemsPerPage: number;
  currentPageNumber: number;
  onPageChange: (newPage: number) => void; // New parameter for handling page changes
};

export const Pagination = ({
  itemCount,
  itemsPerPage,
  currentPageNumber,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(itemCount / itemsPerPage);

  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or less
  }

  const goToPage = (page: number) => {
    // Prevent going to a page outside of valid range
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-12">
      <button
        onClick={() => goToPage(currentPageNumber - 1)}
        disabled={currentPageNumber === 1}
        className={`px-4 py-2 border rounded-md ${currentPageNumber === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
      >
        Newer posts
      </button>
      <button
        onClick={() => goToPage(currentPageNumber + 1)}
        disabled={currentPageNumber === totalPages}
        className={`px-4 py-2 border rounded-md ${currentPageNumber === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
      >
        Older posts
      </button>
    </div>
  );
};
