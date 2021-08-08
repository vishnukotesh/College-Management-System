import React,{Component} from 'react';
import moment from 'moment';
import { Formik, Form,Field, ErrorMessage } from 'formik';
import RESTService from './RESTService';

class Register extends Component{

    constructor(props){
        super(props);
       
        this.state= {
                    checkUserName:"",
                     typeOfCheck:"student",
                     showValidateMessage:false,
                     validateMessage:""};

        this.validate=this.validate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.handleOnChange=this.handleOnChange.bind(this);
        this.handleOnClick=this.handleOnClick.bind(this);

    }


    validate(values){
        
        values.userName=values.userName.trim();
        values.firstName=values.firstName.trim();
        values.password=values.password.trim();
        values.lastName=values.lastName.trim();
        values.emailID=values.emailID.trim();
        
        

        let errors={}
        if(!values.userName){
            errors.userName="Enter a username"
        }
                
        if(!values.password){
            errors.password="Enter a password"
        }
        if(!values.firstName){
            errors.firstName="Enter your first name"
        }
        if(!values.lastName){
            errors.lastName="Enter your last name"
        }
        if(!values.emailID){
            errors.emailID="Enter a valid email address"
        }
       
        return errors;

    }

    onSubmit(values){

        let registerObject={
            userName:values.userName,
            password:values.password,
            firstName:values.firstName,
            lastName:values.lastName,
            emailID:values.emailID,
        }
        if(values.registrationType==="Student"){
            

            RESTService.registerStudent(registerObject)
            .then(
                () => {
                    alert("Student Successfully registered")
                    this.props.history.push("/home")
                }
        )


        }
        else{
            

            RESTService.registerInstructor(registerObject)
            .then(
                () => {
                    alert("Instructor Successfully registered")
                    this.props.history.push("/home")
                }
        )
        }
       
    }

    handleOnChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        );
        

    }

    handleOnClick(){
        if(!this.state.checkUserName){
            this.setState(
                {
                    validateMessage:"Please enter username for validation",
                    showValidateMessage:true
                    
                }
            )
        }


        if(this.state.typeOfCheck==="student"){

            RESTService.validateUserName(this.state.checkUserName)
            .then(
            (response) => {
                if(response.data==="valid"){
                    this.setState(
                    {
                        
                        validateMessage:"The entered username for the student type is valid. You can go ahead and use it.",
                        showValidateMessage:true
                    }

                        );
                }

                else{
                    this.setState(
                    {
                        
                        validateMessage:"The entered username for the student type is already taken. Please try with another username.",
                        showValidateMessage:true
                    }

                        );
                }

                }
            )
            
            

        }

        if(this.state.typeOfCheck==="instructor"){

            RESTService.validateInstructorUserName(this.state.checkUserName)
            .then(
            (response) => {
                if(response.data==="valid"){
                    this.setState(
                    {
                        
                        validateMessage:"The entered username for the instructor type is valid. You can go ahead and use it.",
                        showValidateMessage:true
                    }

                        );
                }

                else{
                    this.setState(
                    {
                        
                        validateMessage:"The entered username for the instructor type is already taken. Please try with another username.",
                        showValidateMessage:true
                    }

                        );
                }

                }
            )
            
            

        }

    }



    render(){
        
        return(
            
            <div className="container">
                <h4>New Student/Instructor Registration Form</h4>
                <br></br>
                
                <h5>Use the below username validator</h5>
                <form >
                    <label>Select the appropriate option(Student/Instructor)</label><br></br>
                    <select name="typeOfCheck" value={this.state.typeOfCheck} onChange={this.handleOnChange}>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>

                    </select>
                    <br></br>
                    
                    <label>Enter a username below to check if it is already taken</label><br></br>
                    <input type="text" name="checkUserName" value={this.state.checkUserName} onChange={this.handleOnChange} ></input><br></br>
                    
                    <button type="button" className="btn btn-success" onClick={this.handleOnClick}>Click here to validate</button><br></br>
                    {this.state.showValidateMessage && <h6>{this.state.validateMessage}</h6>}
                    <br></br>
                </form>

                <Formik 
                initialValues={{userName:"", password:"",firstName:"",lastName:"",emailID:"",registrationType:"Student"}}
                validate={this.validate}
                onSubmit={this.onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form
                            

                            >
                                <fieldset>
                                    <label><h5>Select Registration Type</h5></label> <br></br>
                                    <Field component="select" name="registrationType" >
                                        <option value="student">Student</option>
                                        <option value="instructor">Instructor</option>
                                    </Field>
                                </fieldset>
                                <br></br>

                                <fieldset className="form-group">
                                    <label>User Name</label>
                                    <Field className="form-control" type="text" name="userName"></Field>
                                </fieldset>
                                <ErrorMessage name="userName" component="div" className="alert alert-warning"></ErrorMessage>


                                <fieldset className="form-group">
                                    <label>Password</label>
                                    <Field className="form-control" type="password" name="password"></Field>
                                </fieldset>
                                <ErrorMessage name="password" component="div" className="alert alert-warning"></ErrorMessage>

                                <fieldset className="form-group">
                                    <label>First Name</label>
                                    <Field className="form-control" type="text" name="firstName"></Field>
                                </fieldset>
                                <ErrorMessage name="firstName" component="div" className="alert alert-warning"></ErrorMessage>

                                <fieldset className="form-group">
                                    <label>Last Name</label>
                                    <Field className="form-control" type="text" name="lastName"></Field>
                                </fieldset>
                                <ErrorMessage name="lastName" component="div" className="alert alert-warning"></ErrorMessage>

                                <fieldset className="form-group">
                                    <label>Emai Id</label>
                                    <Field className="form-control" type="email" name="emailID"></Field>
                                </fieldset>
                                <ErrorMessage name="emailID" component="div" className="alert alert-warning"></ErrorMessage>

                                <br></br>
                                <button className="btn btn-success" type="submit">Register</button>

                            </Form>
                        )
                    }
                </Formik>
                <br></br>
                <br></br>

                
            </div>

        );
    }
}

export default Register;