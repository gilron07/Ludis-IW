import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import axiosAPI from '../services/authAxios';
import { NavLink } from 'react-router-dom';

// icons
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const useStyles = makeStyles((theme) => ({
    loginContainer : {
        width: "70%",
        margin: "auto",
        textAlign: "center",
        padding: "10px 20px 10px 20px",
        boxShadow: "0 0 2px #00000088",
    },
    ludisLogo : {
        display: "inline-block",
        height: "100%"
    },
    titleLogoContainer : {
        height: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
    },
    loginLink : {
        fontSize: "12px",
        width: "100%",
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
        paddingTop: "5px",
    },
    buttonProgress: {
        color: "primary",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        position: 'relative',
    },
}));  
  

function SignupBox(props) {
    const classes = useStyles();
    const [signupPage, setSignupPage] = React.useState(0);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [teamCode, setTeamCode] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [birthdate, setBirthdate] = React.useState("");
    const [athleteOrCoach, setAthleteOrCoach] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const history = useHistory();

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
        const data = {
            email,
            password,
            full_name: fullName,
            DOB: birthdate,
            organization_code: teamCode.toUpperCase(),
            role: role.toUpperCase()
        }
        setLoading(true);
        axiosAPI.post('/signup/', data)
            .then(res => {
                setLoading(false);
                history.push('/login')
            })
            .catch(err =>{
                setLoading(false);
                console.log(err);
            });

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
                            maxLength: 7,
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
                    value={birthdate}
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

    function formComplete() {
        if (email.trim() === "" ||
            password.trim() === "" ||
            fullName.trim() === "" ||
            teamCode.length !== 7 ||
            birthdate === "")
            return true;
        return false;
    }

    return (
        <div className={classes.loginContainer} style={{ maxWidth: 300 }}>
            <div className={classes.titleLogoContainer}>
                <img src="/static/ludisLogoFinal.png" alt="logo" className={classes.ludisLogo}/>
            </div>
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
            <div className={classes.wrapper}>
                <Button
                    color="primary"
                    variant="contained"
                    style ={{width:'100%', margin: '15px 0'}}
                    onClick={submitInfo}
                    disabled={loading || formComplete()}
                >
                    Sign Up
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>

            <div className={classes.loginLink} onClick={props.toggleFunction}>
                <NavLink to={"login"}>
                    Already have an account? Log In
                </NavLink>
            </div>
        </div>
    );
}

export default SignupBox;
