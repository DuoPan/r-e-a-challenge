import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {TNumber, TObject} from 'Lib/Core/prop_types';
import Square from 'View/Basic/Square';

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: 'center',
    textAlign: 'center',
    margin: 30,
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
  north: {
    marginBottom: 20,
  },
  south: {
    marginTop: 20,
  },
  west: {
    marginRight: 20,
  },
  east: {
    marginLeft: 20,
  }
}));

function TableTop({
  row = 5,
  column = 5,
  cellSize = 100,
  style = {},
}) {
  const classes = useStyles();

  // set default value if the user input is wrong
  if (!(Number.isInteger(row) && row >= 1 && Number.isInteger(column) && column >= 1)) {
    row = 5;
    column = 5;
  }

  // render a single row
  function renderRow(x) {
    let cols = [];
    for (let i = 0; i < column; ++ i) {
      cols.push(<Square label={`${x},${i}`} width={cellSize} height={cellSize}/>);
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
      <div className={classes.col}>
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

  return (
    <div className={classes.root} style={style}>
      <Typography variant={'h6'} className={classes.north}>North</Typography>
      <div className={classes.row}>
        <Typography variant={'h6'} className={classes.west}>West</Typography>
        {renderAllRows()}
        <Typography variant={'h6'} className={classes.east}>East</Typography>
      </div>
      <Typography variant={'h6'} className={classes.south}>South</Typography>
    </div>
  );
}

TableTop.propTypes = {
  row: TNumber,
  column: TNumber,
  cellSize: TNumber,
  style: TObject,
};

export default TableTop;
