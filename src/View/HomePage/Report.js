import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {TObject} from 'Lib/Core/prop_types';
import {TGameReport} from 'Logic/redux/state/game_report';

const useStyles = makeStyles((_status) => ({
  root: {
  },
}));

function Report({
  style = {},
  gameReport,
}) {
  const classes = useStyles();

  if (gameReport.isShow) {
    return (
      <div className={classes.root} style={style}>
        {gameReport.texts.map((text, index) => {
          return (
            <Typography variant={'body1'} key={`record_${index}`}>{text}</Typography>
          );
        })}
      </div>
    );
  } else {
    return (<div/>);
  }
}

Report.propTypes = {
  style: TObject,
  gameReport: TGameReport.isRequired,
};

function mapStateToProps(state) {
  return {
    gameReport: state.gameReport,
  }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
