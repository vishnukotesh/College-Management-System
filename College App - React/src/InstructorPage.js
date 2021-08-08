import React,{Component} from 'react';
import RESTService from './RESTService';


class InstructorPage extends Component{

    constructor(props){
        super(props);
        this.state={details:{userName:this.props.match.params.userName, firstName:"",lastName:"",emailID:""},
                    instructorCourses:[], 
                    typeOfLogin:this.props.match.params.typeOfLogin,
                    showInstructorCourses:false
                }

        this.refreshPage=this.refreshPage.bind(this);
        this.editDetails=this.editDetails.bind(this);


    }

    componentDidMount(){
        
        this.refreshPage();
    }

    

    refreshPage(){
        RESTService.getInstructorDetailsByUserName(this.state.details.userName)
        .then(response => {
            this.setState({details:response.data});
        });

        RESTService.getAllCourses()
        .then(
            (response)=>{
                const filteredCourses=response.data.filter(
                    (course)=> {
        
                        return course.instructor.userName===this.state.details.userName;
                        
                    }
                )
                if(filteredCourses.length>=1){
                    this.setState(
                        {
                         instructorCourses:filteredCourses,
                         showInstructorCourses:true   
                        }
                    );
                }
            }
        )

    }
    editDetails(){
        this.props.history.push(`/instructors/update/${this.state.details.userName}/${this.state.typeOfLogin}`);

    }

    render(){
        

        const courseRows=this.state.instructorCourses.map(course =>
            <tr key={course.id}>
                <td>{course.courseCode}</td>
                <td>{course.title}</td>
                <td>{course.description}</td>
            </tr>

            );

        const instructorCoursesElement=<div>
            <h4>The below is the list of course details that you teach</h4>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {courseRows}
                    
                </tbody>

            </table>
        </div>

        return(
            <div className="container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Id</th>
                            <th>UserName</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.details.firstName}</td>
                            <td>{this.state.details.lastName}</td>
                            <td>{this.state.details.emailID}</td>
                            <td>{this.state.details.userName}</td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <button className="btn btn-success" onClick={this.editDetails}>Edit Details </button>
                <br></br>
                <br></br>

                {this.state.showInstructorCourses && instructorCoursesElement}

                


                

            </div>

        );
    }
}

export default InstructorPage;