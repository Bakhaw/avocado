import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import { withContext } from '../../../Context/AppStateProvider';

const ProfileDescription = ({ contextState }) => {
  const { displayName, email } = contextState.selectedUserProfile;
  return (
    <Fragment>
      <Typography variant='title' className='profile-description__displayName'>
        {displayName}
      </Typography>
      {/* <Typography variant='subheading'>{email}</Typography> */}
    </Fragment>
  )
};

export default withContext(ProfileDescription);