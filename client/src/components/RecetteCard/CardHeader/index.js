import React, { Component, Fragment } from 'react';
import CardHeader from '@material-ui/core/CardHeader';

import Avatar from './Avatar';
import MoreButton from './MoreButton';
import Title from './Title';

import { withContext } from '../../../Context/AppStateProvider';

class Header extends Component {

    render() {
        const { contextState, item } = this.props;
        const { authorInfos } = this.props.item;

        const userLoggedId = contextState.userLogged._id;
        const memberId = authorInfos.id;

        const isRecipeCreatedByUserLogged = userLoggedId === memberId;
        const userIsOnProfilePage = window.location.href.includes('#/profil');

        const displayMoreButton = isRecipeCreatedByUserLogged && userIsOnProfilePage;

        return (
            <Fragment>
                <CardHeader
                    action={displayMoreButton ? <MoreButton item={item}/> : null}
                    avatar={<Avatar item={item} />}
                    title={<Title item={item} />}
                    // subheader={date}
                    className='recette-card-title'
                />
            </Fragment>
        )
    }
}

export default withContext(Header);