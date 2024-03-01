"use client"

import React, { useEffect, useState } from 'react';
import { Pagination } from '../../_components/pagination';
import Filters from './_components/filter-bar';
import { api } from '~/trpc/react'
import { type Decision } from '~/app/_models/Decision';
import DecisionCard from './_components/decision-card';
import SearchBar from '~/app/_components/search-bar';

const DECISIONS_PER_PAGE = 20;

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError } = api.decision.feed.useQuery({
    take: DECISIONS_PER_PAGE,
    skip: pageNumber * DECISIONS_PER_PAGE,
    searchString: searchQuery, // This will trigger a refetch whenever searchQuery changes
  }, {
    keepPreviousData: true, // Optional: This can help with pagination
  });

  useEffect(() => {
    if (data?.decisions) {
      setDecisions(data.decisions);
      setPageNumber(0);
    }
  }, [data?.decisions]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // You don't need to directly call the API here; updating searchQuery will trigger the useQuery refetch
  };

  return (
    <div className="container max-w-4xl mx-auto flex flex-col items-center gap-y-4">
      <div className='container max-w-2xl mb-8'>
        <SearchBar onSearch={(query) => handleSearch(query)}/>
        <Filters/>
      </div>
    <ul>
      {decisions.map((decision: Decision) => (
        <li>
          <DecisionCard decision={decision}/>
        </li>
        ))} 
    </ul>
    <Pagination itemCount={20} itemsPerPage={DECISIONS_PER_PAGE} currentPageNumber={pageNumber}/>
  </div>
);
}
