import { Dispatch, SetStateAction, useState } from 'react';

type SearchBarProps = {
  setKeyword: Dispatch<SetStateAction<string>>;
};

function SearchBar({ setKeyword }: SearchBarProps) {
  const [value, setValue] = useState('');

  function onSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();

    setKeyword(value);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Search:
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
}

export default SearchBar;
