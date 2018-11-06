import React from 'react';

import ProfileDescription from './ProfileDescription';
import ProfileIcon from './ProfileIcon';

const ProfileHeader = () => {
  return (
    <div className='profile-header-container'>
      <ProfileIcon />
      <ProfileDescription />
    </div>
  );
}

export default ProfileHeader;