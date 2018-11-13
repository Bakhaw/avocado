import React, { Fragment } from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ChevronRight from '@material-ui/icons/ChevronRight';

import styles from './styles';

const CustomButton = ({ buttonText, buttonStyle, chevronRight, classes, disabled, onClick, type }) => {
  return (
    <Fragment>
      <Button variant='contained'
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={classNames(
            buttonStyle,
            'button'
          )}>
        <p>{buttonText}</p>
        {chevronRight && <ChevronRight className={classes.rightIcon} />}
      </Button>
    </Fragment>
  );
}

export default withStyles(styles)(CustomButton);