import React from 'react';
import CardActions from '@material-ui/core/CardActions';

import AddToCollection from './AddToCollection';
import Like from './Like';

const Actions = ({ item, refreshRecipes }) => {
    return (
        <CardActions className='recette-card-actions-container' disableActionSpacing>
            <Like item={item} refreshRecipes={refreshRecipes} />
            <AddToCollection item={item} />
        </CardActions>
    );
}

export default Actions;