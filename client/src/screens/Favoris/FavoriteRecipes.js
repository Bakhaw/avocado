import React from 'react';

import RecetteCard from '../../components/RecetteCard';

import { withContext } from '../../Context/AppStateProvider';

const FavoriteRecipes = ({ contextState }) => {
  const { favorites } = contextState;
  return (
    favorites.map((item, index) => (
      <RecetteCard key={index}
        item={item} />
    ))
  )
}

export default withContext(FavoriteRecipes);