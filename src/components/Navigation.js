import React, {useContext} from 'react';
import clsx from 'clsx';
import '../css/Navigation.css';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {UserContext} from "../services/UserContext";

// icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PeopleIcon from '@material-ui/icons/People';
import HelpIcon from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalStorageService from "../services/LocalStorageService";

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

  const {user, setUser} = useContext(UserContext)
  // const [user, setUser] = React.useState({"role" : "coach"});

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

  function logoutFunction() {
    LocalStorageService.clearToken();
    setUser(null);
  }

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
    about: {
      title: 'About',
      link: 'about',
      icon: <HelpIcon/>
    },
    logout: {
      title: 'Logout',
      link: '',
      icon: <ExitToAppIcon/>
    }
  };

  let relevantPages;
  if (user.role.toLowerCase() === "coach") {
    relevantPages = ['home', 'workouts', 'leaderboards', 'about', 'logout'];
  }
  else {
    relevantPages = ['home', 'leaderboards', 'about', 'logout'];
  }

  
  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div id="profile-wrapper">
        <img id="nav-profile-avatar" src="/static/default-avatar.png"></img>
        <div id="user-name">
          {user.full_name}
        </div>
        <div id="user-team">
          {user.organization}
        </div>
      </div>
      <List>
        {relevantPages.map((text, index) => (
          // if logout, for the navlink have onClick={function}
          (text === "logout") 
          ? <NavLink onClick={logoutFunction} to={pages[text].link} className="nav-link" key={index}>
              <Divider />
              <ListItem button key={text} >
                <ListItemIcon>{pages[text].icon}</ListItemIcon>
                <ListItemText primary={pages[text].title} />
              </ListItem>
            </NavLink>
          : <NavLink to={pages[text].link} className="nav-link" key={index}>
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
