import React from 'react';

import ProfileDescription from './ProfileDescription';
import UserAvatar from '../../../components/UserAvatar';
import ProfileIcon from './ProfileIcon';
import { withContext } from '../../../Context/AppStateProvider';

const ProfileHeader = ({ contextState }) => {
  const { displayName, email, image } = contextState.selectedUserProfile;

  return (
    <div className='profile-header-container'>
      {/* <ProfileIcon /> */}
      <UserAvatar {...contextState.selectedUserProfile}/>
      <ProfileDescription />
    </div>
  );
}

export default withContext(ProfileHeader);