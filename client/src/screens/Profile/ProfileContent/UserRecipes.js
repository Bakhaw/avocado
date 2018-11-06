import React, { Component } from 'react';

import RecetteCard from '../../../components/RecetteCard';

class UserRecipes extends Component {
  render() {
    const { selectedUserRecipes } = this.props;

    if (selectedUserRecipes.length === 0) return <p>Vous n'avez pas encore ajouté de recettes :'(</p>

    return (
      selectedUserRecipes.map((item, index) => (
        <RecetteCard key={index}
          item={item} />
      ))
    );
}
}

export default UserRecipes;