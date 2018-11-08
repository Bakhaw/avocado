import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import Tooltip from '@material-ui/core/Tooltip';

import { withContext } from '../../Context/AppStateProvider';

const UserAvatar = ({ displayName, email, image, sizeInPixels }) => {
  const userHasImage = image !== 'none';
  return (
      <div className='avatar-container' style={{ width: sizeInPixels, height: sizeInPixels }}>
        <Tooltip title={displayName} placement='top' id='recette-card-tooltip'>
          {userHasImage
            ?
            <img alt='Image de profil'
              className='profile-avatar rounded'
              src={image}
            />
            :
            <Gravatar className='rounded'
              default='retro'
              email={email}
              size={sizeInPixels}
            />}
        </Tooltip>
      </div>
  );
}

export default withContext(UserAvatar);