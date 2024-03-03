'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Filters from './_components/filter-bar';
import { api } from '~/trpc/react';
import DecisionCard from './_components/decision-card';
import SearchBar from '~/app/_components/search-bar';
import DecisionCardSkeleton from './_components/skeleton-card';
import Head from 'next/head';
import { type Decision } from '~/app/_models/Decision';

const DECISIONS_PER_PAGE = 5;

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPageNumber(0);
      setDecisions([]);
      setHasMore(true);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  api.decision.feed.useQuery({
    take: DECISIONS_PER_PAGE,
    skip: pageNumber * DECISIONS_PER_PAGE,
    searchString: debouncedSearchQuery,
  }, {
    onSuccess: (data) => {
      setDecisions((prevDecisions) => [...new Set([...prevDecisions, ...data.decisions])]);
      setLoading(false);

      if (data.decisions.length < DECISIONS_PER_PAGE) {
        setHasMore(false);
      }
    }
  });

  const observer = useRef(
    new IntersectionObserver(entries => {
      const first = entries[0];
      if (first && first.isIntersecting && hasMore) {
        setPageNumber((n) => n + 1);
      }
    }, { threshold: 1 })
  );

  useEffect(() => {
    const currentElement = loadMoreRef.current;
    const currentObserver = observer.current;

    if (currentElement && hasMore) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [hasMore]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <>
      <Head>
        <title>Decisions - Admitted.fyi</title>
        <meta name="description" content="Explore admissions decisions shared by others." />
      </Head>

      <main className="container max-w-4xl mx-auto flex flex-col items-center gap-y-4">
        <div className='container max-w-2xl mb-8'>
          <SearchBar onSearch={handleSearch}/>
          <Filters/>
        </div>
        <ul className='w-full max-w-2xl'>
          {decisions.map((decision, index) => (
            <li key={index} className='w-full'>
              <DecisionCard decision={decision}/>
            </li>
          ))}
          {loading && Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className='w-full'>
              <DecisionCardSkeleton/>
            </li>
          ))}
        </ul>
        <div ref={loadMoreRef} className="w-full text-center py-4">
          {loading && "Loading more..."}
        </div>
      </main>
    </>
  );
}
