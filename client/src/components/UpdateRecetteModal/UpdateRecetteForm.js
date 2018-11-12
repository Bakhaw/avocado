import React, { Component } from 'react'
import axios from 'axios';

import RecetteForm from '../RecetteForm';

import { withContext } from '../../Context/AppStateProvider';

class UpdateRecetteForm extends Component {

  state = {
    recipe: {
      description: '',
      instructions: '',
      ingredients: '',
      recetteImage: '',
      time: '',
      title: '',
    }
  }

  componentDidMount() {
    this.getCurrentRecipe();
  }

  getCurrentRecipe = async () => {
    const recetteId = this.props.item._id;
    const request = await axios.get(`/recipes/id/${recetteId}`);
    const recipe = await request.data.recetteInfos;
    this.setState({ recipe });
  }

  handleInputChange = (e) => {
    let newValue;

    if (e.target.type === 'file') {
      newValue = e.target.files[0]
    } else {
      newValue = e.target.value;
    }

    this.setState({
      recipe: {
        ...this.state.recipe,
        [e.target.name]: newValue
      }
    });
  }


  handleFormSubmit = async (e) => {
    e.preventDefault();

    const params = new FormData();
    const { closeDialog, contextActions } = this.props;

    const { description, ingredients, instructions, recetteImage, time, title } = this.state.recipe;

    // ? RecetteInfos
    params.append('recetteInfos.description', description);
    params.append('recetteInfos.ingredients', ingredients);
    params.append('recetteInfos.instructions', instructions);
    params.append('recetteInfos.recetteImage', recetteImage);
    params.append('recetteInfos.time', time);
    params.append('recetteInfos.title', title);

    const { getSelectedUserRecipes } = contextActions;
    const recetteId = this.props.item._id;

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
      <RecetteForm handleFormSubmit={this.handleFormSubmit}
        handleInputChange={this.handleInputChange}
        recetteFormState={this.state.recipe}
        submitButtonText='Enregistrer les changements' />
    )
  }
}

export default withContext(UpdateRecetteForm);