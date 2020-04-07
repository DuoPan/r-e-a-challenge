import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from 'View/Basic/Button';
import PanToolIcon from '@material-ui/icons/PanTool';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import EventNoteIcon from '@material-ui/icons/EventNote';

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
  },
  highLight: {
    color: theme.design.highLight,
    fontWeight: 'bold',
  },
  button: {
    textTransform: 'none',
  },
}));

function ControlPanel() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant={'h5'} className={classes.title}>Instructions</Typography>
      <Typography variant={'body1'} className={classes.title}>Click these <span className={classes.highLight}>Buttons</span> to play this game.</Typography>
      <div className={classes.row}>
        <Button label={'Place'} Icon={<PanToolIcon />}/>
        <Button label={'Move'} Icon={<DirectionsWalkIcon />}/>
        <Button label={'Left'} Icon={<RotateLeftIcon />}/>
        <Button label={'Right'} Icon={<RotateRightIcon />}/>
        <Button label={'Report'} Icon={<EventNoteIcon />} color={'secondary'}/>
      </div>
    </div>
  );
}

ControlPanel.propTypes = {
};

export default ControlPanel;
