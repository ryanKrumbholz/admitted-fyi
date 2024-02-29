"use client"

import React, { useState, useEffect } from 'react';

const Filters = ( ) => {
  const [programs, setPrograms] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState([]);

  const [filters, setFilters] = useState({
    programId: '',
    collegeId: '',
    status: '',
    verified: '',
    startDate: '',
    endDate: '',
  });

//   useEffect(() => {
//     // Load filter options on component mount
//     const loadFilters = async () => {
//     //   setPrograms(await fetchPrograms());
//     //   setColleges(await fetchColleges());
//     //   setStatuses(await fetchStatuses());
//     //   setVerificationStatus(['Verified', 'Not Verified']); // Simplified for this example
//     };

//     loadFilters();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//     onFilterChange({ ...filters, [name]: value }); // Trigger the callback function to update the parent component's state or perform filtering
//   };

  return (
    <div>
      {/* <select name="programId" onChange={handleChange} value={filters.programId}>
        <option value="">Select Program</option>
        {programs.map(program => <option key={program.id} value={program.id}>{program.name}</option>)}
      </select>

      <select name="collegeId" onChange={handleChange} value={filters.collegeId}>
        <option value="">Select College</option>
        {colleges.map(college => <option key={college.id} value={college.id}>{college.name}</option>)}
      </select>

      <select name="status" onChange={handleChange} value={filters.status}>
        <option value="">Select Status</option>
        {statuses.map(status => <option key={status} value={status}>{status}</option>)}
      </select>

      <select name="verified" onChange={handleChange} value={filters.verified}>
        <option value="">Verification Status</option>
        {verificationStatus.map((status, index) => <option key={index} value={status === 'Verified'}>{status}</option>)}
      </select>

      <input type="date" name="startDate" onChange={handleChange} value={filters.startDate} />
      <input type="date" name="endDate" onChange={handleChange} value={filters.endDate} /> */}
    </div>
  );
};

export default Filters;
