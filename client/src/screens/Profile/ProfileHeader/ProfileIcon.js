import React, { Fragment } from 'react';
import Gravatar from 'react-gravatar';

import { withContext } from '../../../Context/AppStateProvider';

const ProfileIcon = ({ contextState }) => {
  const { email, image } = contextState.selectedUserProfile;
  const userHasAnImage = typeof image !==  'undefined';
  return (
    <Fragment>
      {userHasAnImage
        ? <img className='profile-header__icon'
          src={image} />
        : <Gravatar className='profile-header__icon'
          email={email} />
      }
    </Fragment>
  );
}

export default withContext(ProfileIcon);