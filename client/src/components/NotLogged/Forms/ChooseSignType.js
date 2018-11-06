import React, { Component } from 'react';

import Button from '../../Button';
import Header from './Header';

class ChooseSignType extends Component {

    render() {
        const { handlePrev, handleNext, toggleSignIn } = this.props;

        return (
            <div className='sign-type'>
                <Header title='Bienvenue' handlePrev={handlePrev} />
                <Button buttonText='Se connecter' onClick={toggleSignIn} chevronRight />
                <Button buttonText='Créer un compte' onClick={handleNext} chevronRight />
            </div>
        );
    }
}

export default ChooseSignType;