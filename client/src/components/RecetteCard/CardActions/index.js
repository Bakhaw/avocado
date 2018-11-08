import React, { Component } from 'react';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import Like from './Like';

import { withContext } from '../../../Context/AppStateProvider';

class Actions extends Component {
    render() {
        const { contextState, item, addToFavorites } = this.props;
        // const { likedBy } = item.recetteInfos;
        const { userLogged } = contextState;
        return (
            <CardActions className='recette-card-actions-container' disableActionSpacing>
                <Like item={item} />
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