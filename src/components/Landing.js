import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginBox from './LoginBox';
import SignupBox from './SignupBox';
import LeaderboardModal from './LeaderboardModal';

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
  
function Landing(props) {
    const classes = useStyles();
    const loginOrSignup= props.loginOrSignup;

    function toggleLoginOrSignup() {
      let newState;
      if (loginOrSignup === "login") newState = "signup";
      else newState = "login";
    }
    return (
        <div className={classes.loginPage}>
            <div className={classes.ambientBackground} style={{ minHeight: 350 }}>
                <img
                    src="/static/court.jpg"
                    className={classes.backgroundImage}
                    style={{minWidth:"max(60vw, calc(64vh + 0px))"}}></img>
            </div>
            <div className={classes.loginBackground} style={{ minHeight: 350 }}>
                {(loginOrSignup === "login")
                 ? <LoginBox
                      toggleFunction={toggleLoginOrSignup}
                      submitFunction={loginSubmit}
                  ></LoginBox>
                 : <SignupBox
                      toggleFunction={toggleLoginOrSignup}
                  ></SignupBox>}
            </div>
            <LeaderboardModal></LeaderboardModal>
        </div>
    );
}

export default Landing;
