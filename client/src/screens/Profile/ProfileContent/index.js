import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import CreateRecette from '../../../components/CreateRecette';
import UserRecipes from './UserRecipes';

import { withContext } from '../../../Context/AppStateProvider';

class ProfileContent extends Component {
  
  async componentDidMount() {
    const { getSelectedUserRecipes, toggleAppLoading } = this.props.contextActions;

    toggleAppLoading(true);
    await getSelectedUserRecipes();
    toggleAppLoading(false);
  }

  async componentDidUpdate(prevProps) {
    const previousUserId = prevProps.contextState.selectedUserProfile._id;
    const currentUserId = this.props.contextState.selectedUserProfile._id;

    if (previousUserId !== currentUserId) {
      const { getSelectedUserRecipes, toggleAppLoading } = this.props.contextActions;

      toggleAppLoading(true);
      await getSelectedUserRecipes();
      toggleAppLoading(false);
    }
  }

  render() {
    const { selectedUserProfile, selectedUserRecipes, userLogged } = this.props.contextState;

    // ? Si l'user connecté n'est pas sur son profil à lui => false
    const isUserLoggedOnHisProfile = userLogged._id === selectedUserProfile._id;

    return (
      <Fragment>
        <div className='profile-content__header'>
          <Typography variant='title' className='profile-content__header__title'>
            Recettes crées par {selectedUserProfile.displayName}
          </Typography>
          {isUserLoggedOnHisProfile &&
            <div className='profile-content__header__create-recette'>
              <CreateRecette />
            </div>
          }
        </div>
        <div className='profile-content__user-recipes'>
          <UserRecipes selectedUserRecipes={selectedUserRecipes}/>
        </div>
      </Fragment>
    );
  }
}

export default withContext(ProfileContent);