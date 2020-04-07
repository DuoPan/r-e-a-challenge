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
    // console.log('nnn')
  }

  return (
    <div className={classes.root}>
      <Typography variant={'h5'} className={classes.title}>Welcome</Typography>
      <Typography variant={'body1'} className={classes.title}>Please <span className={classes.highLight}>enjoy</span> this game.</Typography>
      <div className={classes.row}>
        <Button label={'Place'} Icon={<PanToolIcon/>} onClick={start} disabled={gameProgress.status !== gameStatus.INIT}/>
        <Button label={'Move'} Icon={<DirectionsWalkIcon/>} onClick={handleMove} disabled={gameProgress.status !== gameStatus.RUNNING}/>
        <Button label={'Left'} Icon={<RotateLeftIcon/>} disabled={gameProgress.status !== gameStatus.RUNNING}/>
        <Button label={'Right'} Icon={<RotateRightIcon/>} disabled={gameProgress.status !== gameStatus.RUNNING}/>
        <Button label={'Report'} Icon={<EventNoteIcon/>} color={'secondary'} disabled={gameProgress.status !== gameStatus.RUNNING}/>
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
  }
}

const mapDispatchToProps = {
  start: gameProgress.start,
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
