import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import Tooltip from '@material-ui/core/Tooltip';

import { withContext } from '../../Context/AppStateProvider';

const UserAvatar = ({ displayName, email, image, sizeInPixels }) => {
  const userHasImage = image !== 'none';
  return (
    <Tooltip title={displayName} placement='top' id='recette-card-tooltip'>
      {userHasImage
        ?
        <img alt='Image de profil'
          className='rounded'
          height={sizeInPixels}
          src={image}
          width={sizeInPixels}
        />
        :
        <Gravatar className='rounded'
          default='retro'
          email={email}
          size={sizeInPixels}
        />}
    </Tooltip>
  );
}

export default withContext(UserAvatar);