import React, { Component, Fragment } from 'react';
import axios from 'axios';

import RecetteCard from '../../../components/RecetteCard';

import { withContext } from '../../../Context/AppStateProvider';

class UserRecipes extends Component {

  state = {
    userRecipes: []
  }

  componentDidMount() {
    this.getUserRecipes();
  }

  getUserRecipes = async () => {
    const { _id } = this.props.userProfile;
    const request = await axios.get(`/recipes/createdBy/${_id}`);
    const userRecipes = await request.data;
    this.setState({ userRecipes });
  }


  render() {
    const { userRecipes } = this.state;
    if (userRecipes.length === 0) return <p>Vous n'avez pas encore ajouté de recettes :'(</p>
    return (
      userRecipes.map((item, index) => (
        <RecetteCard key={index}
          item={item} />
      ))
    );
  }
}

export default withContext(UserRecipes);