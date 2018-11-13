import React, { Fragment } from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ChevronRight';

const CustomButton = ({ buttonText, buttonStyle, chevronRight, disabled, onClick, type }) => {
  return (
    <Fragment>
      <Button variant='contained'
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={classNames(
          'button',
          buttonStyle,
        )}>
        <p>{buttonText}</p>
        {chevronRight && <ChevronRight />}
      </Button>
    </Fragment>
  );
}

export default CustomButton;