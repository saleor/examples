import { useState } from 'react';
import Products from './Products';
import SearchBar from './SearchBar';

function App() {
  const [keyword, setKeyword] = useState('');

  return (
    <div>
      <header>
        <h1>Saleor React Application</h1>
      </header>
      <SearchBar setKeyword={setKeyword} />
      <Products keyword={keyword} />
    </div>
  );
}

export default App;
