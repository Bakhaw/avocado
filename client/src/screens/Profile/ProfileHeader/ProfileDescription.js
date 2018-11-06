import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import { withContext } from '../../../Context/AppStateProvider';

const ProfileDescription = ({ userProfile }) => {
  const { displayName, email } = userProfile;
  return (
    <Fragment>
      <Typography variant='title'>{displayName}</Typography>
      <Typography variant='subheading'>{email}</Typography>
    </Fragment>
  )
};

export default withContext(ProfileDescription);