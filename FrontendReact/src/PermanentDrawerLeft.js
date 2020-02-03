import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import TableChartIcon from '@material-ui/icons/TableChart';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TodayIcon from '@material-ui/icons/Today';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import { SimpleModal } from './components/SimpleModal';
import { PageCreate } from "./pages/PageCreate";
import { PageTables } from "./pages/PageTables";
import { PageDaily } from "./pages/PageDaily";
import { PageStatistics } from "./pages/PageStatistics";
import { PageEdit } from "./pages/PageEdit";

import { CurrentTime } from './components/CurrentTime';
import AccountMenu from './components/AccountMenu';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { editId } = useParams();
  const [pageTitle, setPageTitle] = useState("");

  const [mainContent, setMainContent] = useState();

  useEffect(() => {
    let page = props.page;
    if (page == 'Edit') {
      page = page + editId;
    }
    console.log(page);
    NavigatePage(page);
  }, [props.page]);

  function NavigatePage(e) {
    let newPageTitle;
    if (e == 'Manage') {
      const pageDsTable = <PageTables openModal={HandleModalOpen} onNavigate={NavigatePage}></PageTables>;
      setMainContent(pageDsTable);
      newPageTitle = e;
    }
    else if (e == 'Create') {
      const pageDsCreate = <PageCreate openModal={HandleModalOpen}></PageCreate>;
      setMainContent(pageDsCreate);
      newPageTitle = e;
    }
    else if (e == 'Daily') {
      const pageDsDaily = <PageDaily openModal={HandleModalOpen}></PageDaily>;
      setMainContent(pageDsDaily);
      newPageTitle = <>Daily Ds <CurrentTime /></>;
    }
    else if (e == 'Statistics') {
      const pageDsStatistics = <PageStatistics openModal={HandleModalOpen}></PageStatistics>;
      setMainContent(pageDsStatistics);
      newPageTitle = e;
    }
    else if (e.includes('Edit')) {
      let id = e.replace('Edit', '');
      const pageDsEdit = <PageEdit id={id} openModal={HandleModalOpen}></PageEdit>;
      setMainContent(pageDsEdit);
      newPageTitle = "Edit Id:" + id;
    }
    setPageTitle(newPageTitle);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to="/">
          <ListItem button key='Manage'>
            <ListItemIcon><TableChartIcon /></ListItemIcon>
            <ListItemText primary='Manage' />
          </ListItem>
        </Link>
        <Link to="/create">
          <ListItem button key='Create'>
            <ListItemIcon><PostAddIcon /></ListItemIcon>
            <ListItemText primary='Create' />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/daily">
          <ListItem button key='DailyDs'>
            <ListItemIcon><TodayIcon /></ListItemIcon>
            <ListItemText primary='Daily Ds' />
          </ListItem>
        </Link>
        <Link to="/statistics">
          <ListItem button key='Statistics'>
            <ListItemIcon><EqualizerIcon /></ListItemIcon>
            <ListItemText primary='Statistics' />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: "MyTitle", body: "Placeholder" });

  function HandleModalOpen(event) {
    setModalMessage(event);
    setModalOpen(true);
  }
  function HandleModalClose() {
    setModalOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid
            justify="space-between" // Add it here :)
            container
            spacing={3}
          >
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6" noWrap>
                {pageTitle}
              </Typography>
            </Grid>
            <Grid item>
              <AccountMenu isLoggedIn={true} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {mainContent}
      </main>
      <SimpleModal message={modalMessage} isOpen={modalOpen} onClose={HandleModalClose} ></SimpleModal>
    </div>
  );
}