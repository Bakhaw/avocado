import React, { Component } from 'react';
import axios from 'axios';

import LayoutContainer from '../../components/LayoutContainer';
import RecetteCard from '../../components/RecetteCard';
import Spinner from '../../components/Spinner';

import { withContext } from '../../Context/AppStateProvider';

class Recette extends Component {

    state = {
        recette: null
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
        const { recette } = this.state;
        const { appLoading } = this.props.contextState;

        if (appLoading) return <Spinner />;

        return (
            <LayoutContainer>
                <p>Recette Page</p>
                {recette &&
                    <RecetteCard item={recette} />
                }
            </LayoutContainer>
        )
    }
}


export default withContext(Recette);