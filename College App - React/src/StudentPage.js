import React,{Component} from 'react';
import RESTService from './RESTService';
import 'bootstrap/dist/css/bootstrap.min.css';


class StudentPage extends Component{

    constructor(props){
        super(props);
        this.state={details:{userName:this.props.match.params.userName, firstName:"",lastName:"",emailID:""},
                    allCourses:[],
                    showAllCourses:false,
                    typeOfLogin:this.props.match.params.typeOfLogin,
                    studentCourses:[],
                    showStudentCourses:false
                    
                }

        this.editDetails=this.editDetails.bind(this);
        this.refreshPage=this.refreshPage.bind(this);
        this.viewAllCourses=this.viewAllCourses.bind(this);
        this.registerCourse=this.registerCourse.bind(this);
        this.deregisterCourse=this.deregisterCourse.bind(this);

    }

    componentDidMount(){
        
        this.refreshPage();
    }

    refreshPage(){

        RESTService.getStudentDetailsByUserName(this.state.details.userName)
        .then(response => {
            this.setState({details:response.data});
        });

        RESTService.getCoursesForAStudent(this.state.details.userName)
        .then(
            (response) => {
                if(response.data.length>=1){
                    this.setState(
                        {
                            studentCourses:response.data,
                            showStudentCourses:true
                            
                        }
                    );
                
                }
                     
            }
        )

        

    }

    editDetails(){
        console.log(this.state.details.userName)

        this.props.history.push(`/students/update/${this.state.details.userName}/${this.state.typeOfLogin}`);

    }

    viewAllCourses(){
        RESTService.getAllCourses()
        .then(
            (response)=> {
                this.setState(
                    {
                        allCourses:response.data,
                        showAllCourses:true
                    }
                );

            }
        )
    }

    registerCourse(courseCode){
        console.log(this.props.match.params.userName);
        RESTService.registerCourseForAStudent(this.state.details.userName,courseCode)
        .then(
            (response) => {
                alert("Successfully added the course for you");
                this.setState({
                    showStudentCourses:false
                })
                this.refreshPage();

            }
        )

    }
    
    deregisterCourse(userName,courseCode){
        if(this.state.studentCourses.length===1){
            this.setState(
                {
                    showStudentCourses:false
                }
            )
        }
        RESTService.deRegisterCourseForAStudent(this.state.details.userName,courseCode)
        .then(
            (response) => {
                alert("Successfully deregistered the course for you");
                this.refreshPage();

            }
        )


    }

    render(){

        const allCoursesRows=this.state.allCourses.map(course =>
            <tr key={course.id}>
                <td>{course.courseCode}</td>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{`${course.instructor.firstName}`+" "+ `${course.instructor.lastName}`}</td>
                
                <td><button className="btn btn-success" onClick={() => this.registerCourse(course.courseCode)}>Register this course </button></td>
            </tr>

            );

        const studentCoursesRows=this.state.studentCourses.map(course =>
            <tr key={course.id}>
                <td>{course.courseCode}</td>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{`${course.instructor.firstName}`+" "+ `${course.instructor.lastName}`}</td>
                <td><button className="btn btn-danger" onClick={() => this.deregisterCourse(this.state.details.userName,course.courseCode)}>Deregister</button></td>
            </tr>

            );

        const courseListElement= <div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Instructor</th>
                        <th>Registration</th>
                    </tr>
                </thead>
                <tbody>
                    {allCoursesRows}
                                    
                </tbody>

            </table>


        </div>

        const studentCoursesElement=<div>
            <h4>The below is the list of course details that you have registered</h4>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Instructor</th>
                        <th>Deregister Course</th>
                    </tr>
                </thead>
                <tbody>
                    {studentCoursesRows}
                    
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

                {this.state.showStudentCourses && studentCoursesElement}
                <br></br>
                <button className="btn btn-success" onClick={this.viewAllCourses}>Click here to veiw all courses</button>
                <br></br>
                <br></br>

                {this.state.showAllCourses && courseListElement}
                <br></br>
                <br></br>
                <br></br>



                
            


                

            </div>

        );
    }
}

export default StudentPage;