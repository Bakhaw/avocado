import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withContext } from '../../Context/AppStateProvider';
import styles from './styles';

const baseImgPath = 'src/assets/images/icones-left-menu';

const LeftMenuData = [
  {
    text: 'Accueil',
    iconActive: `${baseImgPath}/icon-accueil-active.svg`,
    iconDefault: `${baseImgPath}/icon-accueil.svg`,
    routeActive: '#/',
    routeTo: '/'
  },
  {
    text: 'Fruits',
    iconActive: `${baseImgPath}/icon-fruits-active.svg`,
    iconDefault: `${baseImgPath}/icon-fruits.svg`,
    routeActive: '#/produits/fruits',
    routeTo: '/produits/fruits'
  },
  {
    text: 'Légumes',
    iconActive: `${baseImgPath}/icon-legumes-active.svg`,
    iconDefault: `${baseImgPath}/icon-legumes.svg`,
    routeActive: '#/produits/legumes',
    routeTo: '/produits/legumes'
  },
  {
    text: 'Recettes',
    iconActive: `${baseImgPath}/icon-recettes-active.svg`,
    iconDefault: `${baseImgPath}/icon-recettes.svg`,
    routeActive: '#/recettes',
    routeTo: '/recettes'
  },
  {
    text: 'Favoris',
    iconActive: `${baseImgPath}/icon-bookmark-active.svg`,
    iconDefault: `${baseImgPath}/icon-bookmark.svg`,
    routeActive: '#/favoris',
    routeTo: '/favoris'
  },
  {
    text: 'Profil',
    iconActive: `${baseImgPath}/icon-profil-active.svg`,
    iconDefault: `${baseImgPath}/icon-profil.svg`,
    routeActive: `#/profil`,
    routeTo: '/profil'
  },
  {
    text: 'Déconnexion',
    iconDefault: `${baseImgPath}/icon-deconnexion.svg`,
    routeTo: '/'
  }
]

const LeftMenu = ({ contextActions, contextState, classes, theme }) => {
  const { drawerPaper, drawerPaperClose, toolbar } = classes;
  const { closeLeftMenu, signOut } = contextActions;
  const { isLeftMenuOpen, userLogged } = contextState;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(drawerPaper, !isLeftMenuOpen && drawerPaperClose),
      }}
      open={isLeftMenuOpen}
    >
      <div className={toolbar}>
        <IconButton onClick={closeLeftMenu}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>

      <List className='left-menu-list-items'>
        {LeftMenuData.map((item, index) => {
          const { iconActive, iconDefault, routeActive, routeTo, text } = item;
          const isRouteActive = window.location.hash === routeActive;
          const itemIcon = isRouteActive ? iconActive : iconDefault;
          return (
            <Link key={index}
              onClick={text === 'Déconnexion' ? signOut : null}
              to={text === 'Profil' ? `${routeTo}/${userLogged._id}` : routeTo}>
              <ListItem button className={
                classNames(
                  'list-item',
                  isRouteActive && 'route-active-icon'
                )
              }>
                <ListItemIcon>
                  <img src={itemIcon} alt={`Icône ${text}`} />
                </ListItemIcon>
                <ListItemText primary={text} className={isRouteActive ? 'route-active' : ''} />
              </ListItem>
            </Link>
          )
        })}
      </List>

    </Drawer>
  );
}

export default withContext(withStyles(styles, { withTheme: true })(LeftMenu));
