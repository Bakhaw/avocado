import React, { Component } from 'react';

import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';
import Spinner from '../../components/Spinner';

import LayoutContainer from '../../components/LayoutContainer';
import { withContext } from '../../Context/AppStateProvider';

class Profile extends Component {

  async componentDidMount() {
    const { getSelectedUserProfile, toggleAppLoading } = this.props.contextActions;
    
    toggleAppLoading(true);
    await getSelectedUserProfile();
    toggleAppLoading(false);
  }

  async componentDidUpdate(prevProps) {
    const previousId = prevProps.match.params.memberId;
    const currentId = this.props.match.params.memberId;

    if (previousId !== currentId) {
      const { getSelectedUserProfile, toggleAppLoading } = this.props.contextActions;

      toggleAppLoading(true);
      await getSelectedUserProfile();
      toggleAppLoading(false);
    }
  }

  render() {
    const { appLoading, selectedUserProfile } = this.props.contextState;
    
      return (
      <LayoutContainer>
        {appLoading && <Spinner />}

        {selectedUserProfile &&
          <div className='profile-container'>
            <ProfileHeader />
            <hr />
            <ProfileContent />
          </div>
        }
      </LayoutContainer>
    );
  }
}

export default withContext(Profile);