import React from 'react';

import RecetteCard from '../../../components/RecetteCard';

const UserRecipes = ({ refreshRecipes, selectedUserRecipes }) => {
  return (
    selectedUserRecipes.map((item, index) => (
      <RecetteCard key={index}
        item={item}
        refreshRecipes={refreshRecipes} />
    ))
  );
}

export default UserRecipes;