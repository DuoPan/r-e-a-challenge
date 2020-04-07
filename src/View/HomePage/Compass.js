import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowRightIcon from '@material-ui/icons/ArrowForward';
import ArrowLeftIcon from '@material-ui/icons/ArrowBack';
import {TObject} from 'Lib/Core/prop_types';
import gameStatus from 'Logic/const/gameStatus';
import {TGameProgress} from 'Logic/redux/state/game_progress';
import faceDirections from 'Logic/const/faceDirections';

const useStyles = makeStyles((_status) => ({
  root: {
    paddingTop: 8,
    paddingLeft: 8,
  },
}));

function Compass({
  style = {},
  gameProgress,
}) {
  const classes = useStyles();

  if (gameProgress.status !== gameStatus.RUNNING) {
    return (<div/>);
  }

  let _icon = null;
  if (gameProgress.face === faceDirections.NORTH) {
    _icon = (<ArrowUpwardIcon/>);
  } else if (gameProgress.face === faceDirections.SOUTH) {
    _icon = (<ArrowDownwardIcon/>);
  } else if (gameProgress.face === faceDirections.WEST) {
    _icon = (<ArrowLeftIcon/>);
  } else if (gameProgress.face === faceDirections.EAST) {
    _icon = (<ArrowRightIcon/>);
  }

  return (
    <div className={classes.root} style={style}>
      {_icon}
    </div>
  );
}

Compass.propTypes = {
  gameProgress: TGameProgress.isRequired,
  style: TObject,
};

function mapStateToProps(state) {
  return {
    gameProgress: state.gameProgress,
  }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Compass);
