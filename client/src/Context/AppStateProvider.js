import React, { createContext, Component } from 'react';
import axios from 'axios';

const { Provider, Consumer } = createContext();

export const withContext = Component => props => (
  <Consumer>
    {context => <Component {...context} {...props} />}
  </Consumer>
);

export default class AppStateProvider extends Component {

  state = {
    appLoading: false,
    isLeftMenuOpen: false,
    isUserLogged: false,
    userInfos: {},
    recipes: [],
    favorites: [],
  }

  toggleAppLoading = bool => {
    this.setState({ appLoading: bool });
  }

  openLeftMenu = () => {
    this.setState({ isLeftMenuOpen: true });
  }

  closeLeftMenu = () => {
    this.setState({ isLeftMenuOpen: false });
  }

  getUserInfos = async () => {
    const { isUserLogged } = this.state;

    if (!isUserLogged) {
      this.setState({ appLoading: true })
    }
    try {
      const request = await axios.get('/auth/profile');
      const profile = await request.data;

      if (profile.user === null) {
        console.log("Pas d'utilisateur connecté...");
        return this.setState({ appLoading: false });
      }

      if (profile.user) {
        const { _id, displayName, email, favoritesId, image } = profile.user;

        return this.setState({
          appLoading: false,
          isUserLogged: true,
          userInfos: { _id, displayName, email, favoritesId, image }
        });
      }
    } catch (err) {
      return console.log(err);
    }
  }

  signOut = async () => {
    try {
      await axios.post('/auth/logout');
      window.location.replace('/');
      return this.setState({ isUserLogged: false });
    } catch (err) {
      return console.log(err);
    }
  }

  getRecipes = async () => {
    try {
      const request = await axios.get('/recipes');
      const recipes = await request.data;
      console.log('Recettes!', recipes);
      return this.setState({ recipes });
    } catch (err) {
      console.log(err);
    }
  }

  getFavorites = async () => {
    const { _id } = this.state.userInfos;
    try {
      const request = await axios.get(`/favoris/${_id}`);
      const favorites = await request.data;
      console.log('FAVORIS!', favorites);
      return this.setState({ favorites });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      isLeftMenuOpen, appLoading, isUserLogged, userInfos,
      recipes, favorites
    } = this.state;
    return (
      <Provider value={{
        contextState: {
          isLeftMenuOpen,
          appLoading,
          isUserLogged,
          userInfos,
          recipes,
          favorites
        },
        contextActions: {
          toggleAppLoading: this.toggleAppLoading,
          openLeftMenu: this.openLeftMenu,
          closeLeftMenu: this.closeLeftMenu,
          getUserInfos: this.getUserInfos,
          signOut: this.signOut,
          getRecipes: this.getRecipes,
          getFavorites: this.getFavorites
        }
      }}>
        {this.props.children}
      </Provider>
    )
  }
}