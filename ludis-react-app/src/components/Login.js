import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";

import '../css/Login.css';

class Login extends Component {
    render () {
        return (
            <div>
                <Grid container style={{minHeight:'100vh'}}>
                    <Grid item xs={12} sm={6} >
                        <img
                            src="./assets/court.jpg"
                            style={{width:'100%',height:'100%', objectFit:'cover', overflow:'hidden'}}
                        />
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={6}
                        alignItems="center"
                        direction="column"
                        justify="space-between"
                        style={{padding:10}}
                    >
                        <div/>
                        <div style={{display:'flex', flexDirection:"column", maxWidth:400, minWidth:300}}>
                            <Grid container justify="cetner">
                                <img
                                    src="./assets/ludis-logo2.jpeg"
                                    width={200}
                                    alt="logo"
                                />
                            </Grid>
                            <TextField label="email" margin="normal"/>
                            <TextField label="password" margin="normal"/>
                            <div style={{height:20}}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style ={{width:'100%'}}
                                >
                                    Log in
                                </Button>
                            </div>
                        </div>
                        <div/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Login;


                {/*<Grid containter style={{minHeight: '100vh'}}>*/}
                {/*    <Grid item xs={12} sm={6}>*/}
                {/*        <h1>Okkkk</h1>*/}
                {/*        /!*<img src="./assets/court.jpg" style={{width: '100%', height: '100%', objectFit:'cover'}} alt=""/>*!/*/}
                {/*    </Grid>*/}
                {/*    <Grid*/}
                {/*        container*/}
                {/*        item xs={12}*/}
                {/*        sm={6}*/}
                {/*        allignItems="cetner"*/}
                {/*        direction="column"*/}
                {/*        justify="space-between"*/}
                {/*        style ={{padding: 10}}*/}
                {/*    >*/}

                {/*        <div>*/}
                {/*            <Grid container justify="center">*/}
                {/*                <img src="./assets/ludis-logo.png" style={{width:200}}/>*/}
                {/*            </Grid>*/}
                {/*            <TextField label="email" margin="normal"/>*/}
                {/*            <TextField label="password" margin="normal"/>*/}
                {/*        </div>*/}
                {/*    </Grid>*/}

                {/*</Grid>*/}