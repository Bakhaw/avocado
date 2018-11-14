import React from 'react';
import Card from '@material-ui/core/Card';

import CardActions from './CardActions';
// import CardContent from './CardContent';
import CardHeader from './CardHeader';
import CardMedia from './CardMedia';

const RecetteCard = ({ item, refreshRecipes }) => {
  return (
    <Card className='recette-card'>
      <CardHeader item={item} />
      <CardMedia item={item} />
      {/* <CardContent item={item}/> */}
      <CardActions item={item} refreshRecipes={refreshRecipes} />
    </Card>
  );
}

export default RecetteCard;
