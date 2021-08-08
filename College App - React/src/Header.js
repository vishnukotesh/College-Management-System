import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService';
import { withRouter } from "react-router";

class Header extends Component{

   

    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();


        return(
            <div className="container">
                <header>
                    <nav className="navbar navbar-inverse">
                        <ul className=" nav navbar-nav">
                            <li><Link className="nav-link" to="/home">Home</Link></li>

                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                        </ul>

                    </nav>
                </header>
            </div>
        );
    }
}

export default withRouter(Header);