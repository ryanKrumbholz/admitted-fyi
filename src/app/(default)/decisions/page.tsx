'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { Pagination } from '../../_components/pagination';
import Filters from './_components/filter-bar';
import { api } from '~/trpc/react';
import { type Decision } from '~/app/_models/Decision';
import DecisionCard from './_components/decision-card';
import SearchBar from '~/app/_components/search-bar';
import { debounce } from 'lodash'; // Assuming lodash is installed for debouncing
import DecisionCardSkeleton from './_components/skeleton-card';
import Head from 'next/head';

const DECISIONS_PER_PAGE = 8;

export default function DecisionsPage() {
  const [pageIndex, setPageIndex] = useState(0);
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
    skip: pageIndex * DECISIONS_PER_PAGE,
    searchString: debouncedSearchQuery,
  }, {
    keepPreviousData: true,
  });

  const handleSearch = useCallback((query: string) => {
    setPageIndex(0); // Reset pagination on new search
    setSearchQuery(query);
  }, []);

  return (
    <>
    <Head>
        <title>Decisions - Admitted.fyi</title>
        <meta name="description" content="Decisions for Admitted.fyi" />
  </Head>

    <main className="container max-w-4xl mx-auto flex flex-col items-center gap-y-4">
      <div className='container max-w-2xl mb-8'>
        <SearchBar onSearch={handleSearch}/>
        <Filters/>
      </div>
      <ul className='w-full max-w-2xl'>
      {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className='w-full'>
              <DecisionCardSkeleton/>
            </li>
          ))
        ) : (
          data?.decisions.map((decision) => (
            <li key={decision.id} className='w-full'>
              <DecisionCard decision={decision}/>
            </li>
          ))
        )} 
      </ul>
      <Pagination itemCount={data?.decisionCount ?? 0} itemsPerPage={DECISIONS_PER_PAGE} currentPageIndex={pageIndex} onPageChange={setPageIndex}/>
    </main>
    </>
  );
}
