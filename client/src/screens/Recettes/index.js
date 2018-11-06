import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LayoutContainer from '../../components/LayoutContainer';
import RecetteCard from '../../components/RecetteCard';

import { withContext } from '../../Context/AppStateProvider';

class Recettes extends Component {

  componentDidMount() {
    const { getRecipes } = this.props.contextActions;
    getRecipes();
  }

  render() {
    const { contextState } = this.props;
    const { recipes } = contextState;

    return (
      <LayoutContainer>
        <p>Recettes Page</p>

        <div className='recette-cards-container'>
          {recipes.map((item, index) => (
              <RecetteCard key={index}
                item={item} />
          ))}
        </div>
      </LayoutContainer>
    );
  }
}

export default withContext(Recettes);