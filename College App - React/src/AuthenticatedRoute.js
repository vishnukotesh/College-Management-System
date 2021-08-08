import React,{Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthenticationService from './AuthenticationService';

class AuthenticatedRoute extends Component{

    render(){

        if(AuthenticationService.isUserLoggedIn()){
            return <Route {...this.props}></Route>
        }
        else{
            return <Redirect to="/home"></Redirect>
        }
    }

}

export default AuthenticatedRoute;