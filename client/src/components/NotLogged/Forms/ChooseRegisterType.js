import React, { Component } from 'react';

import Button from '../../Button';
import Header from './Header';

class ChooseRegisterType extends Component {
  render() {
    const { handlePrev, handleNext } = this.props;
    
    return (
      <div className='choose-register-type'>
        <Header title='ENREGISTREZ VOUS AVEC' chevronLeft handlePrev={handlePrev}/>
        <Button buttonText='Email' onClick={handleNext}/>
        <a href='/auth/google'>
          <Button buttonText='Google' google={true}/>
        </a>
        <a href='/auth/facebook'>
          <Button buttonText='Facebook' facebook={true}/>  
        </a>
      </div>
    );
  }
}

export default ChooseRegisterType;