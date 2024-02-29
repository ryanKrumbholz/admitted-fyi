"use client"

import React, { useState, useEffect } from 'react';
import { Status } from '~/app/_models/Status';
import { DegreeType } from '~/app/_models/DegreeType';
import { api } from '~/trpc/react';
import { type Program } from '~/app/_models/Program';
import { TextField } from '~/app/_components/text-field';
import SearchableDropdown from './searchable-dropdown';
import ImageUpload from '~/app/_components/image-upload';
import { genHeadlessUserId } from '~/app/_util/user';
import { type College } from '~/app/_models/College';
import { getSession } from 'next-auth/react';

interface DecisionInput {
    programId: number;
    status: Status;
    collegeId: number;
    verificationId: string;
    userId: string;
    statsId: string;
}

interface StatsInput {
    gpa?: number;
    greVerbal?: number;
    greWritten?: number;
    degreeType?: DegreeType;
}

interface VerificationInput {
    verified: boolean;
    imgUrl: string;
}

const NewDecisionForm: React.FC = () => {
  const [formState, setFormState] = useState({
    programId: 0,
    collegeId: 0,
    status: undefined,
    gpa: '',
    greVerbal: '',
    greWritten: '',
    statsDegreeType: undefined,
    verified: false,
    imgUrl: '',
  });
  const [programDegreeType, setProgramDegreeType] = useState<string>();
  const [selectedCollgeId, setSelectedCollegeId] = useState<number>();
  const [programSearch, setProgramSearch] = useState('');
  const [collegeSearch, setCollegeSearch] = useState('');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);

  const addDecisionMutation = api.decision.add.useMutation({
    onSuccess: () => {
        console.log("Decision added successfully");
    },
  });

  const { data: programData } = api.program.list.useQuery({ searchString: programSearch, collegeId: selectedCollgeId, degreeType: programDegreeType}, { enabled: !!programSearch });
  const { data: collegeData } = api.college.list.useQuery({ searchString: collegeSearch }, { enabled: !!collegeSearch });

  useEffect(() => {
    if (programData) {
      setPrograms(programData.programs);
    }
  }, [programData]);

  useEffect(() => {
    if (collegeData) {
      setColleges(collegeData.colleges);
    }
  }, [collegeData]);

  const handleProgramSelected = (option: { label: string; value: string | number }) => {
    setFormState(prev => ({
      ...prev,
      programId: Number(option.value),
    }));
  };

  const handleCollegeSelected = (option: { label: string; value: string | number }) => {
    setSelectedCollegeId(Number(option.value));
    setFormState(prev => ({
      ...prev,
      collegeId: Number(option.value),
    }));
  };

  const handleImageUploadSuccess = (imgUrl: string) => {
    setFormState(prev => ({
      ...prev,
      imgUrl,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.programId && formState.status && formState.collegeId) {
        const verificationInput: VerificationInput = {
            verified: formState.verified,
            imgUrl: formState.imgUrl,
        };

        const statsInput: StatsInput = {
          gpa: parseFloat(formState.gpa),
          greVerbal: parseInt(formState.greVerbal, 10),
          greWritten: parseInt(formState.greWritten, 10),
          degreeType: formState.statsDegreeType,
      };

        try {

            const addVerificationMutation = api.verificationRouter.add.useMutation();
            const addStatsMutation = api.statsRouter.add.useMutation();

            const session = await getSession();

            const statsId = addStatsMutation.mutate(statsInput);
            const verificationId = addVerificationMutation.mutate(verificationInput);
            const userId = session?.user ? session.user.id : genHeadlessUserId();

            const decisionInput: DecisionInput = {
                userId: userId,
                statsId: "statsId",
                verificationId: "verificationId",
                programId: formState.programId,
                status: formState.status,
                collegeId: formState.collegeId,
            };

            addDecisionMutation.mutate(decisionInput);
        } catch (error) {
            console.error("Error creating decision-related records", error);
        }
    }
  };

  const handleProgramSearchChange = (searchTerm: string) => { setProgramSearch(searchTerm); };
  const handleCollegeSearchChange = (searchTerm: string) => { setCollegeSearch(searchTerm); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SearchableDropdown
        label='Institution'
        placeholder=''
        id=''
        name=''
        options={collegeData?.colleges.map(c => {return {label: c.name, value: c.id}}) ?? []}
        onOptionSelected={handleCollegeSelected}
        onSearch={handleCollegeSearchChange}

        />

      <div>
        <label htmlFor="degreeType" className="block  font-bold">Degree</label>
        <select
          id="degree"
          name="programDegreeType"
          value={programDegreeType}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { value } = e.target;
            setProgramDegreeType(value);
          }}
          className='block w-full py-1 bg-secondary focus-ring border border-gray-300 rounded-md shadow-sm p-2'
        >
          {Object.values(DegreeType).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <SearchableDropdown
        label='Program'
        placeholder=''
        id=''
        name=''
        options={programData?.programs.map(p => {return {label: p.name, value: p.id}}) ?? []}
        onOptionSelected={handleProgramSelected}
        onSearch={handleProgramSearchChange}
      />

      <div>
        <label htmlFor="status" className="block  font-bold">Status</label>
        <select
          id="status"
          name="status"
          value={formState.status}
          onChange={handleChange}
          className='block w-full py-1 bg-secondary focus-ring border border-gray-300 rounded-md shadow-sm p-2'
        >
          {Object.values(Status).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

        <TextField
          label='GPA (4.0)'
          type="number"
          step="0.01"
          id="gpa"
          name="gpa"
          value={formState.gpa}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />


        <TextField
          label='GRE Verbal'
          type="number"
          id="greVerbal"
          name="greVerbal"
          value={formState.greVerbal}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />

        <TextField
          label='GRE Written'
          type="number"
          id="greWritten"
          name="greWritten"
          value={formState.greWritten}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />

      <div>
        <label htmlFor="degreeType" className="block  font-bold">Degree</label>
        <select
          id="statsDegreeType"
          name="statsDegreeType"
          value={formState.statsDegreeType}
          onChange={handleChange}
          className='block w-full py-1 bg-secondary focus-ring border border-gray-300 rounded-md shadow-sm p-2'
        >
          {Object.values(DegreeType).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <ImageUpload onSuccess={handleImageUploadSuccess} />

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
        Add Decision
      </button>
    </form>
  );
};

export default NewDecisionForm;
