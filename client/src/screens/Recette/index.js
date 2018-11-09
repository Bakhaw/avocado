import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';

import LayoutContainer from '../../components/LayoutContainer';
// import RecetteCard from '../../components/RecetteCard';
import Spinner from '../../components/Spinner';

import BasketIcon from '../../assets/icones-recette/icon-basket.svg';
import ChefIcon from '../../assets/icones-recette/icon-chef.svg';
import TimerIcon from '../../assets/icones-recette/icon-timer.svg';

import { withContext } from '../../Context/AppStateProvider';

class Recette extends Component {

    state = {
        recette: ''
    }

    componentDidMount() {
        this.getRecipeById()
    }

    getRecipeById = async () => {
        const { contextActions, match } = this.props;
        const { toggleAppLoading } = contextActions;

        toggleAppLoading(true);

        const id = match.params.recetteId;
        const request = await axios.get(`/recipes/id/${id}`);
        const recette = await request.data;
        this.setState({ recette });

        toggleAppLoading(false);
    }

    render() {
        const { appLoading } = this.props.contextState;

        const { recette } = this.state;
        const { date, description, ingredients, instructions, likedBy, recetteImage, time, title } = recette && recette.recetteInfos;
        const recetteImgSrc = `/src/assets/images/recette-images/${recetteImage}`;
        const backgroundImage = `url(${recetteImgSrc})`;

        if (appLoading) return <Spinner />;

        return (
            <LayoutContainer>
                {recette !== '' &&
                    <div className='recette-page__container'
                        style={{ backgroundImage }}>

                        <div className='recette-page__container-first-children'>
                            <div className='recette-page__title-container'>
                                <h2>{title}</h2>
                                <h4>{description}</h4>
                            </div>
                            <div className='recette-page__recette-infos-container'>
                                <div className='row'>
                                    <img alt="Icône temps de préparation"
                                        className='timer-icon'
                                        src={TimerIcon} />
                                    <h4>{time} minutes</h4>
                                </div>
                                <div className='row'>
                                    <img alt="Icône panier ingrédients"
                                        className='basket-icon'
                                        src={BasketIcon} />
                                    <ul className='recette-page__ingredients-text'>
                                        {ingredients.map((ingr, i) => <li key={i}>{ingr}</li>)}
                                    </ul>
                                </div>
                                <div className='row recette-page__instructions-container'>
                                    <img alt="Icône chef cuisinier"
                                        className='chef-icon'
                                        src={ChefIcon} />
                                    <div className='recette-page__instructions-text'>
                                        <h4>{instructions}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <img alt="Image de la recette"
                                className='recette-page__image'
                                src={recetteImgSrc} />
                            <ul>
                                <li>Date de création: {date}</li>

                            </ul>
                        </div> */}
                    </div>
                    // <RecetteCard item={recette} />
                }
            </LayoutContainer>
        )
    }
}


export default withContext(Recette);