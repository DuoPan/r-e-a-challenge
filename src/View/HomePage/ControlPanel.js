import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from 'View/Basic/Button';
import PanToolIcon from '@material-ui/icons/PanTool';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {gameProgress, TGameProgress} from 'Logic/redux/state/game_progress';
import gameStatus from 'Logic/const/gameStatus';
import Compass from 'View/HomePage/Compass';
import faceDirections from 'Logic/const/faceDirections';
import {tableTopSize} from 'Logic/redux/state/table_top_size';

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: 'center',
    marginTop: 30,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    justifyContent: 'center',
  },
  highLight: {
    color: theme.design.highLight,
    fontWeight: 'bold',
  },
  button: {
    textTransform: 'none',
  },
  hint: {
    textAlign: 'center',
    marginTop: 10,
  },
}));

function ControlPanel({
  gameProgress,
  start,
  tableTopSize,
  move,
  rotateLeft,
  rotateRight,
  resetGame,
  resetTableTop
}) {
  const classes = useStyles();

  function renderHint() {
    let wording = '';
    switch (gameProgress.status) {
      case gameStatus.INIT:
        wording = 'Click "Place" to start the game.';
        break;
      case gameStatus.CHOOSE_LOCATION:
        wording = 'Click a square as the start point.';
        break;
      case gameStatus.CHOOSE_FACE:
        wording = 'Click one of the direction as the start face direction.';
        break;
      case gameStatus.RUNNING:
        wording = 'Facing ';
        break;
      default:
    }
    return (<Typography variant={'body2'} className={classes.hint}>{wording}</Typography>);
  }

  function handleMove() {
    if (gameProgress.face === faceDirections.NORTH && tableTopSize.safeToNorth.find(location => (location.x === gameProgress.x && location.y === gameProgress.y))) {
      move({x: gameProgress.x + 1, y: gameProgress.y});
    } else if (gameProgress.face === faceDirections.SOUTH && tableTopSize.safeToSouth.find(location => (location.x === gameProgress.x && location.y === gameProgress.y))) {
      move({x: gameProgress.x - 1, y: gameProgress.y});
    } else if (gameProgress.face === faceDirections.WEST && tableTopSize.safeToWest.find(location => (location.x === gameProgress.x && location.y === gameProgress.y))) {
      move({x: gameProgress.x, y: gameProgress.y - 1});
    } else if (gameProgress.face === faceDirections.EAST && tableTopSize.safeToEast.find(location => (location.x === gameProgress.x && location.y === gameProgress.y))) {
      move({x: gameProgress.x, y: gameProgress.y + 1});
    }
  }

  function handleRestart() {
    resetGame();
    resetTableTop();
  }

  return (
    <div className={classes.root}>
      <Typography variant={'h5'} className={classes.title}>Welcome</Typography>
      <Typography variant={'body1'} className={classes.title}>Please <span className={classes.highLight}>enjoy</span> this game.</Typography>
      <div className={classes.row}>
        <Button label={'Place'} Icon={<PanToolIcon/>} onClick={start} disabled={gameProgress.status !== gameStatus.INIT}/>
        <Button label={'Move'} Icon={<DirectionsWalkIcon/>} onClick={handleMove} disabled={gameProgress.status !== gameStatus.RUNNING}/>
        <Button label={'Left'} Icon={<RotateLeftIcon/>} onClick={rotateLeft} disabled={gameProgress.status !== gameStatus.RUNNING}/>
        <Button label={'Right'} Icon={<RotateRightIcon/>} onClick={rotateRight} disabled={gameProgress.status !== gameStatus.RUNNING}/>
        <Button label={'Report'} Icon={<EventNoteIcon/>} color={'secondary'} disabled={gameProgress.status !== gameStatus.RUNNING}/>
        <Button label={'Restart'} Icon={<EventNoteIcon/>} onClick={handleRestart} disabled={gameProgress.status === gameStatus.INIT}/>
      </div>
      <div className={classes.row}>
        {renderHint()}
        <Compass/>
      </div>
    </div>
  );
}

ControlPanel.propTypes = {
  gameProgress: TGameProgress.isRequired,
};

function mapStateToProps(state) {
  return {
    gameProgress: state.gameProgress,
    tableTopSize: state.tableTopSize,
  }
}

const mapDispatchToProps = {
  start: gameProgress.start,
  move: gameProgress.move,
  rotateLeft: gameProgress.left,
  rotateRight: gameProgress.right,
  resetGame: gameProgress.reset,
  resetTableTop: tableTopSize.reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
