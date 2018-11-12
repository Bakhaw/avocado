import React, { Component } from 'react'
import axios from 'axios';

import RecetteForm from '../RecetteForm';

import { withContext } from '../../Context/AppStateProvider';

class UpdateRecetteForm extends Component {

  handleFormSubmit = async (e) => {
    e.preventDefault();

    const params = new FormData();
    const { closeDialog, contextActions, contextState } = this.props;
    const { recetteForm } = contextState;

    const { description, ingredients, instructions, recetteImage, time, title } = recetteForm;

    // ? RecetteInfos
    params.append('recetteInfos.description', description);
    params.append('recetteInfos.ingredients', ingredients);
    params.append('recetteInfos.instructions', instructions);
    params.append('recetteInfos.recetteImage', recetteImage);
    params.append('recetteInfos.time', time);
    params.append('recetteInfos.title', title);

    const { getSelectedUserRecipes } = contextActions;
    const recetteId = this.props.item._id;
    
    console.log({ recetteId });

    // TODO, make this working with <RecetteForm /> Component, FIND RECETTE ID 
    try {
      await axios({
        method: 'post',
        url: `/recipes/update/${recetteId}`,
        data: params
      });

      await getSelectedUserRecipes();
      closeDialog();
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <RecetteForm handleFormSubmit={this.handleFormSubmit} />
    )
  }
}

export default withContext(UpdateRecetteForm);