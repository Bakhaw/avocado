import React, { Component } from 'react';
import Card from '@material-ui/core/Card';

import CardContent from './CardContent';
import CardHeader from './CardHeader';

const fakeValues = [
    {
        type: 'Glucides',
        val: 22.4
    },
    {
        type: 'Protides',
        val: 12.2
    },
    {
        type: 'Lipides',
        val: 33.1
    },
    {
        type: 'Kcal',
        val: 100
    }
];

const ProductCard = ({ item, infosBars }) => (
    <Card className='product-card'>
        <CardHeader item={item} />
        <CardContent values={infosBars ? fakeValues : null} />
    </Card>
);

export default ProductCard;