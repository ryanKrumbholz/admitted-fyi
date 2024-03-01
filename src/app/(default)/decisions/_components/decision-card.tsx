import React from "react";
import { type Decision } from "~/app/_models/Decision";

interface DecisionCardProps {
    decision: Decision;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ decision }) => {
    const formattedDate = decision.date.toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="flex min-w-full min-h-56 p-3 bg-base border-l-4 dark:bg-surface dark:border-lavender justify-between mb-7">
            <div className="mr-auto">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-text dark:text-text">
                    {`${decision.program.name}, ${decision.program.college.name}`}
                </h5>
                <p className="font-normal text-subtext dark:text-subtext">
                    Decision Date: {formattedDate}
                </p>
                <p className={`font-normal ${decision.status === 'ACCEPTED' ? 'text-green' : 'text-subtext'} dark:text-subtext`}>
                    Status: {decision.status}
                </p>
                {decision.stats && (
                    <div className="flex mt-4 gap-2">
                        <div className="bg-lavender p-2 rounded text-crust">GPA: {decision.stats.gpa}</div>
                        {decision.stats.greVerbal && (
                            <div className="bg-lavender p-2 rounded text-crust">GRE Verbal: {decision.stats.greVerbal}</div>
                        )}
                        {decision.stats.greWritten && (
                            <div className="bg-lavender p-2 rounded text-crust">GRE Written: {decision.stats.greWritten}</div>
                        )}
                    </div>
                )}
            </div>
            {decision.verificationId && decision.verification.verified && (
                <div className="flex items-center justify-center w-10 rounded-full mt-auto">
                <p className="mr-2">verified</p>
                <div className="flex items-center justify-center w-10 h-10 rounded-full">
                    <svg className="w-8 h-8 text-lavender" fill="none" viewBox="0 0 48 48" stroke="currentColor">
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
