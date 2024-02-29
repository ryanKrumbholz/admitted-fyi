"use client"

import React, { useState } from 'react';
import { TextField } from '~/app/_components/text-field';

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
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <TextField
        label="Search"
        id="search"
        name="search"
        placeholder="Enter search query..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow" // Ensures the input field takes up available space
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;