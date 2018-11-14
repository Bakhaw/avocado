import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import EmptyState from '../../../components/EmptyState';
import CreateRecetteModal from '../../../components/CreateRecetteModal';
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
    const { contextActions, contextState } = this.props;
    const { selectedUserProfile, selectedUserRecipes, userLogged } = contextState;
    const { getSelectedUserRecipes } = contextActions;

    // ? Si l'user connecté n'est pas sur son profil à lui => false
    const isUserLoggedOnHisProfile = userLogged._id === selectedUserProfile._id;
    const isEmptyState = selectedUserRecipes.length === 0;
    const emptyStateText =
      isUserLoggedOnHisProfile
        ? "Vous n'avez toujours pas ajouté de recettes"
        : `${selectedUserProfile.displayName} n'a toujours pas ajouté de recettes`

    return (
      <Fragment>
        <div className='profile-content__header'>
          {isEmptyState
            ? <EmptyState text={emptyStateText} />
            : <Typography variant='title' className='profile-content__header__title'>
              Recettes créées par {isUserLoggedOnHisProfile ? 'vous' : selectedUserProfile.displayName}
            </Typography>
          }
          {isUserLoggedOnHisProfile &&
            <div className='profile-content__header__create-recette'>
              <CreateRecetteModal />
            </div>
          }
        </div>
        <div className='profile-content__user-recipes'>
          <UserRecipes refreshRecipes={getSelectedUserRecipes}
            selectedUserRecipes={selectedUserRecipes} />
        </div>
      </Fragment>
    );
  }
}

export default withContext(ProfileContent);