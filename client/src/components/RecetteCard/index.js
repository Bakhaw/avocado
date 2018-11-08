import React, { Component, Fragment } from 'react';
import Card from '@material-ui/core/Card';

import CardActions from './CardActions';
import CardHeader from './CardHeader';
import CardMedia from './CardMedia';

import { withContext } from '../../Context/AppStateProvider';

class RecetteCard extends Component {

  render() {
    const { item } = this.props;

    return (
      <Fragment>
        <Card className='recette-card'>
          <CardHeader item={item} />

          <CardMedia item={item} />

          <CardActions item={item} />
        </Card>
      </Fragment>
    );
  }
}

export default withContext(RecetteCard);
