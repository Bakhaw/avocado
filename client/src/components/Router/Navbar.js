import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Gravatar from 'react-gravatar';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Toolbar from '@material-ui/core/Toolbar';

import { withContext } from '../../Context/AppStateProvider';
import styles from './styles';

class Navbar extends Component {

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
    const { contextActions, contextState, classes } = this.props;
    const { openLeftMenu, signOut } = contextActions;
    const { isLeftMenuOpen, userLogged } = contextState;

    return (
      <AppBar
        position='fixed'
        style={{ margin: 0 }}
        className={classNames(classes.appBar, isLeftMenuOpen && classes.appBarShift)
        }
      >
        <Toolbar disableGutters={!isLeftMenuOpen}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={openLeftMenu}
            className={classNames(classes.menuButton, isLeftMenuOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <IconButton buttonRef={node => {
            this.anchorEl = node;
          }}
            className='navbar-profile-icon-container'
            onClick={this.toggleDropdown}>

            {userLogged.image !== 'none'
              ? <img className='navbar-profile-icon'
                src={userLogged.image}/>
              : <Gravatar className='navbar-profile-icon'
                email={contextState.userLogged.email} />
            }

          </IconButton>

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
                      <Link to={`/profil/${userLogged._id}`}>
                        <MenuItem>Profil</MenuItem>
                      </Link>
                      <MenuItem onClick={signOut}>Déconnexion</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

        </Toolbar>
      </AppBar >
    )
  }
}

export default withContext(withStyles(styles, { withTheme: true })(Navbar));
