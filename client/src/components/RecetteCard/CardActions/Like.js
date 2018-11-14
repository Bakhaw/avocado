import React, { Component } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import { withContext } from '../../../Context/AppStateProvider';

class Like extends Component {

  state = {
    animateHeart: false,
    heartClasses: '',
    totalLikesColor: ''
  }

  async componentDidMount() {
    await this.checkLikeButtonClass();
  }

  likeRecette = async () => {
    const { contextActions, contextState, item, refreshRecipes } = this.props;
    const { getAllFavorites, getAllRecipes, getUserLogged } = contextActions;
    const { userLogged } = contextState;

    const recetteId = item._id;
    const userId = userLogged._id;

    const isRecipeLikedByUser = item.recetteInfos.likedBy.includes(userId);

    if (!isRecipeLikedByUser) {
      this.setState({ animateHeart: true })
    }

    await axios.get(`/recipes/like/${recetteId}/${userId}`);
    await refreshRecipes();
    // await getAllRecipes();
    // await getAllFavorites();
    // await getUserLogged();
    await this.checkLikeButtonClass();
  }

  checkLikeButtonClass = () => {
    const { contextState, item } = this.props;
    const userId = contextState.userLogged._id;
    const isRecipeLikedByUser = item.recetteInfos.likedBy.includes(userId);

    let heartClasses;
    let totalLikesColor;

    if (isRecipeLikedByUser) {
      heartClasses = `heart red-heart ${this.state.animateHeart ? 'is_animating' : ''}`;
      totalLikesColor = '#F8003B'; // red
    } else {
      heartClasses = 'heart';
      totalLikesColor = '#A7B8C3'; // gray
    }

    this.setState({ heartClasses, totalLikesColor })
  }

  render() {
    const { heartClasses, totalLikesColor } = this.state;
    const { item } = this.props;
    const totalLikes = item.recetteInfos.likedBy.length;

    return (
      <div className='recette-card-like-button-container'>
        <IconButton onClick={this.likeRecette}>
          <div className={heartClasses}
            aria-label="Mettre un j'aime"
            style={{ width: 48, height: 48 }}
          />
        </IconButton>
        <p style={{ color: totalLikesColor }}>{totalLikes}</p>
      </div>
    )
  }
}

export default withContext(Like);