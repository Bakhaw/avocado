import React, { Component, Fragment } from 'react';
import CardHeader from '@material-ui/core/CardHeader';

import Avatar from './Avatar';
import MoreButton from './MoreButton';
import Title from './Title';

import { withContext } from '../../../Context/AppStateProvider';

class Header extends Component {

    render() {
        const { item } = this.props;
        const { authorInfos } = this.props.item;

        const userLoggedId = this.props.contextState.userLogged._id;
        const memberId = authorInfos.id;

        // TODO: put this in <MoreButton /> component
        const isRecipeCreatedByUserLogged = userLoggedId === memberId;

        return (
            <Fragment>
                <CardHeader
                    action={isRecipeCreatedByUserLogged ? <MoreButton /> : null}
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