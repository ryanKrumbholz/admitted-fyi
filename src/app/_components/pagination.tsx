import React from 'react'; // Import React
import { Button } from './button';

type PaginationProps = {
  itemCount: number;
  itemsPerPage: number;
  currentPageIndex: number;
  onPageChange: (newPage: number) => void; // New parameter for handling page changes
};

export const Pagination = ({
  itemCount,
  itemsPerPage,
  currentPageIndex,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(itemCount / itemsPerPage);

  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or less
  }

  const goToPage = (page: number) => {
    if (page >= 0 && page <= totalPages - 1) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-12">
      <Button
        onClick={() => goToPage(currentPageIndex - 1)}
        disabled={currentPageIndex === 0}
        className={`px-4 py-2 ${currentPageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Back
      </Button>
      <Button
        onClick={() => goToPage(currentPageIndex + 1)}
        disabled={currentPageIndex === totalPages}
        className={`px-4 py-2 ${currentPageIndex === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Next
      </Button>
    </div>
  );
};
