import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import UserAvatar from '../../../components/UserAvatar';
import { withContext } from '../../../Context/AppStateProvider';

class Header extends Component {

    state = {
        isDropdownOpen: false
    }

    toggleDropdown = () => {
        this.setState(state => ({ isDropdownOpen: !state.isDropdownOpen }))
    }

    closeDropdown = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ isDropdownOpen: false });
    }

    render() {
        const { _id, authorInfos, recetteInfos } = this.props.item;
        const { authorImage } = authorInfos;
        const { date, title } = recetteInfos;

        const userLoggedId = this.props.contextState.userLogged._id;
        const memberId = authorInfos.id;
        const recetteId = _id;

        const isRecipeCreatedByUserLogged = userLoggedId === memberId;

        const header = {
            avatar:
                <Link params={{ memberId }}
                    to={`/profil/${memberId}`}>
                    <UserAvatar {...this.props.item.authorInfos}
                        image={authorImage}
                        sizeInPixels={40}
                    />
                </Link>,
            title:
                <Link params={{ recetteId }}
                    to={`/recettes/${recetteId}`}>
                    <Typography variant='title'>{title}</Typography>
                </Link>,
            action: <IconButton buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        onClick={this.toggleDropdown}>
                        <MoreIcon />
                    </IconButton>
        }

        return (
            <Fragment>
                <CardHeader
                    action={isRecipeCreatedByUserLogged ? header.action : null}
                    avatar={header.avatar}
                    title={header.title}
                    // subheader={date}
                    className='recette-card-title'
                />
                <Popper open={this.state.isDropdownOpen} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.closeDropdown}>
                                    <MenuList>
                                        <MenuItem>Modifier</MenuItem>
                                        <MenuItem>Supprimer</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Fragment>
        )
    }
}

export default withContext(Header);