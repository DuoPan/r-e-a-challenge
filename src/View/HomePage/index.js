import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ControlPanel from './ControlPanel';
import TableTop from 'View/HomePage/TableTop';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10%',
    marginRight: '10%',
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ControlPanel/>
      <TableTop cellSize={150}/>
    </div>
  );
}

HomePage.propTypes = {
};

export default HomePage;
