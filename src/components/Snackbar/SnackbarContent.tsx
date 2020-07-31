import React from 'react';
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Snack from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import Close from '@material-ui/icons/Close';
// core components
import snackbarContentStyle from '../../assets/jss/material-dashboard-react/components/snackbarContentStyle';

function SnackbarContent({ ...props }: any) {
  const { classes, message, color, close, icon, rtlActive } = props;
  let action: any[] = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined
  });
  if (close !== undefined) {
    action = [
      // tslint:disable-next-line: jsx-wrap-multiline
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
      >
        <Close className={classes.close} />
      </IconButton>
    ];
  }
  return (
    <Snack
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      classes={{
        root: classes.root + ' ' + classes[color],
        message: classes.message,
        action: classNames({ [classes.actionRTL]: rtlActive })
      }}
      action={action}
    />
  );
}

export default withStyles(snackbarContentStyle)(SnackbarContent);
