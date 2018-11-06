import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import CreateRecette from '../../../components/CreateRecette';
import UserRecipes from './UserRecipes';

const ProfileContent = ({ userProfile }) => {
  return (
    <Fragment>
      <div className='profile-content__header'>
        <Typography variant='title' className='layout-title profile-content__header__title'>
          Vos Recettes
        </Typography>
        <div className='profile-content__header__create-recette'>
          <CreateRecette />
        </div>
      </div>
      <div className='profile-content__user-recipes'>
        <UserRecipes userProfile={userProfile} />
      </div>
    </Fragment>
  );
}

export default ProfileContent;