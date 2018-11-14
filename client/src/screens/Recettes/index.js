import React, { Component } from 'react';

import LayoutContainer from '../../components/LayoutContainer';
import RecetteCard from '../../components/RecetteCard';

import { withContext } from '../../Context/AppStateProvider';

class Recettes extends Component {

  componentDidMount() {
    this.props.contextActions.getAllRecipes();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prev', prevProps.contextState.recipes);
    console.log('this', this.props.contextState.recipes);
  }

  render() {
    const { contextState } = this.props;
    const { recipes } = contextState;

    return (
      <LayoutContainer>
        <div className='recette-cards-container'>
          {recipes.map((item, index) => (
              <RecetteCard key={index}
                item={item}
                refreshRecipes={this.props.contextActions.getAllRecipes}/>
          ))}
        </div>
      </LayoutContainer>
    );
  }
}

export default withContext(Recettes);