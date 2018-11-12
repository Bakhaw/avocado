import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import RecetteFormTemplate from './RecetteFormTemplate';

// TODO: handle les erreurs de form (input vide, time (String à la place de Number) etc ..)

const RecetteForm = ({ handleFormSubmit, handleInputChange, recetteFormState, submitButtonText }) => {
  return (
    <div className='create-recette-container'>
      <form className='create-recette-form' onSubmit={handleFormSubmit}>
        {RecetteFormTemplate.map((item, index) => {
          const { inputText, multiline, name, type, value } = item;
          return (
            <TextField key={index}
              label={inputText}
              multiline={multiline}
              name={name}
              onChange={handleInputChange}
              rowsMax='5'
              type={type}
              value={recetteFormState[value]}
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
              onChange={handleInputChange}
              type='file'
            />
          </label>
        </div>
        {/* !! Ne pas mettre de <Fragment> ici, laisser <div> !! */}

        <Button className='recette-dialog__submit-button'
          type='submit'
          variant='contained'>
          {submitButtonText}
        </Button>
      </form>

    </div>
  )
}

export default RecetteForm;