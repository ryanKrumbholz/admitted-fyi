"use client"

import React, { useEffect, useState } from 'react';
import { Pagination } from '../../_components/pagination';
import Filters from './_components/filter-bar';
import SearchBar from './_components/search-bar';
import { api } from '~/trpc/react'
import { type Status } from '~/app/_models/Status';

const DECISIONS_PER_PAGE = 20;

interface DecisionData {
  program : {
    name: string,
    college: {
      name: string
    }
  }
  date: Date
  status: `${Status}`
}

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState<DecisionData[]>([]);
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
  <div className="container mx-auto">
    <SearchBar onSearch={(query) => handleSearch(query)}/>
    <Filters/>
    <ul>
      {decisions.map((decision: DecisionData) => (
        <li>
          <a href="#" className="block max-w-sm p-6 bg-white  dark:bg-gray-800">

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{`${decision.program.name}, ${decision.program.college.name}`}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{decision.date.toLocaleDateString()}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">{decision.status}</p>
          </a>
        </li>
        ))} 
    </ul>
    <Pagination itemCount={20} itemsPerPage={DECISIONS_PER_PAGE} currentPageNumber={pageNumber}/>
  </div>
);
}
