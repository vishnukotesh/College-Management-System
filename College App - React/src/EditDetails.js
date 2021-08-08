import React,{Component} from 'react';
import { Formik, Form,Field, ErrorMessage } from 'formik';
import RESTService from './RESTService';

class EditDetails extends Component{

    constructor(props){
        super(props);
        this.state={
            details: {
                userName:this.props.match.params.userName, password:"",firstName:"",lastName:"",
                emailID:""},
                typeOfLogin:this.props.match.params.typeOfLogin
        }
        
        this.validate=this.validate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
       

    }

    

    componentDidMount(){
        if(this.state.typeOfLogin==="student"){
            RESTService.getStudentDetailsByUserName(this.state.details.userName)
            .then(
                (response)=>{
                    console.log(response)
                    this.setState(
                        {details:response.data}
                    );
                }
            )
        }
        if(this.state.typeOfLogin==="instructor"){
            RESTService.getInstructorDetailsByUserName(this.state.details.userName)
            .then(
                (response)=>{
                    console.log(response)
                    this.setState(
                        {details:response.data}
                    );
                }
            )
    }
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

        let updatedBody={
            userName:values.userName,
            password:values.password,
            firstName:values.firstName,
            lastName:values.lastName,
            emailID:values.emailID,
        }

        if(this.state.typeOfLogin==="student"){
                RESTService.updateStudentDetails(this.state.details.userName,updatedBody)
                .then(
                    (response) =>{
                        alert("Successfully updated your details");
                        let newUserName=response.data.userName;
                        this.props.history.push(`/studentpage/${newUserName}/${this.state.typeOfLogin}`);
                    }
                )
        }
        if(this.state.typeOfLogin==="instructor"){
            RESTService.updateInstructorDetails(this.state.details.userName,updatedBody)
            .then(
                (response) =>{
                    alert("Successfully updated your details");
                    let newUserName=response.data.userName;
                    this.props.history.push(`/instructorpage/${newUserName}/${this.state.typeOfLogin}`);
                }
            )
    }
       
       
    }

    render(){
        
        return(
            <div className="container">
                <h4>Edit Your Details here</h4>
                <Formik 
                initialValues={this.state.details}
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
                                <button className="btn btn-success" type="submit">Save</button>

                            </Form>
                        )
                    }
                </Formik>
                

                
            </div>

        );
    }
}

export default EditDetails;