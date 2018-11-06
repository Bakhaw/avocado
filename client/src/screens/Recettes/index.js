import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LayoutContainer from '../../components/LayoutContainer';
import RecetteCard from '../../components/RecetteCard';

import { withContext } from '../../Context/AppStateProvider';

class Recettes extends Component {

  componentDidMount() {
    this.props.contextActions.getAllRecipes();
  }

  render() {
    const { contextState } = this.props;
    const { recipes } = contextState;

    return (
      <LayoutContainer>
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