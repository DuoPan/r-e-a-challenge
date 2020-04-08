import React, {useEffect} from 'react';
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
import {gameReport} from 'Logic/redux/state/game_report';
import dataStatus from 'Logic/redux/data_status';
import faceDirectionsOptions from 'Logic/dict/faceDirections';

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
  resetTableTop,
  resetReport,
  record,
  show,
  gameOver,
  gameReport
}) {
  const classes = useStyles();
  const LEFT = 1;
  const RIGHT = 2;

  // make sure the final position is recorded after written 'REPORT'
  useEffect(
    () => {
      if (gameReport.status === dataStatus.SUCCESS) {
        record({text: gameProgress.x + ',' + gameProgress.y + ',' + faceDirectionsOptions[gameProgress.face].label.toUpperCase()})
      }
    },
    [
      gameReport.status,
      gameProgress,
      record,
    ]
  );

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
      case gameStatus.FINISH:
        wording = 'Please check the report below.';
        break;
      default:
    }
    return (<Typography variant={'body2'} className={classes.hint}>{wording}</Typography>);
  }

  function handleMove() {
    if (gameProgress.face === faceDirections.NORTH && tableTopSize.safeToNorth.find(location => (location.x === gameProgress.x && location.y === gameProgress.y))) {
      move({x: gameProgress.x + 1, y: gameProgress.y});
      record({text: 'MOVE'});
    } else if (gameProgress.face === faceDirections.SOUTH && tableTopSize.safeToSouth.find(location => (location.x === gameProgress.x && location.y === gameProgress.y))) {
      move({x: gameProgress.x - 1, y: gameProgress.y});
      record({text: 'MOVE'});
    } else if (gameProgress.face === faceDirections.WEST && tableTopSize.safeToWest.find(location => (location.x === gameProgress.x && location.y === gameProgress.y))) {
      move({x: gameProgress.x, y: gameProgress.y - 1});
      record({text: 'MOVE'});
    } else if (gameProgress.face === faceDirections.EAST && tableTopSize.safeToEast.find(location => (location.x === gameProgress.x && location.y === gameProgress.y))) {
      move({x: gameProgress.x, y: gameProgress.y + 1});
      record({text: 'MOVE'});
    }
  }

  function handleRestart() {
    resetGame();
    resetTableTop();
    resetReport();
  }

  function handleReport() {
    record({text: 'REPORT'});
    show();
    gameOver();
  }

  function handleRotate(direction) {
    if (direction === LEFT) {
      rotateLeft();
      record({text: 'LEFT'});
    } else {
      rotateRight();
      record({text: 'RIGHT'});
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant={'h5'} className={classes.title}>Welcome</Typography>
      <Typography variant={'body1'} className={classes.title}>Please <span className={classes.highLight}>enjoy</span> this game.</Typography>
      <div className={classes.row}>
        <Button label={'Place'} Icon={<PanToolIcon/>} onClick={start} disabled={gameProgress.status !== gameStatus.INIT}/>
        <Button label={'Move'} Icon={<DirectionsWalkIcon/>} onClick={handleMove} disabled={gameProgress.status !== gameStatus.RUNNING}/>
        <Button label={'Left'} Icon={<RotateLeftIcon/>} onClick={() => handleRotate(LEFT)} disabled={gameProgress.status !== gameStatus.RUNNING}/>
        <Button label={'Right'} Icon={<RotateRightIcon/>} onClick={() => handleRotate(RIGHT)} disabled={gameProgress.status !== gameStatus.RUNNING}/>
        <Button label={'Report'} Icon={<EventNoteIcon/>} onClick={handleReport} color={'secondary'} disabled={gameProgress.status !== gameStatus.RUNNING}/>
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
    gameReport: state.gameReport,
  }
}

const mapDispatchToProps = {
  start: gameProgress.start,
  move: gameProgress.move,
  rotateLeft: gameProgress.left,
  rotateRight: gameProgress.right,
  resetGame: gameProgress.reset,
  resetTableTop: tableTopSize.reset,
  resetReport: gameReport.reset,
  record: gameReport.record,
  show: gameReport.show,
  gameOver: gameProgress.over,
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
