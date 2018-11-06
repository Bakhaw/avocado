import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import { withContext } from '../../Context/AppStateProvider';

import styles from './styles';

const LayoutContainer = ({ children, classes, contextState }) => {
  const classnames = classNames(
    contextState.isLeftMenuOpen
      ? classes.layoutContainerWhenLeftMenuOpen
      : classes.layoutContainerWhenLeftMenuClose
  );
  return (
    <div className={classnames}>
      {children}
    </div>
  )
}

export default withContext(withStyles(styles, { withTheme: true })(LayoutContainer));