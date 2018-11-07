import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';

const Media = ({ item }) => {
    const { recetteImage, title } = item.recetteInfos;
    const image = `src/assets/images/recette-images/${recetteImage}`;

    return (
        <CardMedia
            image={image}
            style={{ height: 0, paddingTop: '56.25%' }}
            title={title}
        />
    )
}

export default Media;