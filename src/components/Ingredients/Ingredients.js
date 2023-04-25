import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredients => [
      ...prevIngredients,
      {id: Math.random().toString(), ...ingredient}
    ])
  }

  const onRemoveItem = () => {
    console.log('Remove')
    setUserIngredients((userIngredients, id) => {
      const idIndex = userIngredients.findIndex((obj) => obj.id === id);
      if (idIndex > -1) {
        userIngredients.splice(idIndex, 1);
      }
      return userIngredients
    })
  }

  return (
    <div className="App">
      <IngredientForm addIngredientHandler={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={onRemoveItem}/>
      </section>
    </div>
  );
}

export default Ingredients;
