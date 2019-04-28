import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

function createData(id, date, authorId, title, authors) {
  const author = authors.find( a => a.id === authorId);
  const authorNameAndEmail = (author && (author.firstName + ', ' + author.email)) || 'Not Found';
  return { id, date, author: authorNameAndEmail , title };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'author', numeric: false, disablePadding: false, label: 'Author' },
  { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
];

class PublicationTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

PublicationTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let PublicationTableToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Nutrition
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

PublicationTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

PublicationTableToolbar = withStyles(toolbarStyles)(PublicationTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class PublicationTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'date',
    data: [],
    page: 0,
    rowsPerPage: 5,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.isPublicationsLoadInProps(prevProps.publications, this.props.publications) &&
      this.props.authors && this.props.authors.length > 0) {
      this.updatePublications(this.props.publications, this.props.authors);
    }

    if (this.isAuthorsLoadInProps(prevProps.authors, this.props.authors) &&
      this.props.publications && this.props.publications.length > 0) {
      this.updatePublications(this.props.publications, this.props.authors);
    }
  }

  isPublicationsLoadInProps = (oldPublications, newPublications) =>
    newPublications &&
    newPublications != oldPublications &&
    newPublications.length > 0;

  isAuthorsLoadInProps = (oldAuthors, newAuthors) =>
    newAuthors &&
    newAuthors != oldAuthors &&
    newAuthors.length > 0;

  updatePublications = (publications, authors) => {
    const publicationsWithAuthor = publications.map( p =>
      createData(p.id, p.date, p.authorId, p.title, authors));
    this.setState({data: publicationsWithAuthor})
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <PublicationTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  // const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell align="left">{n.date}</TableCell>
                      <TableCell align="left">{n.author}</TableCell>
                      <TableCell align="left">{n.title}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

PublicationTable.propTypes = {
  classes: PropTypes.object.isRequired,
  publications: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
};

export default withStyles(styles)(PublicationTable);
