import React from 'react';
<<<<<<< Updated upstream
import '../css/Navigation.css';
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div id="navigation-menu">
          <NavLink to="/">Home</NavLink><br></br>
          <NavLink to="/about">About</NavLink><br></br>
          <NavLink to="/contact">Contact</NavLink><br></br>
       </div>
    );
=======
import clsx from 'clsx';
import '../css/Navigation.css';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

// icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
  list: {
    width: 250,
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

  const icons = ['HomeIcon'];

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['home', 'workouts', 'leaderboards'].map((text, index) => (
          <NavLink to={text}>
          <ListItem button key={text}>
            <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </NavLink>
        ))}
      </List>
      <Divider />

      <List>
        {['settings'].map((text, index) => (
          <NavLink to={text}>
          <ListItem button key={text}>
            <ListItemIcon>{<MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div id="menu-icon" onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={{ fontSize: 30 }} />
          </div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
>>>>>>> Stashed changes
}
 
export default Navigation;