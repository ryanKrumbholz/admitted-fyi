import React, { useState, useEffect } from 'react';
import { TextField } from '~/app/_components/text-field';

interface Option {
  label: string;
  value: string | number;
}

interface SearchableDropdownProps {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  options: Option[];
  onOptionSelected: (option: Option) => void;
  onSearch: (searchTerm: string) => void;
  disabled?: boolean;
  required?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  onOptionSelected,
  onSearch,
  label,
  name,
  placeholder,
  id,
  disabled,
  required
  }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setValue(e.target.value);
    setShowOptions(true);
  };

  const handleOptionClick = (option: Option) => {
    onOptionSelected(option);
    setValue(option.label);
    setShowOptions(false);
  };

  return (
    <div>
       <TextField
        required={required}
        label={label}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => { setShowOptions(true)}}
        disabled={disabled}
        className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${disabled ? 'bg-gray-700 text-gray-500 border-gray-200' : 'border-gray-300'}`}
      />
      {showOptions && (
        <ul className="options">
          {options.map((option) => (
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
