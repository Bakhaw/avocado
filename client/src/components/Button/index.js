import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ChevronRight from '@material-ui/icons/ChevronRight';

import styles from './styles';

// TODO repasser sur ce Component
const buttonStyle = (classes, facebook, google, twitter, instagram) => {
  let type = '';

  if (facebook) {
    type = classes.facebook
  } else if (google) {
    type = classes.google
  } else if (twitter) {
    type = classes.twitter
  } else if (instagram) {
    type = classes.instagram
  } else {
    type = classes.basic
  }

  return type;
}

const CustomButton = (props) => {
  const { buttonText, chevronRight, classes, disabled, facebook, google, instagram, onClick, type, twitter } = props;

  return (
    <div>
      <Button variant='contained'
              disabled={disabled}
              onClick={onClick}
              type={type}
              className={buttonStyle(classes, facebook, google, twitter, instagram) + ' button'}>
        <p>{buttonText}</p>
        {chevronRight && <ChevronRight className={classes.rightIcon} />}
      </Button>
    </div>
  );
}

export default withStyles(styles)(CustomButton);