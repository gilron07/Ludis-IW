import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {UserContext} from "../services/UserContext";
import LocalStorageService from "./LocalStorageService";
import axiosAPI from "./authAxios";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const {user, setUser} = useContext(UserContext)

    return (
        <Route {...rest} render={
             (props) =>{
                if (user) {
                    return <Component {...props}/>
                }
                else {
                    const loggedInUser = LocalStorageService.getAccessToken();
                    if (loggedInUser){
                        // Get user's data from server
                        axiosAPI.post('/token/verify/')
                            .then(user => {
                                console.log("User Verified");
                                setUser(user.data)
                                return <Component {...props}/>
                            });

                    }
                    else{
                        return <Redirect to={
                            {pathname: "/"}
                        }/>
                    }
                }

            }
        }/>
    )
}
