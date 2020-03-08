import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import WorkOffIcon from "@material-ui/icons/WorkOff";
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import DialogImage from './DialogImage';
import { filter } from '../actions/inhabitants'
import Avatar from "@material-ui/core/Avatar";
import { DispatchContext, StateContext } from '../App';
import InhabitantsEnhancedTableHead from './InhabitantsEnhancedTableHead';
import { getAlign, getPadding } from './constants';
import TableToolbar from './InhabitantsTableToolbar';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  }
}));

export default function() {
  const classes = useStyles();

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { inhabitantsState: {all, hiddenIds } } = state;

  const [rows, setRows] = useState(all);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name, id) => {
    setDialogImageProps({
      open: true,
      gnome: all.filter(e => {
        return e.id === id;
      })[0],
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    setRows(() => {
      if (filteredText === '') return all;
      return all.filter(e => {
        return !hiddenIds.includes(e.id);
      });
    });
  // eslint-disable-next-line
  }, [all, hiddenIds]);

  let filteredText;
  const onFilterChange = text => {
    filteredText = text;

    dispatch(filter(text))
  };

  const [dialogImageProps, setDialogImageProps] = useState({
    open: false,
    gnome: {},
  });

  const handleCloseDialogImage = () => {
    setDialogImageProps(prev => {return {...prev, open: false}});
  };

  return (<>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar filterChange={onFilterChange} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table">
            <InhabitantsEnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort} />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  if (row.hide) return null;
                  const labelId = `enhanced-table-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name, row.id)}
                      tabIndex={-1}
                      key={row.id}>
                      <TableCell align={getAlign('thumbnail')} padding={getPadding('thumbnail')}>
                        {/*<Avatar alt={row.name} src={'https://source.unsplash.com/random?sig=' + Math.random()*100} /> Used when server returned error 503 Service temporarily unavailable*/}
                        <Avatar alt={row.name} src={row.thumbnail} />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row"  padding={getPadding('name')} align={getAlign('name')}>
                        {row.name}
                      </TableCell>
                      <TableCell align={getAlign('age')} padding={getPadding('age')}>{row.age}</TableCell>
                      <TableCell align={getAlign('weight')} padding={getPadding('weight')}>{row.weight.toFixed(2)}</TableCell>
                      <TableCell align={getAlign('height')} padding={getPadding('height')}>{row.height.toFixed(2)}</TableCell>
                      <TableCell style={{color: row.hair_color}} align={getAlign('hair_color')} padding={getPadding('hair_color')}>{row.hair_color}</TableCell>
                      <TableCell align={getAlign('professions')} padding={getPadding('professions')}>{row.professions.join(', ') || <WorkOffIcon />}</TableCell>
                      <TableCell align={getAlign('friends')} padding={getPadding('friends')}>{row.friends.join(', ') || <SentimentDissatisfiedIcon style={{color: row.hair_color}} />}</TableCell>
                      <TableCell align={getAlign('gender')} padding={getPadding('gender')}>{row.gender === 'male'? <IoMdMale /> : <IoMdFemale />}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length > 0 && <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />}
      </Paper>
    </div>
    <DialogImage onClose={handleCloseDialogImage} {...dialogImageProps} />
  </>);
}