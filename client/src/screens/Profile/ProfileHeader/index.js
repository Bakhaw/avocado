import React from 'react';

import ProfileDescription from './ProfileDescription';
import UserAvatar from '../../../components/UserAvatar';

import { withContext } from '../../../Context/AppStateProvider';

const ProfileHeader = ({ contextState }) => {
  return (
    <div className='profile-header-container'>
      <UserAvatar {...contextState.selectedUserProfile} sizeInPixels={150}/>
      <ProfileDescription />
    </div>
  );
}

export default withContext(ProfileHeader);