import React from 'react';
import {connect} from 'react-redux'
import {getPublications, searchPublication} from '../../redux/publication';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {getAuthors, getPublicationOfAnAuthor} from '../../redux/author';
import AuthorList from './AuthorList';
import PublicationTable from './PublicationTable';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },


});

class PublicationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authorSelected: null,
      open: false
    }
  }

  componentDidMount() {
    this.reset();
  }

  reset = () => {
    this.props.getPublications();
    this.props.getAuthors();
  };

  /**
   * open drawer
   */
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  /**
   * close drawer
   */
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  /**
   * click on author
   * @param event
   * @param id
   */
  handleClickAuthor = (event, id) => {
    this.setState( {authorSelected: id}, () => {
      this.props.getPublicationOfAnAuthor(id);
    });
  };

  getPublicationToShow = () => {
    const { publicationSearch, publications, authorPublication } = this.props;
    const { authorSelected } = this.state;
    let showPublications;
    if (publicationSearch) {
      showPublications = publicationSearch;
    } else {
      showPublications = authorSelected && authorPublication[authorSelected] ?
        authorPublication[authorSelected] : publications;
    }


    return showPublications;
  };

  onChangeSearch = ( event ) => {
    const query = event.target.value;
    console.log('onchangeSearch', query);
    this.props.searchPublication(query);
  };

  render() {
    const { classes, theme, authors } = this.props;
    const { open } = this.state;
    const showPublications = this.getPublicationToShow();

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Publications
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={this.onChangeSearch}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />

          <AuthorList
            authors={authors}
            onClickAuthor={this.handleClickAuthor}
          />

        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <PublicationTable publications={showPublications} authors={authors}/>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ publication, author }) => ({
  publications: publication.publications,
  authors: author.authors,
  authorPublication: author.authorPublication,
  publicationSearch: publication.publicationSearch,
});

const mapDispatchToProps = {
  getPublications,
  getAuthors,
  getPublicationOfAnAuthor,
  searchPublication
};

PublicationPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(PublicationPage)
);
