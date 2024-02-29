import React from "react";
import { type Decision } from "~/app/_models/Decision";

interface DecisionCardProps {
    decision: Decision
}

const DecisionCard: React.FC<DecisionCardProps> = ({decision}) => {
    return (
        <a href="#" className="block max-w-sm p-6 bg-white  dark:bg-gray-800">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{`${decision.program.name}, ${decision.program.college.name}`}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{decision.date.toLocaleDateString()}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">{decision.status}</p>
          </a>
)}

export default DecisionCard;