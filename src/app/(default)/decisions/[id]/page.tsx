'use client'
import React from 'react';
import { api } from '~/trpc/react';
import DecisionCard from '../_components/decision-card';
import DecisionCardSkeleton from '../_components/skeleton-card';
import { usePathname, useRouter } from 'next/navigation';


export default function DecisionsPage() {
    const path = usePathname();
    const id: string = path.split("/")[2] ?? "";
    const router = useRouter();

  const { data, isLoading, isError } = api.decision.get.useQuery(id, {
    keepPreviousData: true,
  });

  if (id.length == 0 || isError) {
    router.push("/decisions")
}

  return (
    <div className="container max-w-2xl w-full mx-auto flex flex-col items-center gap-y-4">
      {!isLoading && data ? <DecisionCard decision={data}/> : <DecisionCardSkeleton/>} 
    </div>
  );
}
