'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { Pagination } from '../../_components/pagination';
import Filters from './_components/filter-bar';
import { api } from '~/trpc/react';
import { type Decision } from '~/app/_models/Decision';
import DecisionCard from './_components/decision-card';
import SearchBar from '~/app/_components/search-bar';
import { debounce } from 'lodash'; // Assuming lodash is installed for debouncing

const DECISIONS_PER_PAGE = 20;

export default function DecisionsPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce searchQuery updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Adjust debounce time as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetching decisions
  const { data, isLoading, isError } = api.decision.feed.useQuery({
    take: DECISIONS_PER_PAGE,
    skip: pageNumber * DECISIONS_PER_PAGE,
    searchString: debouncedSearchQuery,
  }, {
    keepPreviousData: true,
  });

  const handleSearch = useCallback((query: string) => {
    setPageNumber(0); // Reset pagination on new search
    setSearchQuery(query);
  }, []);

  return (
    <div className="container max-w-4xl mx-auto flex flex-col items-center gap-y-4">
      <div className='container max-w-2xl mb-8'>
        <SearchBar onSearch={handleSearch}/>
        <Filters/>
      </div>
      <ul className='w-full max-w-2xl'>
        {data?.decisions.map((decision) => (
          <li key={decision.id} className='w-fill'>
            <DecisionCard decision={decision}/>
          </li>
        ))} 
      </ul>
      {data && (
        <Pagination 
          itemCount={data.decisionCount} // Assuming your API returns the total count
          itemsPerPage={DECISIONS_PER_PAGE} 
          currentPageNumber={pageNumber}
          onPageChange={setPageNumber} // Assuming Pagination component accepts onPageChange prop
        />
      )}
    </div>
  );
}
