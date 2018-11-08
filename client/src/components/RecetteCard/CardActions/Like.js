import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import { withContext } from '../../../Context/AppStateProvider';

class Like extends Component {
  
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

  render() {
    const { uniqueId } = this.state;
    const { item } = this.props;
    const totalLikes = item.recetteInfos.likedBy.length;
    
    return (
      <div className='recette-card-like-button-container'>
        <IconButton onClick={this.likeRecette}>
          <div
            id={`like-button-${uniqueId}`}
            className={`heart-button-${item._id}`}
            aria-label="Mettre un j'aime"
            style={{ width: 48, height: 48 }}
          />
        </IconButton>
        <p id={`likes-number-${uniqueId}`}
          className={`likes-number-${item._id}`}>
          {totalLikes}
        </p>
      </div>
    )
  }
}

export default withContext(Like);