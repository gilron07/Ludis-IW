import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField, InputAdornment} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

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

    // hooks
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    function submitInfo() {
        props.submitFunction(email, password);
    }

    return (
        <div className={classes.loginContainer} style={{ maxWidth: 300 }}>
            <div className={classes.titleLogoContainer}>
                <div className={classes.ludisTitle}>Ludis</div>
                <img src="./assets/ludis-logo.png" alt="logo" className={classes.ludisLogo}/>
            </div>
            {/* <div className={classes.actionTitle}>Log In</div> */}
            <TextField
                value={email}
                onChange={updateEmail}
                variant="outlined"
                label="Email"
                margin="dense"
                fullWidth
                size="small"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={
                   {startAdornment: <InputAdornment position="start"><EmailIcon/></InputAdornment>}
                }
            />
            <TextField
                value={password}
                onChange={updatePassword}
                type="password"
                variant="outlined"
                label="Password"
                margin="dense"
                fullWidth
                size="small"
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={
                   {startAdornment: <InputAdornment position="start"><LockIcon/></InputAdornment>}
                }
            />
            <div className={classes.loginLink} style={{textAlign: "right"}}>
                Forgot Password
            </div>
            <Button
                color="primary"
                variant="contained"
                style ={{width:'100%', margin: '15px 0'}}
                onClick={submitInfo}
            >
                Log in
            </Button>
            <div className={classes.loginLink} onClick={props.toggleFunction}>
                Create Account
            </div>
        </div>
    );
}

export default Login;
