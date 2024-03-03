import React from "react";
import { type Decision } from "~/app/_models/Decision";

interface DecisionCardProps {
    decision: Decision;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ decision }) => {
    const formattedDate = decision.date.toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const formatGPA = (gpa: number | null): string => {
        if (gpa === null) return "N/A";
        return gpa.toFixed(2);
    };

    return (
        <div className="flex flex-col sm:flex-row min-w-full min-h-56 p-2 sm:p-3 bg-base border-l-4 dark:bg-surface dark:border-lavender justify-between mb-4 sm:mb-7">
            <div className="flex-grow">
                <h5 className="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-text dark:text-text">
                    {`${decision.program.name}, ${decision.program.college.name}`}
                </h5>
                <p className="font-normal text-xs sm:text-sm text-subtext dark:text-subtext">
                    Decision Date: {formattedDate}
                </p>
                <p className="font-normal text-xs sm:text-sm text-subtext dark:text-subtext">
                    Term: {decision.termYearString}
                </p>
                <p className={`font-normal text-xs sm:text-sm ${decision.status === 'ACCEPTED' ? 'text-green-500' : 'text-text'} dark:text-subtext`}>
                    Status: {decision.status}
                </p>
                {decision.stats && (
                    <div className="flex mt-2 sm:mt-4 gap-2">
                        <div className="bg-lavender p-1 sm:p-2 rounded text-crust">GPA: {formatGPA(decision.stats.gpa)}</div>
                        {decision.stats.residency && (
                            <div className="bg-lavender p-1 sm:p-2 rounded text-crust">Residency: {decision.stats.residency}</div>
                        )}
                    </div>
                )}
            </div>
            {decision.verificationId && decision.verification.verified && (
                <div className="flex items-center justify-center w-8 sm:w-10 rounded-full mt-2 sm:mt-auto ml-auto">
                    <p className="mr-2 text-xs sm:text-sm">Verified</p>
                    <div className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full hidden sm:flex">
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-lavender" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                            <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4"></circle>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 24l6 6 12-12"></path>
                        </svg>
                    </div>
                </div>
                
            )}
        </div>
    );
}

export default DecisionCard;
