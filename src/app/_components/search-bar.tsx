"use client"

import React, { useState } from 'react';
import { TextField } from '~/app/_components/text-field';
import { Button } from './button';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex min-w-full items-center">
  <div className="flex flex-grow">
    <TextField
      label="Search"
      id="search"
      name="search"
      placeholder="Search ex. Duke, Biostatistics, ..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="min-w-full" // Make TextField as wide as its container
    />
  </div>
  <Button
    type="submit"
    className="flex items-center rounded-sm ml-1 mt-8"
  >
    Search
  </Button>
</form>

  );
};

export default SearchBar;