import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onFilterItemsBySearch } = props;
  const [enteredSearch, setEnteredSearch] = useState('');

  const searchHandler = event => {
    setEnteredSearch(event.target.value);
  }

  useEffect(() => {
    const query = enteredSearch.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredSearch}"`;
    fetch('https://react-cookbook-e3ca4-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' + query, {
      method: 'GET',
    }).then(response => {
      if (!response.ok) {
        return;
      }
      return response.json();
    }).then(responseData => {

      const loadedIngredients = [];
      for(const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        });
      }
      props.onFilterItemsBySearch(loadedIngredients);
    });
  }, [enteredSearch, onFilterItemsBySearch])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredSearch} onChange={searchHandler}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
