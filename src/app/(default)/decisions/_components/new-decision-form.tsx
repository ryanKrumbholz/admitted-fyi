"use client"

import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
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
import { Button } from '~/app/_components/button';
import DatePicker from '~/app/_components/date-picker';
import { Term } from '~/app/_models/Term';
import { Residency } from '~/app/_models/Residency';
import { type NewProgramInput } from '../../../../server/model/new-program-input';

const ADD_PROGRAM_OPTION = "Add Program";
const NEW_PROGRAM_OPTION = {label: ADD_PROGRAM_OPTION, value: -1}

const NewDecisionForm: React.FC = () => {
  const [addProgramForm, setAddProgramForm] = useState({
    name: undefined,
    department: undefined,
    url: undefined
  })
  const [formState, setFormState] = useState({
    programId: 0,
    collegeId: 0,
    status: undefined,
    gpa: undefined,
    residency: undefined,
    statsDegreeType: undefined,
    verified: false,
    imgUrl: '',
    date: new Date(),
    term: undefined
  });
  const [programDegreeType, setProgramDegreeType] = useState<DegreeType>();
  const [selectedCollgeId, setSelectedCollegeId] = useState<number>(0);
  const [programSearch, setProgramSearch] = useState('');
  const [collegeSearch, setCollegeSearch] = useState('');
  const [programs, setPrograms] = useState([NEW_PROGRAM_OPTION]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addProgramOptionSelected, setAddProgramOptionSelected] = useState(false);

  const router = useRouter();

  const addDecisionMutation = api.decision.add.useMutation();

  const { data: programData } = api.program.list.useQuery({ searchString: programSearch, collegeId: selectedCollgeId, degreeType: programDegreeType ?? DegreeType.BA}, { enabled: !!programSearch });
  const { data: collegeData } = api.college.list.useQuery({ searchString: collegeSearch }, { enabled: !!collegeSearch });

  useEffect(() => {
    if (programData?.programs) {
      const newProgramOptions = programData.programs.map(p => ({ label: p.name, value: p.id }));
      newProgramOptions.push(NEW_PROGRAM_OPTION);
      setPrograms(newProgramOptions);
    }
  }, [programData]);

  useEffect(() => {
    if (collegeData) {
      setColleges(collegeData.colleges);
    }
  }, [collegeData]);

  const handleProgramSelected = (option: { label: string; value: string | number }) => {
    if (option.label === ADD_PROGRAM_OPTION) {
      setAddProgramOptionSelected(true);
    } else {
      setAddProgramOptionSelected(false);
    }
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
    if (!isNaN(+value)) {
      setFormState(prevState => ({ ...prevState, [name]: Number(value) }));
    } else {
      setFormState(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleNewProgramChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddProgramForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.programId && formState.status && formState.collegeId && formState.term) {
        try {
            setIsSubmitting(true);
            const verificationInput: VerificationInput = {
              verified: formState.verified,
              imgUrl: formState.imgUrl,
          };
  
          const statsInput: StatsInput = {
              gpa: formState.gpa,
              residency: formState.residency,
              degreeType: formState.statsDegreeType,
          };

          const newProgramInput: NewProgramInput | undefined = (programDegreeType && addProgramForm.name && addProgramForm.url) ?
          {
            url: addProgramForm.url,
            name: addProgramForm.name,
            degreeType: programDegreeType,
            department: addProgramForm.department
          } : undefined;

            const decisionInput: DecisionInput = {
                statsInput: statsInput,
                verificationInput: verificationInput,
                newProgramInput: newProgramInput,
                programId: formState.programId,
                status: formState.status,
                collegeId: formState.collegeId,
                date: formState.date,
                term: formState.term
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

const handleDateChange = (date: Date | null) => {
  if (date) {
  setFormState(prev => ({
    ...prev,
    date: date
  }));
}
};

  const handleProgramSearchChange = debounce(setProgramSearch, 300);
  const handleCollegeSearchChange = debounce(setCollegeSearch, 300);

  return (
   <form onSubmit={handleSubmit} className="container max-w-full space-y-4 bg-base text-mantle rounded-lg p-4">
   <SearchableDropdown
     label='Institution'
     placeholder='Begin typing and select an institution...'
     id='institution-dropdown'
     name='institution'
     options={collegeData?.colleges.map(c => ({ label: c.name, value: c.id })) ?? []}
     onOptionSelected={handleCollegeSelected}
     onSearch={handleCollegeSearchChange}
   />
 
   <div>
     <label htmlFor="degreeType" className="block font-bold text-white">Degree</label>
     <select
       required={true}
       id="degree"
       name="programDegreeType"
       value={programDegreeType}
       onChange={(e) => setProgramDegreeType(e.target.value as DegreeType)}
       className='block w-full py-1 bg-surface border-mantle rounded-md p-2 focus:ring-lavender focus:outline-none'
       defaultValue={""}
     >
      <option value="" selected disabled hidden>Select degree type</option>
       {Object.values(DegreeType).filter(degreeType => degreeType !== DegreeType.BA && degreeType !== DegreeType.BS).map(degreeType => (
         <option key={degreeType} value={degreeType}>{degreeType}</option>
       ))}
     </select>
   </div>
 
   <SearchableDropdown
     required={true}
     label='Program'
     placeholder='Begin typing and select a program...'
     id='program-dropdown'
     name='program'
     options={programs}
     onOptionSelected={handleProgramSelected}
     onSearch={handleProgramSearchChange}
     disabled={!selectedCollgeId || !programDegreeType}
   />

  {addProgramOptionSelected ? 
    <div className='mb-4 space-y-4'>
      <TextField
        required={addProgramOptionSelected}
        label='Program Name'
        id="programName"
        name="name"
        placeholder='Creative Writing and Screenwriting'
        value={addProgramForm.name}
        onChange={handleNewProgramChange}
        className="w-full py-1 bg-surface border-mantle rounded-md p-2 focus:ring-lavender focus:outline-none"
      />
      <TextField
        required={addProgramOptionSelected}
        label='Program URL'
        id="programUrl"
        name="url"
        placeholder='www.uw.edu/creative-writing'
        value={addProgramForm.url}
        onChange={handleNewProgramChange}
        className="w-full py-1 bg-surface border-mantle rounded-md p-2 focus:ring-lavender focus:outline-none"
      />

    <TextField
        label='Department (optional)'
        id="programDepartment"
        name="department"
        placeholder='www.uw.edu/creative-writing'
        value={addProgramForm.department}
        onChange={handleNewProgramChange}
        className="w-full py-1 bg-surface border-mantle rounded-md p-2 focus:ring-lavender focus:outline-none"
      />
    </div> : <></>
  }

  <div>
     <label htmlFor="term" className="block font-bold text-white">Term</label>
     <select
       required={true}
       id="term"
       name="term"
       value={formState.term}
       onChange={handleChange}
       className='block w-full py-1 bg-surface border-mantle rounded-md  p-2 focus:ring-lavender focus:outline-none'
     >
      <option value="" selected disabled hidden>Select status</option>
       {Object.values(Term).map(term => (
         <option key={term} value={term}>{term}</option>
       ))}
     </select>
   </div>
 
   <div>
     <label htmlFor="status" className="block font-bold text-white">Status</label>
     <select
       required={true}
       id="status"
       name="status"
       value={formState.status}
       onChange={handleChange}
       className='block w-full py-1 bg-surface border-mantle rounded-md  p-2 focus:ring-lavender focus:outline-none'
     >
      <option value="" selected disabled hidden>Select status</option>
       {Object.values(Status).map(status => (
         <option key={status} value={status}>{status}</option>
       ))}
     </select>
   </div>

   <DatePicker onChange={handleDateChange}/>
 
   <TextField
     required={true}
     label='GPA (4.0 scale)'
     type="number"
     step="0.01"
     max="4.0"
     id="gpa"
     name="gpa"
     placeholder='ex. 4.0'
     value={formState.gpa}
     onChange={handleChange}
     className="w-full py-1 bg-surface border-mantle rounded-md p-2 focus:ring-lavender focus:outline-none"
   />

<div>
     <label htmlFor="residency" className="block font-bold text-white">Residency Status (Optional)</label>
     <select
       id="residency"
       name="residency"
       value={formState.residency}
       onChange={handleChange}

       className='block w-full py-1 bg-surface border-mantle rounded-md p-2 focus:ring-lavender focus:outline-none'
     >
      <option value="" selected disabled hidden>Select degree type</option>
       {Object.values(Residency).map(residency => (
         <option key={residency} value={residency}>{residency}</option>
       ))}
     </select>
   </div>

  <div>
     <label htmlFor="statsDegreeType" className="block font-bold text-white">Degree Held (Optional)</label>
     <select
       id="statsDegreeType"
       name="stat"
       value={formState.statsDegreeType}
       onChange={handleChange}

       className='block w-full py-1 bg-surface border-mantle rounded-md p-2 focus:ring-lavender focus:outline-none'
     >
      <option value="" selected disabled hidden>Select degree type</option>
       {Object.values(DegreeType).filter(degreeType => degreeType !== DegreeType.BA && degreeType !== DegreeType.BS).map(degreeType => (
         <option key={degreeType} value={degreeType}>{degreeType}</option>
       ))}
     </select>
   </div>

 
   <Button type="submit" disabled={isSubmitting}>
     Submit Decision
   </Button>
 </form>
 
  );
};

export default NewDecisionForm;
