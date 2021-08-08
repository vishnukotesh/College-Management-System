import React,{Component} from 'react';
import { withRouter } from "react-router";
import AuthenticationService from './AuthenticationService';
import RESTService from './RESTService';

class Login extends Component{

    constructor(props){
        super(props);
        this.state={userName:"",password:"",
        errorMessage:"",showError:false,typeOfLogin:"student"};

        this.handleOnChange=this.handleOnChange.bind(this);
        this.handleOnClick=this.handleOnClick.bind(this);
    
    }

    handleOnChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        );
        

    }

    handleOnClick(){
        
        if(!this.state.userName){
            this.setState(
                {
                    errorMessage:"Please enter a username",
                    showError:true
                    
                }
            )
        }
        if(!this.state.password ){
            this.setState(
                {
                    errorMessage:"Please enter a password",
                    showError:true
                    
                }
            )
        }

        if(this.state.typeOfLogin==="student"){

            RESTService.authenticateStudent(this.state.userName,this.state.password)
            .then(

                (response) => {
                   

                    if(response.data==="valid"){
                        AuthenticationService.registerSuccessfulLogin(this.state.userName,this.state.password);
                        this.props.history.push(`/studentpage/${this.state.userName}/${this.state.typeOfLogin}`);


                    }
                    else{
                        this.setState(
                                        {errorMessage:"Invalid Credentials. Please try again", showError:true}
                                );
                    }
                }


                )

        }
        if(this.state.typeOfLogin==="instructor"){

            RESTService.authenticateInstructor(this.state.userName,this.state.password)
            .then(

                (response) => {
                    

                    if(response.data==="valid"){
                        AuthenticationService.registerSuccessfulLogin(this.state.userName,this.state.password);
                        this.props.history.push(`/instructorpage/${this.state.userName}/${this.state.typeOfLogin}`);


                    }
                    else{
                        this.setState(
                                        {errorMessage:"Invalid Credentials. Please try again", showError:true}
                                );
                    }
                }


                )

        }

        if(this.state.typeOfLogin==="admin"){
            if(this.state.userName==="admin" && this.state.password==="admin"){
                AuthenticationService.registerSuccessfulLogin(this.state.userName,this.state.password);
                this.props.history.push(`/adminpage/${this.state.userName}`);

            }
            else{
                this.setState(
                    {errorMessage:"Invalid Credentials. Please try again", showError:true}
                );
    
            }
        }
        

    }

    render(){

        return(
            <div className="login">
                <h5>Student/Instructor can login here</h5>  
                <form >
                    <label>Select the type of login</label>
                    <br></br>
                    <select name="typeOfLogin" value={this.state.typeOfLogin} onChange={this.handleOnChange}>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>

                    </select>
                    <br></br>
                    
                    <label>User Name:</label><br></br>
                    <input type="text" name="userName" value={this.state.userName} onChange={this.handleOnChange} ></input><br></br>
                    <label>Password:</label><br></br>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleOnChange} ></input><br></br>
                    <br></br>
                    <button type="button" className="btn btn-success" onClick={this.handleOnClick}>Login</button><br></br>
                    {this.state.showError && <h6>{this.state.errorMessage}</h6>}
                </form>
                

            </div>

        );
    }
}

export default withRouter(Login);