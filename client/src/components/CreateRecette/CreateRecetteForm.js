import React, { Component } from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Input from '../../components/Input';
import RecetteFormTemplate from './RecetteFormTemplate';

import { withContext } from '../../Context/AppStateProvider';

class CreateRecetteForm extends Component {

    // recette state
    state = {
        description: '',
        instructions: '',
        ingredients: '',
        recetteImage: '',
        time: '',
        title: '',
    }

    handleInputChange = (e) => {
        if (e.target.type === 'file') {
            this.setState({
                [e.target.name]: e.target.files[0]
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    handleFormSubmit = async (e) => {
        console.log('fired my man')
        e.preventDefault();

        const params = new FormData();
        const { closeDialog, contextActions, contextState } = this.props;
        const { _id, displayName, email, image } = contextState.userLogged;

        // ? AuthorInfos
        params.append('authorInfos.displayName', displayName);
        params.append('authorInfos.email', email);
        params.append('authorInfos.id', _id);
        params.append('authorInfos.authorImage', image);

        const { description, ingredients, instructions, recetteImage, time, title } = this.state;
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
            <div className='create-recette-container'>
                <form className='create-recette-form' onSubmit={this.handleFormSubmit}>
                    {RecetteFormTemplate.map((item, index) => {
                        const { inputText, multiline, name, type, value } = item;
                        return (
                            <TextField key={index}
                                label={inputText}
                                multiline={multiline}
                                name={name}
                                onChange={this.handleInputChange}
                                rowsMax='5'
                                type={type}
                                defaultValue={this.state[value]}
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
                                onChange={this.handleInputChange}
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
}

export default withContext(CreateRecetteForm);