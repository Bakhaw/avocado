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
            addToFavorites={this.addToFavorites} />
        </Card>
      </Fragment>
    );
  }
}

export default withContext(RecetteCard);
