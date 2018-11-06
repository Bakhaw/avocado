import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const CategoryCards = () => {
  return (
    <div className='category-cards-container'>
      <Link to='/produits/fruits'>
        <div className='category-card fruits'>
          <Typography variant='title'>Fruits</Typography>
        </div>
      </Link>

      <Link to='/produits/legumes'>
        <div className='category-card legumes'>
          <Typography variant='title'>Légumes</Typography>
        </div>
      </Link>

      <Link to='/recettes'>
        <div className='category-card recettes'>
          <Typography variant='title'>Recettes</Typography>
        </div>
      </Link>
    </div>
  )
}

export default CategoryCards;
