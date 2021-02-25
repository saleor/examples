import { useState } from 'react';
import Products from './Products';
import SearchBar from './SearchBar';

function App() {
  const [keyword, setKeyword] = useState('');

  return (
    <div className='container'>
      <div className='row'>
        <header className='navbar navbar-light bg-light'>
          <div className='container-fluid'>
            <h1 className='navbar-brand'>Saleor React Application</h1>
          </div>
        </header>
      </div>
      <div className='row'>
        <SearchBar setKeyword={setKeyword} />
      </div>
      <div className='row'>
        <Products keyword={keyword} />
      </div>
    </div>
  );
}

export default App;
