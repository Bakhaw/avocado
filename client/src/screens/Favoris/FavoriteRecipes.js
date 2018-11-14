import React from 'react';
import { Link } from 'react-router-dom';

import RecetteCard from '../../components/RecetteCard';

import { withContext } from '../../Context/AppStateProvider';

const FavoriteRecipes = ({ contextState, refreshRecipes }) => {
  const { favorites } = contextState;
  if (favorites.length === 0) return (
    <p>Vous n'avez pas encore ajouté de <Link to='/recettes' style={{ textDecoration: 'underline' }}>Recettes</Link> à vos favoris</p>
  )

  return (
    favorites.map((item, index) => (
      <RecetteCard key={index}
        item={item}
        refreshRecipes={refreshRecipes} />
    ))
  )
}

export default withContext(FavoriteRecipes);