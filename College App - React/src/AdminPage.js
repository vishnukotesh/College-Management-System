import React, { Component } from "react";
import RESTService from "./RESTService";


class AdminPage extends Component{

    constructor(props){
        super(props);
        this.state={
            courses:[],
            showAllStudents:false,
            students:[],
            instructors:[],
            showAllInstructors:false
        }
        this.refresh=this.refresh.bind(this);
        this.updateCourse=this.updateCourse.bind(this);
        this.addCourse=this.addCourse.bind(this);
        this.viewAllStudents=this.viewAllStudents.bind(this);
        this.deleteStudent=this.deleteStudent.bind(this);
        this.viewAllInstructors=this.viewAllInstructors.bind(this);

    }

    componentDidMount(){
        this.refresh()
       
    }

    refresh(){
        RESTService.getAllCourses()
        .then(
            (response)=>{
                console.log(response.data);
                this.setState(
                    {
                        courses:response.data
                    }
                );
            }
        )

    }

    updateCourse(courseCode){
        this.props.history.push(`/admin/editcourse/${courseCode}`);
    }

    addCourse(){
        this.props.history.push(`/admin/addcourse`);
      
    }

    viewAllStudents(){
        RESTService.getAllStudents()
        .then(
            (response)=>{
                console.log(response.data)
                this.setState(
                    {
                     students:response.data,
                     showAllStudents:true 
                    }
                )
            }
        )
        
    }

    deleteStudent(userName){
        RESTService.deleteStudentByUserName(userName)
        .then(
            () => {
                alert("success");
                //this.props.history.push(`/adminpage/${this.props.match.params.userName}`);
                this.viewAllStudents();
            }
        )
        

    }

    viewAllInstructors(){
        RESTService.getAllInstructors()
        .then(
            (response)=>{
                console.log(response.data)
                this.setState(
                    {
                        instructors:response.data,
                        showAllInstructors:true
                    }
                )
            }
        )
        
    }

   

    render(){

        const courseRows=this.state.courses.map(course =>
            <tr key={course.id}>
                <td>{course.courseCode}</td>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{`${course.instructor.firstName}`+" "+ `${course.instructor.lastName}`}</td>
                <td><button type="button" className="btn btn-success" onClick={() => this.updateCourse(course.courseCode)}>Update</button></td>
            </tr>

            );

        const studentsRows=this.state.students.map(student =>
            <tr key={student.id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.emailID}</td>
                <td><button type="button" className="btn btn-danger" onClick={() => this.deleteStudent(student.userName)}>Delete</button></td>
                
            </tr>

            );
    
        const studentsListElement= <div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {studentsRows}
                                    
                </tbody>

            </table>


        </div>

        const instructorsRows=this.state.instructors.map(instructor =>
            <tr key={instructor.id}>
                <td>{instructor.firstName}</td>
                <td>{instructor.lastName}</td>
                <td>{instructor.emailID}</td>
                
            </tr>

            );

        const instructorsListElement= <div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email ID</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {instructorsRows}
                                    
                </tbody>

            </table>


        </div>


        return(
            <div className="container">

                <h4>The below is the list of course that are being offered in the college</h4>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Instructor</th>
                            <th>Update</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {courseRows}
                        
                    </tbody>

                </table>
                <br></br>
                <button type="button" className="btn btn-success" onClick={this.addCourse}>Add a course</button>
                <br></br>
                <br></br>
                <button className="btn btn-success" onClick={this.viewAllStudents}>Click here to veiw all students</button>
                <br></br>
                <br></br>

                {this.state.showAllStudents && studentsListElement}

                <br></br>
                <button className="btn btn-success" onClick={this.viewAllInstructors}>Click here to veiw all instructors</button>
                {this.state.showAllInstructors && instructorsListElement}
                <br></br>
                <br></br>
                <br></br>



                

            </div>

        );
    }

}

export default AdminPage;