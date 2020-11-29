import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axiosAPI from '../services/authAxios';
import { useHistory } from "react-router-dom";
import {UserContext} from "../services/UserContext";

import { NavLink } from 'react-router-dom';
import LocalStorageService from "../services/LocalStorageService";

const useStyles = makeStyles((theme) => ({
    loginContainer : {
        width: "70%",
        margin: "auto",
        textAlign: "center",
        padding: "10px 20px 10px 20px",
        boxShadow: "0 0 2px #00000088",
    },
    ludisLogo : {
        height: "100%",
        display: "inline-block",
    },
    titleLogoContainer : {
        height: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "5px",
        // backgroundColor: "red",
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
  

function LoginBox(props) {
    const classes = useStyles();

    // hooks
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const {user, setUser} = useContext(UserContext)

    const history = useHistory();

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    function submitInfo() {
        props.submitFunction(email, password);
    }

    function loginUser() {
        axiosAPI.post('/signin/',{email, password})
            .then((user) =>{
                const tokenobj = {
                    'access_token': user.data.access_token,
                    'refresh_token': user.data.refresh_token
                }
                LocalStorageService.setToken(tokenobj);
                setUser(user.data);
                history.push('/home');
            })
            .catch(err => {
                setError(true);
               console.log(err)
            });
    }
    return (
        <div className={classes.loginContainer} style={{ maxWidth: 300 }}>
            <div className={classes.titleLogoContainer}>
                <img src="/static/ludisLogoFinal.png" alt="logo" className={classes.ludisLogo}/>
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
            />
            <div className={classes.loginLink} style={{textAlign: "right"}}>
                Forgot Password
            </div>
            {error && <p style={{color:'red'}}>Invalid email or password</p>}
            <Button
                color="primary"
                variant="contained"
                style ={{width:'100%', margin: '15px 0'}}
                onClick={loginUser}
            >
                Log in
            </Button>
            <div className={classes.loginLink} onClick={props.toggleFunction}>
                <NavLink to={"signup"}>
                    Create Account
                </NavLink>
            </div>
        </div>
    );
}

export default LoginBox;
