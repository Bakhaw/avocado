import React, { Component } from 'react';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import { withContext } from '../../Context/AppStateProvider';

class Actions extends Component {
    render() {
        const { contextState, item, uniqueId, addToFavorites, likeRecette } = this.props;
        const { likedBy } = item.recetteInfos;
        const { userLogged } = contextState;
        return (
            <CardActions className='recette-card-actions-container' disableActionSpacing>
                <div className='recette-card-like-button-container'>
                    <IconButton onClick={() => likeRecette(item._id, userLogged._id)}>
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
                    onClick={() => addToFavorites(item._id, userLogged._id)}
                    aria-label="Ajouter à mes favoris">
                    <BookmarkIcon
                        className={
                            userLogged.favoritesId.includes(item._id)
                                ? 'bookmarked'
                                : 'not-bookmarked'
                        } />
                </IconButton>
            </CardActions>
        );
    }
}

export default withContext(Actions);