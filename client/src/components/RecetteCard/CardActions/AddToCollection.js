import React from 'react';
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import { withContext } from '../../../Context/AppStateProvider';

const AddToCollection = ({ contextActions, contextState, item }) => {

  const { getAllFavorites, getUserLogged } = contextActions;
  const { userLogged } = contextState;

  const isRecipeInCollection = userLogged.favoritesId.includes(item._id);


  const handleAddToCollectionClick = async () => {
    const recetteId = item._id;
    const userId = userLogged._id;

    try {
      await axios.post(`/favoris/add/${recetteId}/${userId}`)
      await getUserLogged();
      await getAllFavorites();
      // await this.checkLikeButtonClass();
    } catch (err) {
      return console.log(err)
    }
  }

  return (
    <IconButton aria-label="Ajouter à mes favoris"
      onClick={handleAddToCollectionClick}>
      <BookmarkIcon className={isRecipeInCollection ? 'bookmarked' : 'not-bookmarked'} />
    </IconButton>
  )
}

export default withContext(AddToCollection);