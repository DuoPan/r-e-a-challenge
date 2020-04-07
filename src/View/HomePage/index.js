import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import ControlPanel from './ControlPanel';
import TableTop from 'View/HomePage/TableTop';
import {gameProgress, TGameProgress} from 'Logic/redux/state/game_progress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10%',
    marginRight: '10%',
  },
}));

function HomePage({
  gameProgress,
  start,
}) {
  const classes = useStyles();
  // console.log(gameProgress);
  return (
    <div className={classes.root}>
      <ControlPanel/>
      <TableTop cellSize={150}/>
    </div>
  );
}

HomePage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
