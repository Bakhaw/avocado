import React, { Component } from "react";

import LayoutContainer from "../../components/LayoutContainer";

import { withContext } from "../../Context/AppStateProvider";
import FavoriteRecipes from "./FavoriteRecipes";

class Favoris extends Component {
  componentDidMount() {
    this.props.contextActions.getAllFavorites();
  }

  render() {
    return (
      <LayoutContainer>
        <h2 className="layout-title">Vos Recettes Enregistrées</h2>
        <div className="favorites-container">
          <FavoriteRecipes
            refreshRecipes={this.props.contextActions.getAllFavorites}
          />
        </div>
      </LayoutContainer>
    );
  }
}

export default withContext(Favoris);
