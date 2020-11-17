import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { NavLink } from 'react-router-dom';

// icons
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

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
    },
    DOBparenthesis : {
        color: "#00000066",
        fontSize: "25px",
        margin: "5px 4%",
        paddingTop: "7px",
        display: "inline-block"
    },
    sectionLabel : {
        color: "#000000cc",
        display: "block",
        paddingBottom: "3px",
    },
    pageContainer : {
        height: "175px",
        // backgroundColor: "red",
        paddingTop: "20px",
    },
}));  
  

function SignupBox(props) {
    const classes = useStyles();
    const [signupPage, setSignupPage] = React.useState(0);

    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [teamCode, setTeamCode] = React.useState(null);
    const [fullName, setFullName] = React.useState(null);
    const [birthdate, setBirthdate] = React.useState(null);
    const [athleteOrCoach, setAthleteOrCoach] = React.useState(0);

    function toggleSignupPage() {
        if (signupPage === 0) setSignupPage(1);
        else setSignupPage(0);
    }

    const updateEmail = (e) => { setEmail(e.target.value); }
    const updatePassword = (e) => { setPassword(e.target.value); }
    const updateTeamCode = (e) => { setTeamCode(e.target.value); }
    const updateFullName = (e) => { setFullName(e.target.value); }
    const updateBirthdate = (e) => { setBirthdate(e.target.value);
    }

    const toggleAthleteOrCoach = (e) => {
        if (typeof e.currentTarget.id !== "string") return;
        setAthleteOrCoach(parseInt(e.currentTarget.id));
    }

    function submitInfo() {
        let role;
        if (athleteOrCoach === 0) role = "athlete";
        else role = "coach";
        console.log(`email: ` + email);
        console.log(`password: ` + password);
        console.log(`team code: ` + teamCode);
        console.log(`full name: ` + fullName);
        console.log(`birthdate: ` + birthdate);
        console.log(`role: ` + role);
    }

    function generateSignupPage() {
        if (signupPage === 0) {
            return(
                <div>
                    <TextField value={email} onChange={updateEmail} variant="outlined" label="Email" margin="dense" fullWidth size="small"/>
                    <TextField
                        value={password}
                        onChange={updatePassword}
                        variant="outlined"
                        label="Password"
                        margin="dense"
                        fullWidth
                        size="small"
                    />
                    <TextField
                        value={teamCode}
                        onChange={updateTeamCode}
                        variant="outlined"
                        label="Team Code"
                        margin="dense"
                        fullWidth size="small"
                        style = {{width: "150px"}}
                        inputProps={{
                            maxLength: 6,
                            style: {
                                textTransform: 'uppercase',
                                textAlign: 'center',
                            }
                        }}
                    />
                </div>
            )
        }
        else if (signupPage === 1) {
            return (
                <div>
                <TextField value={fullName} onChange={updateFullName} variant="outlined" label="Full Name" margin="dense" fullWidth size="small"/>
                <TextField
                    // value={birthdate}
                    onChange={updateBirthdate}
                    type="date"
                    variant="outlined"
                    label="Date of Birth"
                    margin="dense"
                    fullWidth
                    size="small"
                    style = {{
                        marginBottom: "10px"
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <div>
                    <span className={classes.sectionLabel}>I am a</span>
                    {athleteOrCoach
                        ? <Button variant="contained" style={{margin: "0 10px", height: 25}} onClick={toggleAthleteOrCoach} id={0}>Athlete</Button>
                        : <Button color="primary" variant="contained" style={{margin: "0 10px", height: 25}} onClick={toggleAthleteOrCoach} id={0}>Athlete</Button>
                    }
                    {athleteOrCoach
                        ? <Button color="primary" variant="contained" style={{margin: "0 10px", height: 25}} onClick={toggleAthleteOrCoach} id={1}>Coach</Button>
                        : <Button variant="contained" style={{margin: "0 10px", height: 25}} onClick={toggleAthleteOrCoach} id={1}>Coach</Button>
                    }
                </div>
            </div>
            )
        }
    }

    return (
        <div className={classes.loginContainer} style={{ maxWidth: 300 }}>
            <div className={classes.titleLogoContainer}>
                <div className={classes.ludisTitle}>Ludis</div>
                <img src="./assets/ludis-logo.png" alt="logo" className={classes.ludisLogo}/>
            </div>
            {/* <div className={classes.actionTitle}>Sign Up</div> */}
            <div className={classes.pageContainer}>
            {generateSignupPage()}
            </div>
            <div>
                <IconButton size="small" onClick={toggleSignupPage}>
                    <ArrowLeftIcon></ArrowLeftIcon>
                </IconButton>
                {signupPage
                    ? <span style={{color: "#00000088", margin:"1.5%"}}>&#x2022;</span>
                    : <span style={{color: "orange", margin:"1.5%"}}>&#x2022;</span>
                }
                {signupPage
                    ? <span style={{color: "orange", margin:"1.5%"}}>&#x2022;</span>
                    : <span style={{color: "#00000088", margin:"1.5%"}}>&#x2022;</span>
                }
                <IconButton size="small" onClick={toggleSignupPage}>
                    <ArrowRightIcon></ArrowRightIcon>
                </IconButton>
            </div>
            <Button
                color="primary"
                variant="contained"
                style ={{width:'100%', margin: '15px 0'}}
                onClick={submitInfo}
            >
                Sign Up
            </Button>
            <div className={classes.loginLink} onClick={props.toggleFunction}>
                <NavLink to={"login"}>
                    Already have an account? Log In
                </NavLink>
            </div>
        </div>
    );
}

export default SignupBox;