
import React,{Component} from 'react';

import { Formik, Form,Field, ErrorMessage } from 'formik';
import RESTService from './RESTService';

class CourseForm extends Component{

    constructor(props){
        super(props);
        this.state={
            courseDetails:{
                courseCode:this.props.match.params.courseCode, title:"", description:"",instructor:""
            },
            selectedInstructor:"",
            allInstructors:[]
        }

        this.validate=this.validate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.getAllInstructors=this.getAllInstructors.bind(this);
        

    }

   validate(values){
        
        values.title=values.title.trim();
        values.description=values.description.trim();
       

        
        let errors={}
          
        if(!values.title){
            errors.title="Enter a title"
        }
        if(!values.description){
            errors.description="Enter a description for the course"
        }
       

        
        return errors;

    }
    componentDidMount(){

        this.getAllInstructors();

        RESTService.getCourseDetailsByCourseCode(this.state.courseDetails.courseCode)
        .then(
            (response) => {
                this.setState(
                    {courseDetails:response.data,
                    selectedInstructor:response.data.instructor.userName
                }
                    
                )
            }
        )


    }

    getAllInstructors(){
        RESTService.getAllInstructors()
        .then(
            (response) => {
                this.setState(
                   { allInstructors:response.data},
                   
                );
            }
        )
    }

    onSubmit(values){

        let savedCourseObject={
            courseCode:this.state.courseDetails.courseCode,
            title:values.title,
            description:values.description,
           
        }

        RESTService.updateCourseDetails(this.state.courseDetails.courseCode,values.selectedInstructor,savedCourseObject)
        .then(
            response => {
                alert("Successfully updated the course details");
                this.props.history.push(`/adminpage/admin`);
            }
        )
        
    }

    render(){

        const instructorsDropdown=this.state.allInstructors.map(
            instructor => <option key={instructor.id} value={instructor.userName}>{instructor.firstName}</option>
                
            );
       
        
        return(
            <div className="container">
                <h4>Edit Details for Course with code {this.state.courseDetails.courseCode}</h4>
                <Formik 
                initialValues={{title:this.state.courseDetails.title,
                    description:this.state.courseDetails.description,selectedInstructor:this.state.selectedInstructor}}
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
                                    <label>Title</label>
                                    <Field className="form-control" type="text" name="title"></Field>
                                </fieldset>
                                <ErrorMessage name="title" component="div" className="alert alert-warning"></ErrorMessage>

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"></Field>
                                </fieldset>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>

                                <fieldset>
                                    <label>Select an Instructor</label> <br></br>
                                    <Field component="select" name="selectedInstructor">
                                        {instructorsDropdown}
                                    </Field>
                                </fieldset>

                                

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

export default CourseForm;