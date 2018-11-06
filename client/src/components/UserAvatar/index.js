import React, { Component } from 'react';
import Gravatar from 'react-gravatar';
import Tooltip from '@material-ui/core/Tooltip';

import { withContext } from '../../Context/AppStateProvider';

class UserAvatar extends Component {
  render() {
    const { displayName, email, image } = this.props;
    const userHasImage = image !== 'none';
    return (
      <Tooltip title={displayName} placement='top' id='recette-card-tooltip'>
        {userHasImage
          ? <img alt='Image de profil' src={image} className='rounded small' />
          : <Gravatar email={email} className='rounded small' />}
      </Tooltip>
    )
  }
}

export default withContext(UserAvatar);