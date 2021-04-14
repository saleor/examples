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
    <form className='row g-3' onSubmit={onSubmit}>
      <div className='col-auto'>
        <label htmlFor='search' className='col-sm-2 col-form-label'>
          Search:
        </label>
      </div>
      <div className='col-auto'>
        <input
          id='search'
          className='form-control'
          type='text'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </div>
      <div className='col-auto'>
        <button type='submit' className='btn btn-primary mb-3'>
          Submit
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
