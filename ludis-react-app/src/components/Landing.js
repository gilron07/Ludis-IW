import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Login from './Login';
import Signup from './Signup';

import '../css/Login.css';

const useStyles = makeStyles((theme) => ({
    backgroundImage: {
        width: "60vw",
        transform: "rotate(180deg)"
    },
    ambientBackground : {
        transition: "0.1s",
        height: "100vh",
        width: "calc(60vw - 50px)",
        float: "left",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('xs')]: {
            // transition: "1s",
            width: "0vw",
        },
    },
    loginBackground : {
        transition: "0.1s",
        height: "100vh",
        width: "calc(40vw + 50px)",
        float: "right",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('xs')]: {
            // transition: "1s",
            width: "100vw",
        },
        [theme.breakpoints.up('sm')]: {
    
        },
    },
    loginPage : {
        position: "absolute",
        top: 0,
        left: 0,
    },
}));  

function loginSubmit(email, password) {
  console.log(`email: ` + email);
  console.log(`password: ` + password);
}
  
function Landing() {
    const classes = useStyles();
    const [loginOrSignup, setLoginOrSignup] = React.useState("login");

    function toggleLoginOrSignup() {
      let newState;
      if (loginOrSignup === "login") newState = "signup";
      else newState = "login";
      setLoginOrSignup(newState);
    }
    return (
        <div className={classes.loginPage}>
            <div className={classes.ambientBackground} style={{ minHeight: 350 }}>
                <img
                    src="./assets/court.jpg"
                    className={classes.backgroundImage}
                    style={{minWidth:"max(60vw, calc(64vh + 0px))"}}></img>
            </div>
            <div className={classes.loginBackground} style={{ minHeight: 350 }}>
                {(loginOrSignup === "login")
                 ? <Login
                      toggleFunction={toggleLoginOrSignup}
                      submitFunction={loginSubmit}
                  ></Login>
                 : <Signup
                      toggleFunction={toggleLoginOrSignup}
                  ></Signup>}
            </div> 
        </div>
    );
}

export default Landing;
