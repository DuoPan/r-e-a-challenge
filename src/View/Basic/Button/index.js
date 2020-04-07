import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MButton from '@material-ui/core/Button';
import {TObject, TString, TFunction} from 'Lib/Core/prop_types';

const useStyles = makeStyles({
  root: {
    textTransform: 'none',
    minWidth: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
});

// Define the default outlook of buttons in this project
function Button({
  label = '',
  Icon = null,
  style = {},
  onClick = _ => _,
  ...others
}) {
  const classes = useStyles();
  return (
    <MButton
      startIcon={Icon}
      variant='contained'
      color='primary'
      className={classes.root}
      style={style}
      onClick={onClick}
      {...others}
    >
      {label}
    </MButton>
  );
}

Button.propTypes = {
  label: TString.isRequired,
  onClick: TFunction,
  Icon: TObject,
  style: TObject,
};

export default Button;
