
import React,{Component} from 'react';

import { Formik, Form,Field, ErrorMessage } from 'formik';
import RESTService from './RESTService';

class AddCourseForm extends Component{

    constructor(props){
        super(props);
        this.state={
            courseDetails:{
                courseCode:"", title:"", description:""
            },
            selectedInstructor:"",
            allInstructors:[]
        }

        this.validate=this.validate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.getAllInstructors=this.getAllInstructors.bind(this);
        
        this.stringCompare=this.stringCompare.bind(this);
        

    }

    stringCompare(a,b){
        if (a.toString() < b.toString()) return -1;
        if (a.toString() > b.toString()) return 1;
        return 0;

    }

    validate(values){
        
        values.courseCode=values.courseCode.trim();
        values.title=values.title.trim();
        values.description=values.description.trim();
       
        //console.log(values)

        
        let errors={}
        if(!values.courseCode){
            errors.userName="Enter course code"
        }
        
          
        if(!values.title){
            errors.title="Enter a title"
        }
        if(!values.description){
            errors.description="Enter the description"
        }
       

        
        return errors;

    }
    

    onSubmit(values){
        //console.log(values)

        let savedCourseObject={
            courseCode:values.courseCode,
            title:values.title,
            description:values.description,
           
        }
        RESTService.addCourseToInstructor(values.selectedInstructor, savedCourseObject)
        .then(
            response => {
                alert("Successfully added the course");
                this.props.history.push(`/adminpage/admin`);
            }
        )
        
    }

    componentDidMount(){
        this.getAllInstructors();
    }

    getAllInstructors(){
        RESTService.getAllInstructors()
        .then(
            (response) => {
                console.log(response.data);
                this.setState(
                   { allInstructors:response.data,
                    selectedInstructor:response.data[0].userName}
                );
            }
        )
    }

    render(){

        const instructorsDropdown=this.state.allInstructors.map(
            instructor => <option key={instructor.id} value={instructor.userName}>{instructor.firstName}</option>
                
            );
       
        
        return(
            <div className="container">
                <h4>Add a Course</h4>
                <Formik 
                initialValues={{courseCode:"",title:"",
                    description:"",selectedInstructor:this.state.selectedInstructor}}
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
                                    <label>Course Code</label>
                                    <Field className="form-control" type="text" name="courseCode"></Field>
                                </fieldset>
                                <ErrorMessage name="courseCode" component="div" className="alert alert-warning"></ErrorMessage>


                                <fieldset className="form-group">
                                    <label>Title</label>
                                    <Field className="form-control" type="text" name="title"></Field>
                                </fieldset>
                                <ErrorMessage name="title" component="div" className="alert alert-warning"></ErrorMessage>

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"></Field>
                                </fieldset>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                <br></br>
                                <fieldset>
                                    <label>Select an Instructor</label> <br></br>
                                    <Field component="select" name="selectedInstructor" >
                                        {/* <option value="student">Student</option>
                                        <option value="instructor">Instructor</option> */}
                                        {instructorsDropdown}
                                    </Field>
                                </fieldset>
                                <br></br>


                            
                                <button className="btn btn-success" type="submit">Add</button>
                            

                            </Form>
                        )
                    }
                </Formik>
                

                
            </div>

        );
    }
}

export default AddCourseForm;