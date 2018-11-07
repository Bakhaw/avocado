import React, { Fragment } from 'react';
import CardHeader from '@material-ui/core/CardHeader';

const Header = ({ item }) => {

    const { image, name } = item;
    const title = <div>
                    <img src={image} className='product-card-icon' />
                    <h4>{name}</h4>
                </div>
    return (
        <CardHeader
            title={title}
            className='product-card-title'
        />
    )
}

export default Header;