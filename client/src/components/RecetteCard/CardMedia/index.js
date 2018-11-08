import React from 'react';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';

const Media = ({ item }) => {
    const { recetteImage, title } = item.recetteInfos;
    const image = `src/assets/images/recette-images/${recetteImage}`;

    return (
        <Link params={{ recetteId: item._id }}
            to={`/recettes/${item._id}`}>
            <CardMedia
                image={image}
                style={{ height: 0, paddingTop: '56.25%' }}
                title={title}
            />
        </Link>
    )
}

export default Media;