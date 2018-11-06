import React, { Component } from 'react';

import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

import LayoutContainer from '../../components/LayoutContainer';
import { withContext } from '../../Context/AppStateProvider';
import axios from 'axios';

class Profile extends Component {

  state = {
    userProfile: null
  }

  async componentDidMount() {
    await this.getUserProfile();
  }

  getUserProfile = async () => {
    const userId = this.props.match.params.memberId;
    const request = await axios.get(`/users/id/${userId}`);
    const userProfile = await request.data;
    this.setState({ userProfile });
  }

  render() {
    const { userProfile } = this.state;

    return (
      <LayoutContainer>
        {userProfile &&
          <div className='profile-container'>
            <ProfileHeader userProfile={userProfile} />
            <hr />
            <ProfileContent userProfile={userProfile} />
          </div>
        }
      </LayoutContainer>
    );
  }
}

export default withContext(Profile);