import React, {useEffect} from 'react';
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
import {tableTopSize} from 'Logic/redux/state/table_top_size';
import dataStatus from 'Logic/redux/data_status';
import {gameReport} from 'Logic/redux/state/game_report';

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
  tableTopSize,
  setSize,
  record,
}) {
  let _status = gameProgress.status;
  const classes = useStyles({_status});

  useEffect(
    () => {
      if (tableTopSize.status === dataStatus.INIT) {
        if (!(Number.isInteger(row) && row >= 1 && Number.isInteger(column) && column >= 1)) {
          setSize({rows: 5, columns: 5});
        } else {
          setSize({rows: row, columns: column});
        }
      }
    },
    [
      tableTopSize.status,
      setSize,
      row,
      column,
    ]
  );

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
  function renderRow(y) {
    let cols = [];
    for (let i = 0; i < column; ++ i) {
      cols.push(<Square label={`${i},${y}`} width={cellSize} height={cellSize} onClick={() => handleClickSquare(i, y)} isOn={gameProgress.y === y && gameProgress.x === i}/>);
    }
    return (
      <div className={classes.row}>
        {cols.map((item, index) => {
          return (
            <div key={`col_${y}_${index}`}>
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
      record({text: 'PLACE ' + gameProgress.x + ',' + gameProgress.y + ',' + faceDirectionsOptions[direction].label.toUpperCase()});
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
    tableTopSize: state.tableTopSize,
  }
}

const mapDispatchToProps = {
  selectLocation: gameProgress.selectLocation,
  selectFace: gameProgress.selectFace,
  setSize: tableTopSize.set,
  record: gameReport.record,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableTop);
