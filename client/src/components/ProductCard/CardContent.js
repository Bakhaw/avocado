import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const Content = ({ values }) => {
    return values
        ? <CardContent className='product-card-content' style={{ height: values ? '280px' : 'auto' }}>
            {values.map((value, index) => {
                const { type, val } = value;

                return (
                    <div key={index} className='product-card-progress-bar-container'>
                        <Typography component='p'>{type}</Typography>

                        {val > 100
                            ? <Typography component='p'>{val}</Typography>
                            : <LinearProgress variant='determinate' value={val} className='product-card-progress-bar' />
                        }

                        <Typography component='p'>{val}%</Typography>
                    </div>
                )
            })}
        </CardContent>
        : null
}

export default Content;