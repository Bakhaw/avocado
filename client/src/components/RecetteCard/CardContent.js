import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TimerIcon from '@material-ui/icons/Timer';

const Content = ({ item }) => {

    const { description, time } = item.recetteInfos;

    return (
        <CardContent className='recette-card-description'>
            <Typography component='p' >{description}</Typography>
            <Button aria-label='temps' className='recette-card-timer-button'>
                <TimerIcon />
                <p>{time} min</p>
            </Button>
        </CardContent>
    )
}

export default Content;