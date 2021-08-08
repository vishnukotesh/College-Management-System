import React,{Component} from 'react';
import Login from './Login';
import RESTService from "./RESTService";
import './Style.css';

class CollegeHome extends Component{

    constructor(props){
        super(props);
        this.state={
            totalNumberOfStudents:"",
            totalNumberOfInstructors:"",
            totalNumberOfCourses:""
        }


        this.handleOnclick=this.handleOnclick.bind(this);
    }

    handleOnclick(){
        this.props.history.push("/register");

    }

    componentDidMount(){
        RESTService.getStudentsTotal()
        .then(
            (response)=>{
                //console.log(response)
                this.setState({
                    totalNumberOfStudents:response.data
                }
                );
            }
        )
        RESTService.getInstructorsTotal()
        .then(
            (response)=>{
                //console.log(response)
                this.setState({
                    totalNumberOfInstructors:response.data
                }
                );
            }

        )
        RESTService.getAllCourses()
        .then(
            (response)=>{
                //console.log(response)
                this.setState({
                    totalNumberOfCourses:response.data.length
                }
                );
            }

        )

    }
    
    render(){

        return(
            <div className="container">
                

                <div className="card-columns" >
                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <Login></Login>
                        </div>
                    </div>

                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <h5>New Student/Instructor can register here.</h5>
                            <button className="btn btn-success" onClick={this.handleOnclick}>New Registration</button>
                        </div>
                    </div>
                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <h5>Total number of students in the college:</h5>
                            <strong>{this.state.totalNumberOfStudents}</strong>
                        </div>
                    </div>
                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <h5>Total number of instructors in the college:</h5>
                            <strong>{this.state.totalNumberOfInstructors}</strong>
                        </div>
                    </div>
                    <div className="card bg-light">
                        <div className="card-body text-center">
                            <h5>Total number of courses offered in the college:</h5>
                            <strong>{this.state.totalNumberOfCourses}</strong>
                        </div>
                    </div>
                    <br></br>

                </div>

                

                

               
            </div>

        );
    }
}


export default CollegeHome;
