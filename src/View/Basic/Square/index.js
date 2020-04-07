import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {TObject, TString, TFunction, TNumber, TBool} from 'Lib/Core/prop_types';
import theme from 'theme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Basic square component
function Square({
  width = 100,
  height = 100,
  label,
  onClick = _ => _,
  style = {},
  isOn = false,
  ...others
}) {
  const classes = useStyles();

  const _style = {
    width: width,
    height: height,
    backgroundColor: isOn ? theme.status.success : null,
    color: isOn ? theme.palette.text.reverse : theme.palette.text.primary,
    ...style
  };

  return (
    <Paper
      variant="outlined"
      style={_style}
      className={classes.root}
      onClick={onClick}
      {...others}
    >
      <Typography variant={'subtitle1'}>
        {label}
      </Typography>
    </Paper>
  );
}

Square.propTypes = {
  label: TString.isRequired,
  onClick: TFunction,
  style: TObject,
  width: TNumber,
  height: TNumber,
  isOn: TBool,
};

export default Square;
