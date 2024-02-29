import React, { useState, useEffect } from 'react';
import { TextField } from '~/app/_components/text-field';

interface Option {
  label: string;
  value: string | number;
}

interface SearchableDropdownProps {
  options: Option[];
  onOptionSelected: (option: Option) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options, onOptionSelected }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowOptions(true);
  };

  const handleOptionClick = (option: Option) => {
    onOptionSelected(option);
    setSearchTerm(option.label);
    setShowOptions(false);
  };

  return (
    <div>
       <TextField
        label="Search"
        id="search"
        name="search"
        placeholder="Enter search query..."
        value={searchTerm}
        onChange={handleChange}
        className="flex-grow"
        onBlur={() => setShowOptions(false)}
        onFocus={() => setShowOptions(true)}
      />
      {showOptions && (
        <ul className="options">
          {filteredOptions.map((option) => (
            <li key={option.value.toString()} onClick={() => handleOptionClick(option)} className="option">
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
