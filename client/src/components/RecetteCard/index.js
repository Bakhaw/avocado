import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import Card from '@material-ui/core/Card';

import CardActions from './CardActions';
import CardHeader from './CardHeader';
import CardMedia from './CardMedia';

import { withContext } from '../../Context/AppStateProvider';

class RecetteCard extends Component {
  state = {
    uniqueId: ''
  }

  async componentDidMount() {
    const uniqueId = _.uniqueId();

    await this.setState({ uniqueId });
    await this.checkLikeButtonClass();
  }

  // ! NEEDS REFACTOR !!
  likeRecette = async () => {
    const element = document.getElementById(`like-button-${this.state.uniqueId}`);

    if (!element.toString().includes('is_animating')) {
      element.classList.add('is_animating');
    }

    const { contextActions, contextState, item } = this.props;
    const { getAllRecipes } = contextActions;
    const { userLogged } = contextState;

    const recetteId = item._id;
    const userId = userLogged._id;

    await axios.post(`/recipes/like/${recetteId}/${userId}`);
    await getAllRecipes();
    await this.checkLikeButtonClass();
  }

  // ! NEEDS REFACTOR !!
  checkLikeButtonClass = () => {
    const { contextState, item } = this.props;
    const { userLogged } = contextState;

    const recetteId = item._id;
    const userId = userLogged._id;

    const likeButton = document.getElementsByClassName(`heart-button-${recetteId}`);
    const likesNumber = document.getElementsByClassName(`likes-number-${recetteId}`);

    if (item.recetteInfos.likedBy.includes(userId)) {
      for (let i = 0; i < likeButton.length; i++) {
        likeButton[i].classList.add('heart', 'red-heart');
      }
      for (let i = 0; i < likesNumber.length; i++) {
        likesNumber[i].style.color = '#F8003B';
      }
    } else {
      for (let i = 0; i < likeButton.length; i++) {
        likeButton[i].classList.remove('red-heart', 'is_animating');
        likeButton[i].classList.add('heart');
      }
      for (let i = 0; i < likesNumber.length; i++) {
        likesNumber[i].style.color = '#A7B8C3';
      }
    }
  }

  addToFavorites = async () => {
    const { contextActions, contextState, item } = this.props;
    const { getAllFavorites, getUserLogged } = contextActions;
    const { userLogged } = contextState;

    const recetteId = item._id;
    const userId = userLogged._id;

    try {
      await axios.post(`/favoris/add/${recetteId}/${userId}`)
      await getUserLogged();
      await getAllFavorites();
      await this.checkLikeButtonClass();
    } catch (err) {
      return console.log(err)
    }
  }

  render() {
    const { item } = this.props;

    return (
      <Fragment>
        <Card className='recette-card'>
          <CardHeader item={item} />
          <Link params={{ recetteId: item._id }}
            to={`/recettes/${item._id}`}>
            <CardMedia item={item} />
          </Link>

          <CardActions
            item={item}
            uniqueId={this.state.uniqueId}
            addToFavorites={this.addToFavorites}
            likeRecette={this.likeRecette} />
        </Card>
      </Fragment>
    );
  }
}

export default withContext(RecetteCard);
