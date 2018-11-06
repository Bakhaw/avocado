import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';

const Header = ({ item }) => {

    const { image, name } = item;

    return (
        <CardHeader
            title={<div>
                        <img src={image} className='product-card-icon' />
                        <h4>{name}</h4>
                    </div>}
            className='card-title'
        />
    )
}

export default Header;