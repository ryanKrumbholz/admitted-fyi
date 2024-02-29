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
        <div className="block max-w-sm p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {`${decision.program.name}, ${decision.program.college.name}`}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                Decision Date: {formattedDate}
            </p>
            <p className={`font-normal ${decision.status === 'ACCEPTED' ? 'text-green-600' : 'text-gray-700'} dark:text-gray-400`}>
                Status: {decision.status}
            </p>
            {decision.verificationId && (
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Verification: {decision.verification.verified ? 'Verified' : 'Pending'}
                </p>
            )}
            {decision.stats && (
                <div className="mt-4">
                    <p className="font-normal text-gray-700 dark:text-gray-400">GPA: {decision.stats.gpa}</p>
                    {decision.stats.greVerbal && (
                        <p className="font-normal text-gray-700 dark:text-gray-400">GRE Verbal: {decision.stats.greVerbal}</p>
                    )}
                    {decision.stats.greWritten && (
                        <p className="font-normal text-gray-700 dark:text-gray-400">GRE Written: {decision.stats.greWritten}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default DecisionCard;
