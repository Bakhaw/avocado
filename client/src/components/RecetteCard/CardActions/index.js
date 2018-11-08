import React from 'react';
import CardActions from '@material-ui/core/CardActions';

import AddToCollection from './AddToCollection';
import Like from './Like';

const Actions = ({ item }) => {
    return (
        <CardActions className='recette-card-actions-container' disableActionSpacing>
            <Like item={item} />
            <AddToCollection item={item} />
        </CardActions>
    );
}

export default Actions;