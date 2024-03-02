import React from 'react';

const DecisionCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col max-w-full p-3 bg-base border-l-4 dark:bg-surface dark:border-lavender justify-between mb-7">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-300 rounded-md mb-4 w-3/4"></div>
      
      {/* Date Skeleton */}
      <div className="h-4 bg-gray-300 rounded-md mb-2 w-1/2"></div>
      
      {/* Status Skeleton */}
      <div className="h-4 bg-gray-300 rounded-md mb-4 w-1/3"></div>
      
      {/* Stats Skeleton */}
      <div className="flex mt-4 gap-2">
        <div className="bg-gray-300 p-2 rounded w-24"></div>
        <div className="bg-gray-300 p-2 rounded w-24"></div>
        <div className="bg-gray-300 p-2 rounded w-24"></div>
      </div>
      
      {/* Verification Icon Skeleton */}
      <div className="mt-auto self-end h-10 w-10 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export default DecisionCardSkeleton;
