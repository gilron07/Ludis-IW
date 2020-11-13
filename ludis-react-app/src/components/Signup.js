import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import '../css/Login.css';

const useStyles = makeStyles((theme) => ({
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
        fontSize: "40px",
        display: "inline-block",
    },
    titleLogoContainer : {
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
    actionTitle : {
        fontSize: "15px",
        color: "#00000066",
    }
}));  
  

function Login(props) {
    const classes = useStyles();
    return (
        <div className={classes.loginContainer} style={{ maxWidth: 300 }}>
            <div className={classes.titleLogoContainer}>
                <div className={classes.ludisTitle}>Ludis</div>
                <img src="./assets/ludis-logo.png" alt="logo" className={classes.ludisLogo}/>
            </div>
            <div className={classes.actionTitle}>Sign Up</div>
            <TextField variant="outlined" label="Email" margin="dense" fullWidth size="small"/>
            <TextField variant="outlined" label="Password" margin="dense" fullWidth size="small"/>
            <TextField variant="outlined" label="Team Code" margin="dense" fullWidth size="small"/>
            <Button
                color="primary"
                variant="contained"
                style ={{width:'100%', margin: '15px 0'}}
            >
                Sign Up
            </Button>
            <div className={classes.loginLink} onClick={props.toggleFunction}>
                Already have an account? Log In
            </div>
        </div>
    );
}

export default Login;
