import React, { Component } from 'react';

import ProfileDescription from './ProfileDescription';
import ProfileIcon from './ProfileIcon';

class ProfileHeader extends Component {

  render() {
    const { userProfile } = this.props;
    return (
      <div className='profile-header-container'>
        <ProfileIcon userProfile={userProfile}/>
        <ProfileDescription userProfile={userProfile}/>
      </div>
    );
  }
}

export default ProfileHeader;