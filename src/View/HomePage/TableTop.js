import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {TNumber, TObject} from 'Lib/Core/prop_types';
import Square from 'View/Basic/Square';
import gameStatus from 'Logic/const/gameStatus';
import {gameProgress, TGameProgress} from 'Logic/redux/state/game_progress';
import faceDirections from 'Logic/const/faceDirections';
import faceDirectionsOptions from 'Logic/dict/faceDirections';
import theme from 'theme';

const useStyles = makeStyles((_status) => ({
  root: {
    margin: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: ({_status}) => _status === gameStatus.CHOOSE_LOCATION ? 'crosshair' : null,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  directions: {
    width: 'fit-content',
    padding: 10,
    borderRadius: 10,
    backgroundColor: ({_status}) => _status === gameStatus.CHOOSE_FACE ? theme.palette.primary[500]: null,
    cursor: ({_status}) => _status === gameStatus.CHOOSE_FACE ? 'pointer' : null,
  },
}));

function TableTop({
  row = 5,
  column = 5,
  cellSize = 100,
  style = {},
  gameProgress,
  selectLocation,
  selectFace,
}) {
  let _status = gameProgress.status;
  const classes = useStyles({_status});

  // set default value if the user input is wrong
  if (!(Number.isInteger(row) && row >= 1 && Number.isInteger(column) && column >= 1)) {
    row = 5;
    column = 5;
  }

  function handleClickSquare(x, y) {
    if (gameProgress.status === gameStatus.CHOOSE_LOCATION) {
      // console.log('Choose ' + x + ',' + y);
      selectLocation({x, y});
    }
  }

  // render a single row
  function renderRow(x) {
    let cols = [];
    for (let i = 0; i < column; ++ i) {
      cols.push(<Square label={`${x},${i}`} width={cellSize} height={cellSize} onClick={() => handleClickSquare(x, i)} isOn={gameProgress.x === x && gameProgress.y === i}/>);
    }
    return (
      <div className={classes.row}>
        {cols.map((item, index) => {
          return (
            <div key={`col_${x}_${index}`}>
              {item}
            </div>
          );
        })}
      </div>
    );
  }

  // render the whole table top.
  function renderAllRows() {
    let rows = [];
    for (let i = row - 1; i >= 0; -- i) {
      rows.push(renderRow(i));
    }
    return (
      <div className={classes.col} style={{margin: 20}}>
        {rows.map((item, index) => {
          return (
            <div key={`row_${index}`}>
              {item}
            </div>
          );
        })}
      </div>
    );
  }

  function handleClickDirection(label, direction) {
    if (gameProgress.status === gameStatus.CHOOSE_FACE) {
      // console.log('Choose ' + label + ',' + direction);
      selectFace({face: direction});
    }
  }

  function renderDirectionText(direction) {
    const _label = faceDirectionsOptions[direction].label;
    return (<Typography variant={'h6'} className={classes.directions} onClick={() => handleClickDirection(_label, direction)}>{_label}</Typography>);
  }

  return (
    <div className={classes.root} style={style}>
      {renderDirectionText(faceDirections.NORTH)}
      <div className={classes.row}>
        {renderDirectionText(faceDirections.WEST)}
        {renderAllRows()}
        {renderDirectionText(faceDirections.EAST)}
      </div>
      {renderDirectionText(faceDirections.SOUTH)}
    </div>
  );
}

TableTop.propTypes = {
  row: TNumber,
  column: TNumber,
  cellSize: TNumber,
  style: TObject,
  gameProgress: TGameProgress.isRequired,
};

function mapStateToProps(state) {
  return {
    gameProgress: state.gameProgress,
  }
}

const mapDispatchToProps = {
  selectLocation: gameProgress.selectLocation,
  selectFace: gameProgress.selectFace,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableTop);