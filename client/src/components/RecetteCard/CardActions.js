import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import { withContext } from '../../Context/AppStateProvider';

const Actions = ({ contextState, item, uniqueId, addToFavorites, likeRecette }) => {

    const { likedBy } = item.recetteInfos;
    const { userInfos } = contextState;

    return (
        <CardActions className='recette-card-actions-container' disableActionSpacing>
            <div className='recette-card-like-button-container'>
                <IconButton onClick={() => likeRecette(item._id, userInfos._id)}>
                    <div
                        id={`like-button-${uniqueId}`}
                        className={`heart-button-${item._id}`}
                        aria-label="Mettre un j'aime"
                        style={{ width: 48, height: 48 }}
                    />
                </IconButton>
                <p id={`likes-number-${uniqueId}`} className={`likes-number-${item._id}`}>{likedBy.length}</p>
            </div>
            <IconButton
                onClick={() => addToFavorites(item._id, userInfos._id)}
                aria-label="Ajouter à mes favoris">
                <BookmarkIcon
                    className={
                        userInfos.favoritesId.includes(item._id)
                            ? 'bookmarked'
                            : 'not-bookmarked'
                    } />
            </IconButton>
        </CardActions>
    )
}

export default withContext(Actions);