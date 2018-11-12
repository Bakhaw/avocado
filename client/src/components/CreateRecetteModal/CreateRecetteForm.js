import React, { Component } from 'react'
import axios from 'axios';

import RecetteForm from '../RecetteForm';

import { withContext } from '../../Context/AppStateProvider';

class CreateRecetteForm extends Component {

    handleFormSubmit = async (e) => {
        // TODO, make this working with <RecetteForm /> Component
        e.preventDefault();

        const params = new FormData();
        const { closeDialog, contextActions, contextState } = this.props;
        const { recetteForm, userLogged } = contextState;
        const { _id, displayName, email, image } = userLogged;

        // ? AuthorInfos
        params.append('authorInfos.displayName', displayName);
        params.append('authorInfos.email', email);
        params.append('authorInfos.id', _id);
        params.append('authorInfos.authorImage', image);

        const { description, ingredients, instructions, recetteImage, time, title } = recetteForm;
        // ? RecetteInfos
        params.append('recetteInfos.description', description);
        params.append('recetteInfos.ingredients', ingredients);
        params.append('recetteInfos.instructions', instructions);
        params.append('recetteInfos.recetteImage', recetteImage);
        params.append('recetteInfos.time', time);
        params.append('recetteInfos.title', title);

        const { getSelectedUserRecipes } = contextActions;
        try {
            await axios({
                method: 'post',
                url: '/recipes/add',
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
            <RecetteForm handleFormSubmit={this.handleFormSubmit}/>
        )
    }
}

export default withContext(CreateRecetteForm);