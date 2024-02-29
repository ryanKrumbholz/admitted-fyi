"use client"

import React, { useState } from 'react';
import { Pagination } from '../../_components/pagination';
import Filters from './_components/filter-bar';
import SearchBar from './_components/search-bar';
import { api } from '~/trpc/react'

const DECISIONS_PER_PAGE = 20;

interface DecisionData {
  program : {
    name: string,
    college: {
      name: string
    }
  }
  date: Date
}

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const handleSearch = async (query: string) => {
    const res = api.decision.feed.useQuery({searchString: query});
    if (res.data?.decisions) {
      setDecisions(decisions);
      setPageNumber(pageNumber+1);
    }
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
            <p className="font-normal text-gray-700 dark:text-gray-400">{decision.date.getDate()}</p>
          </a>
        </li>
        ))} 
    </ul>
    <Pagination itemCount={20} itemsPerPage={DECISIONS_PER_PAGE} currentPageNumber={pageNumber}/>
  </div>
);
}
