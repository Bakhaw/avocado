import React from 'react';
import Card from '@material-ui/core/Card';

import CardActions from './CardActions';
import CardHeader from './CardHeader';
import CardMedia from './CardMedia';

const RecetteCard = ({ item }) => {
  return (
    <Card className='recette-card'>
      <CardHeader item={item} />
      <CardMedia item={item} />
      <CardActions item={item} />
    </Card>
  );
}

export default RecetteCard;
