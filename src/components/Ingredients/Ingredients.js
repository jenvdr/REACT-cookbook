import React, {useState, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    fetch('https://react-cookbook-e3ca4-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'content-type': 'application/json'
      },
    }).then(response => {
      if (!response.ok) {
        return;
      }

      return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        {id: responseData.name, ...ingredient}
      ])
    });
  }

  const onRemoveItem = ingredientId => {
    setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
  }

  const onFilterItemsBySearch = useCallback((searchKey) => {
    setUserIngredients(searchKey);
  }, [] );

  return (
    <div className="App">
      <IngredientForm addIngredientHandler={addIngredientHandler}/>

      <section>
        <Search onFilterItemsBySearch={onFilterItemsBySearch}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={onRemoveItem}/>
      </section>
    </div>
  );
}

export default Ingredients;
