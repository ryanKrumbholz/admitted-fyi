"use client"

import React, { useState, useEffect } from 'react';
import { Status } from '~/app/_models/Status';
import { api } from '~/trpc/react'
import SearchBar from './search-bar';
import { DegreeType } from '~/app/_models/DegreeType';
import SearchableDropdown from './searchable-dropdown';

interface DecisionInput {
    programId: number
    collegeId: number
    status: Status
    verificationId: number
    userId: string
}

const NewDecisionForm: React.FC = () => {
  const [formState, setFormState] = useState({
    programId: undefined,
    status: undefined,
    collegeId: undefined,
  });
  const [programs, setPrograms] = useState<{ id: number; collegeId: number; name: string; degreeType: string; department: string; }[]>([]);

  const addDecisionMutation = api.decision.add.useMutation({
    onSuccess: () => {
        console.log("done");
    },
  });

  const { data: programData } = api.program.list.useQuery({});

  useEffect(() => {
    if (programData) {
      setPrograms(programData.programs);
    }
  }, [programData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.programId && formState.status && formState.collegeId) {
        const input: DecisionInput = {
            userId: "1234",
            verificationId: 1234,
            programId: formState.programId,
            status: formState.status,
            collegeId: formState.collegeId
          };
        addDecisionMutation.mutate(input);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        {/* <SearchableDropdown options={programs} onOptionSelected={handleProgramChange} /> */}
        <select name="program" value={formState.status} onChange={handleChange}>
            {Object.values(DegreeType).map(degreeType => (
            <option key={degreeType} value={degreeType}>{degreeType}</option>
            ))}
        </select>
        <select name="status" value={formState.status} onChange={handleChange}>
            {Object.values(Status).map(status => (
            <option key={status} value={status}>{status}</option>
            ))}
        </select>
        <button type="submit">Add Decision</button>
    </form>
  );
};

export default NewDecisionForm;
