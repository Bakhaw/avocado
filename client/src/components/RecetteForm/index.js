import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import RecetteFormTemplate from './RecetteFormTemplate';
import { withContext } from '../../Context/AppStateProvider';

const RecetteForm = ({ contextActions, contextState, handleFormSubmit }) => {
  // TODO, make this Component working with <UpdateRecetteForm /> Component
  const { recetteForm } = contextState;
  const { handleRecetteFormInputChange } = contextActions;

  return (
    <div className='create-recette-container'>
      <form className='create-recette-form' onSubmit={handleFormSubmit}>
        {RecetteFormTemplate.map((item, index) => {
          const { inputText, multiline, name, type, value } = item;
          return (
            <TextField key={index}
              defaultValue={recetteForm[value]}
              label={inputText}
              multiline={multiline}
              name={name}
              onChange={handleRecetteFormInputChange}
              rowsMax='5'
              type={type}
              variant='outlined'
            />
          )
        })}

        {/* !! Ne pas mettre de <Fragment> ici, laisser <div> !! */}
        <div>
          <label htmlFor='recette-image-input'>
            Image de votre recette
                  <input id='recette-image-input'
              name='recetteImage'
              onChange={handleRecetteFormInputChange}
              type='file'
            />
          </label>
        </div>
        {/* !! Ne pas mettre de <Fragment> ici, laisser <div> !! */}

        <Button className='create-recette__submit-button'
          type='submit'
          variant='contained'>
          Ajouter une recette
          </Button>
      </form>

    </div>
  )
}

export default withContext(RecetteForm);