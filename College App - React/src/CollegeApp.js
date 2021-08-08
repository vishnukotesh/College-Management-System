import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CollegeHome from './CollegeHome';
import StudentPage from './StudentPage';
import Header from './Header';
import Footer from './Footer';
import Logout from './Logout';
import InstructorPage from './InstructorPage';
import AuthenticatedRoute from './AuthenticatedRoute';
import Register from './Register';
import EditDetails from './EditDetails';
import AdminPage from './AdminPage';
import CourseForm from './CourseForm';
import AddCourseForm from './AddCourseForm';

class CollegeApp extends Component{

    render(){

        return(
            <div className="CollegeApp">
                
                <Router>
                    <Header></Header>

                    <Switch>

                        <Route path="/" exact component={CollegeHome}></Route>
                        <Route path="/home" component={CollegeHome}></Route>
                        <Route path="/register" component={Register}/>
                        <AuthenticatedRoute path="/adminpage" component={AdminPage}></AuthenticatedRoute>
                        <AuthenticatedRoute path="/studentpage/:userName/:typeOfLogin"  component={StudentPage}></AuthenticatedRoute>
                        <AuthenticatedRoute path="/students/update/:userName/:typeOfLogin"  component={EditDetails}></AuthenticatedRoute>
                        <AuthenticatedRoute path="/instructorpage/:userName/:typeOfLogin" component={InstructorPage}></AuthenticatedRoute>
                        <AuthenticatedRoute path="/instructors/update/:userName/:typeOfLogin" component={EditDetails}></AuthenticatedRoute>
                        <AuthenticatedRoute path="/adminpage/:userName" component={AdminPage}></AuthenticatedRoute>
                        <AuthenticatedRoute path="/admin/editcourse/:courseCode" component={CourseForm}></AuthenticatedRoute>
                        <AuthenticatedRoute path="/admin/addcourse" component={AddCourseForm}></AuthenticatedRoute>
                        <AuthenticatedRoute path="/logout" component={Logout}></AuthenticatedRoute>
                        <Route component={ErrorComponent}></Route>

                    </Switch>

                    <Footer></Footer>
                    

                </Router>
            </div>

        );
    }
}

class ErrorComponent extends Component{
    render(){
        return(
            <div><h1>Error has occured. Please go to home page.</h1></div>
        );
    }
}

export default CollegeApp;