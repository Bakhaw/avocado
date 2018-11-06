import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Spinner extends Component {
    render() {
        return (
            <div className='spinner-container'>
                <CircularProgress style={{ color: '#48B08D' }}/>
            </div>
        )
    }
}

export default Spinner;