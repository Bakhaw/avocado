import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';

import Input from '../../components/Input';

import { withContext } from '../../Context/AppStateProvider';

class CreateRecetteForm extends Component {

    state = {
        recetteImage: '',
        recetteTitle: '',
    }

    handleInputChange = (e) => {

        if (e.target.type === 'file') {
            // console.log('Inputchange', e.target.name, e.target.files[0])
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
        e.preventDefault();

        const { displayName, email, _id, image } = this.props.contextState.userInfos;
        const { recetteImage, recetteTitle } = this.state;
        const params = new FormData();

        // ? AuthorInfos
        params.append('authorInfos.displayName', displayName);
        params.append('authorInfos.email', email);
        params.append('authorInfos.id', _id);
        params.append('authorInfos.authorImage', image);
        
        // ? RecetteInfos
        params.append('recetteInfos.title', recetteTitle);
        params.append('recetteInfos.recetteImage', recetteImage);
        params.append('recetteInfos.date', moment().locale('fr').format('LL'));
                
        // recetteInfos: {
        //     description:  { type: String, required: false },
        //     instructions: { type: String, required: false },
        //     ingredients:  { type: Array, required:  false },
        //     time:         { type: Number, required: false }, // Temps en minute
        //     likedBy:      { type: Array,  required: false }
        // }
        
        try {
            await axios({
                method: 'post',
                url: '/recipes/add',
                data: params
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { recetteTitle } = this.state;

        return (
            <form onSubmit={this.handleFormSubmit}>
                <Input inputText='Nom de la recette'
                    name='recetteTitle'
                    onChange={this.handleInputChange}
                    type='text'
                    value={recetteTitle} />
                <label htmlFor='recette-image-input'>Image de votre recette</label>
                <input id='recette-image-input'
                    name='recetteImage'
                    onChange={this.handleInputChange}
                    type='file' />
                <button type='submit'>Ajouter</button>
            </form>
        )
    }
}

export default withContext(CreateRecetteForm);