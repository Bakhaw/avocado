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
    userLogged: null,
    selectedUserProfile: null,
    selectedUserRecipes: [],
    recipes: [],
    favorites: [],
  }

  toggleAppLoading = async (bool) => {
    await this.setState({ appLoading: bool });
  }

  openLeftMenu = () => {
    this.setState({ isLeftMenuOpen: true });
  }

  closeLeftMenu = () => {
    this.setState({ isLeftMenuOpen: false });
  }

  getUserLogged = async () => {
    const { isUserLogged } = this.state;

    if (!isUserLogged) {
      this.toggleAppLoading(true)
    }
    try {
      const request = await axios.get('/auth/profile');
      const profile = await request.data;

      if (profile.user === null) {
        console.log("Pas d'utilisateur connecté...");
        return this.toggleAppLoading(false)
      }

      if (profile.user) {
        const { _id, displayName, email, favoritesId, image } = profile.user;

        return this.setState({
          appLoading: false,
          isUserLogged: true,
          userLogged: { _id, displayName, email, favoritesId, image }
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

  getAllRecipes = async () => {
    try {
      const request = await axios.get('/recipes');
      const recipes = await request.data;
      return this.setState({ recipes });
    } catch (err) {
      console.log(err);
    }
  }

  getAllFavorites = async () => {
    const { _id } = this.state.userLogged;
    try {
      const request = await axios.get(`/favoris/${_id}`);
      const favorites = await request.data;
      return this.setState({ favorites });
    } catch (err) {
      console.log(err);
    }
  }

  getSelectedUserProfile = async () => {
    const userId = window.location.hash.split('profil/')[1];
    const request = await axios.get(`/users/id/${userId}`);
    const selectedUserProfile = await request.data;
    await this.setState({ selectedUserProfile });
  }

  getSelectedUserRecipes = async () => {
    const { _id } = this.state.selectedUserProfile;
    const request = await axios.get(`/recipes/createdBy/${_id}`);
    const selectedUserRecipes = await request.data.library;
    await this.setState({ selectedUserRecipes });
  }

  render() {
    const {
      isLeftMenuOpen, appLoading, isUserLogged, userLogged,
      selectedUserProfile, selectedUserRecipes,
      recipes, favorites,
    } = this.state;
    return (
      <Provider value={{
        contextState: {
          isLeftMenuOpen,
          appLoading,
          isUserLogged,
          userLogged,
          selectedUserProfile,
          selectedUserRecipes,
          recipes,
          favorites,
        },
        contextActions: {
          toggleAppLoading: this.toggleAppLoading,
          openLeftMenu: this.openLeftMenu,
          closeLeftMenu: this.closeLeftMenu,
          getUserLogged: this.getUserLogged,
          getSelectedUserProfile: this.getSelectedUserProfile,
          getSelectedUserRecipes: this.getSelectedUserRecipes,
          signOut: this.signOut,
          getAllRecipes: this.getAllRecipes,
          getAllFavorites: this.getAllFavorites,
        }
      }}>
        {this.props.children}
      </Provider>
    )
  }
}