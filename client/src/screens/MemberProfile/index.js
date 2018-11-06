import React, { Component } from 'react'
import axios from 'axios';

import LayoutContainer from '../../components/LayoutContainer';

class MemberProfile extends Component {

    state = {
        memberProfile: ''
    }

    componentDidMount() {
        this.getMemberProfileInfos();
    }

    getMemberProfileInfos = async () => {
        const memberId = this.props.match.params.memberId;
        const request = await axios.get(`/users/id/${memberId}`);
        const memberProfile = await request.data;
        this.setState({ memberProfile });
    }

    render() {
        console.log('Member profile:', this.state.memberProfile);

        return (
            <LayoutContainer>
                <p>MemberProfile Page</p>
            </LayoutContainer>
        )
    }
}

export default MemberProfile;