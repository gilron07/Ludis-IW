import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.down('sm')]: {
            // transition: "1s",
            width: "100vw",
        },
        [theme.breakpoints.up('md')]: {
    
        },
    },
    loginContainer : {
        width: "70%",
        margin: "auto",
        textAlign: "center",
        padding: "30px 20px 10px 20px",
        boxShadow: "0 0 2px #00000088",
    },
    ludisLogo : {
        width: "60px",
        display: "inline-block",
    },
    ludisTitle : {
        display: "inline-block",
    },
    titleLogoContainer : {
        fontSize: "35px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5px",
    },
    loginLink : {
        fontSize: "12px",
        width: "100%",
        color: "#00000066",
    },
    loginPage : {
        position: "absolute",
        top: 0,
        left: 0,
    }
}));  
  

function Login() {
    const classes = useStyles();
    return (
        <div className={classes.loginPage}>
            <div className={classes.ambientBackground} style={{ minHeight: 350 }}>
                <img
                    src="./assets/court.jpg"
                    className={classes.backgroundImage}
                    style={{minWidth:"max(60vw, calc(64vh + 0px))"}}></img>
            </div>
            <div className={classes.loginBackground} style={{ minHeight: 350 }}>
                <div className={classes.loginContainer} style={{ maxWidth: 300 }}>
                    <div className={classes.titleLogoContainer}>
                        <div className={classes.ludisTitle}>Ludis</div>
                        <img src="./assets/ludis-logo.png" alt="logo" className={classes.ludisLogo}/>
                    </div>
                    <TextField variant="outlined" label="Email" margin="dense" fullWidth size="small"/>
                    <TextField variant="outlined" label="Password" margin="dense" fullWidth size="small"/>
                    <div className={classes.loginLink} style={{textAlign: "right"}}>
                        Forgot Password
                    </div>
                    <Button
                        color="primary"
                        variant="contained"
                        style ={{width:'100%', margin: '15px 0'}}
                    >
                        Log in
                    </Button>
                    <div className={classes.loginLink}>
                        Create Account
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default Login;
