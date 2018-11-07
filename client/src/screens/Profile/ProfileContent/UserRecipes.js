import React from 'react';

import RecetteCard from '../../../components/RecetteCard';

const UserRecipes = ({ selectedUserRecipes }) => {
  return (
    selectedUserRecipes.map((item, index) => (
      <RecetteCard key={index}
        item={item} />
    ))
  );
}

export default UserRecipes;