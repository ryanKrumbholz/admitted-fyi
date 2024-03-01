"use client"

import React, { useState, useEffect } from 'react';
import { Status } from '~/app/_models/Status';
import { DegreeType } from '~/app/_models/DegreeType';
import { api } from '~/trpc/react';
import { type Program } from '~/app/_models/Program';
import { TextField } from '~/app/_components/text-field';
import SearchableDropdown from './searchable-dropdown';
import ImageUpload from '~/app/_components/image-upload';
import { type College } from '~/app/_models/College';
import { useRouter } from 'next/navigation';
import { type VerificationInput } from '~/server/model/verification-input';
import { type StatsInput } from '~/server/model/stats-input';
import { type DecisionInput } from '~/server/model/decision-input';

const NewDecisionForm: React.FC = () => {
  const [formState, setFormState] = useState({
    programId: 0,
    collegeId: 0,
    status: undefined,
    gpa: undefined,
    greVerbal: undefined,
    greWritten: undefined,
    statsDegreeType: undefined,
    verified: false,
    imgUrl: '',
  });
  const [programDegreeType, setProgramDegreeType] = useState<DegreeType>(DegreeType.BA);
  const [selectedCollgeId, setSelectedCollegeId] = useState<number>(0);
  const [programSearch, setProgramSearch] = useState('');
  const [collegeSearch, setCollegeSearch] = useState('');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const addDecisionMutation = api.decision.add.useMutation();

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
        try {
            setIsSubmitting(true);
            const verificationInput: VerificationInput = {
              verified: formState.verified,
              imgUrl: formState.imgUrl,
          };
  
          const statsInput: StatsInput = {
              gpa: formState.gpa,
              greVerbal: formState.greVerbal,
              greWritten: formState.greWritten,
              degreeType: formState.statsDegreeType,
          };

            const decisionInput: DecisionInput = {
                statsInput: statsInput,
                verificationInput: verificationInput,
                programId: formState.programId,
                status: formState.status,
                collegeId: formState.collegeId,
            };

            await addDecisionMutation.mutateAsync(decisionInput, {
              onSuccess: (data) => {
                router.push(data.redirectUrl);
              }
            });
        } catch (error) {
            console.error("An error occurred", error);
            setIsSubmitting(false);
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
          required={true}
          id="degree"
          name="programDegreeType"
          value={programDegreeType}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { value } = e.target;
            setProgramDegreeType(value as DegreeType);
          }}
          className='block w-full py-1 bg-secondary focus-ring border border-gray-300 rounded-md shadow-sm p-2'
        >
          {Object.values(DegreeType).filter(degreeType => degreeType !== DegreeType.BA && degreeType !== DegreeType.BS).map(degreeType => (
            <option key={degreeType} value={degreeType}>{degreeType}</option>
          ))}
        </select>
      </div>

      <SearchableDropdown
        required={true}
        label='Program'
        placeholder=''
        id=''
        name=''
        options={programData?.programs.map(p => {return {label: p.name, value: p.id}}) ?? []}
        onOptionSelected={handleProgramSelected}
        onSearch={handleProgramSearchChange}
        disabled={!selectedCollgeId || !programDegreeType}
      />

      <div>
        <label htmlFor="status" className="block  font-bold">Status</label>
        <select
          required={true}
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
          required={true}
          label='GPA (4.0 scale)'
          type="number"
          step="0.01"
          max="4.0"
          id="gpa"
          name="gpa"
          value={formState.gpa}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />


        <TextField
          label='GRE Verbal (optional)'
          type="number"
          id="greVerbal"
          name="greVerbal"
          min="130"
          max="170"
          value={formState.greVerbal}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />

        <TextField
          label='GRE Written (optional)'
          type="number"
          id="greWritten"
          name="greWritten"
          min="0"
          max="6"
          step="0.5"
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

      {/* <ImageUpload onSuccess={handleImageUploadSuccess} /> */}

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700" disabled={isSubmitting}>
        Add Decision
      </button>
    </form>
  );
};

export default NewDecisionForm;
