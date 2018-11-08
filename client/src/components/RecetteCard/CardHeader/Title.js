import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const Title = ({ item }) => {
  const { title } = item.recetteInfos;
  const recetteId = item._id;

  return (
    <Link params={{ recetteId }}
      to={`/recettes/${recetteId}`}>
      <Typography variant='title'>{title}</Typography>
    </Link>
  )
}

export default Title;