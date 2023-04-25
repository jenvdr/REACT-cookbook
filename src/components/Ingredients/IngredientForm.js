import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [inputState, setInputState ] = useState({title: '', amount: ''});

  const inputChangeHandler = event => {
    if (event.target.id === "title") {
      setInputState({...inputState, title: event.target.value})
    } else {
      setInputState({...inputState, amount: event.target.value})
    }
  }

  const onSubmitHandler = event => {
    event.preventDefault();
    props.addIngredientHandler(inputState);
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={onSubmitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputState.title} onChange={inputChangeHandler}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputState.amount} onChange={inputChangeHandler} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
