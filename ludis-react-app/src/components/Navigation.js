import React from 'react';
import clsx from 'clsx';
import '../css/Navigation.css';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
  list: {
    width: 275,
    textDecoration: 'none',
    color: 'black'
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }


    // rotate hamburger
    if (open === true) {
      document.getElementById("menu-icon").style.transform = 'rotate(-90deg)';
    } else if (open === false) {
      document.getElementById("menu-icon").style.transform = 'rotate(0deg)';
    }
  
    setState({ ...state, [anchor]: open });
  };

  const pages = {
    home: {
      title: 'Home',
      link: 'home',
      icon: <HomeIcon/>
    },
    workouts: {
      title: 'Workouts',
      link: 'workouts',
      icon: <FitnessCenterIcon/>
    },
    leaderboards: {
      title: 'Leaderboards',
      link: 'leaderboards',
      icon: <PeopleIcon/>
    },
    settings: {
      title: 'Settings',
      link: 'settings',
      icon: <SettingsIcon/>
    },
    logout: {
      title: 'Logout',
      link: '',
      icon: <ExitToAppIcon/>
    }
  };
  
  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div id="profile-wrapper">
        <img id="nav-profile-avatar" src="default-avatar.png"></img>
        <div id="user-name">
          Gilron Tsabkevich
        </div>
        <div id="user-team">
          Princeton University Track & Field
        </div>
      </div>
      <List>
        {['home', 'workouts', 'leaderboards', 'settings', 'logout'].map((text, index) => (
          <NavLink to={pages[text].link} className="nav-link" key={index}>
            <Divider />
          <ListItem button key={text} >
            <ListItemIcon>{pages[text].icon}</ListItemIcon>
            <ListItemText primary={pages[text].title} />
          </ListItem>
        </NavLink>
        ))}
        <Divider />
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={'left'}>
          <div id="menu-icon" onClick={toggleDrawer('left', true)}>
            <MenuIcon style={{ fontSize: 30 }} />
          </div>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
  );

}
