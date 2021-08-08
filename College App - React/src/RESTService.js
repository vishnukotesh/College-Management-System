import axios from "axios";
import AuthenticationService from './AuthenticationService';



class RESTService {


    getAllStudents(){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/students`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    getStudentDetailsByUserName(userName){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/students/${userName}`,{
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    deleteStudentByUserName(userName){
        return axios.delete(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/students/delete/${userName}`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    getStudentsTotal(){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/students/total`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    getInstructorDetailsByUserName(userName){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/instructors/${userName}`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    getInstructorsTotal(){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/instructors/total`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    getCourseDetailsByCourseCode(courseCode){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/courses/${courseCode}`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    getCoursesForAStudent(userName){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/students/${userName}/courses`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    registerStudent(registerObject){
        return axios.post("http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/students",registerObject, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    registerInstructor(registerObject){
        return axios.post("http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/instructors",registerObject, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    registerCourseForAStudent(userName,courseCode){
        return axios.put(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/students/addCourseForStudent/${userName}/${courseCode}`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    deRegisterCourseForAStudent(userName,courseCode){
        return axios.put(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/students/deleteCourseForStudent/${userName}/${courseCode}`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }



    validateUserName(userName){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/students/validate/username/${userName}`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    validateInstructorUserName(userName){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/instructors/validate/username/${userName}`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    
    updateStudentDetails(userName,studentBody){
        return axios.put(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/students/update/${userName}`,studentBody, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    updateInstructorDetails(userName,instructorBody){
        return axios.put(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/instructors/update/${userName}`,instructorBody, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    getAllCourses(){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/courses`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    addCourseToInstructor(userName,courseBody){
        return axios.post(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/instructors/${userName}/addCourse`,courseBody, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    updateCourseDetails(courseCode,userName,courseBody){
        return axios.put(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/courses/${courseCode}/${userName}`, courseBody, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    deleteCourseByCourseCode(courseCode){
        return axios.delete(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/courses/${courseCode}`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    getAllInstructors(){
        return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/instructors`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });
    }

    authenticateStudent(userName,password){
         return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/authenticateStudent/${userName}/${password}`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });

    }

    authenticateInstructor(userName,password){
         return axios.get(`http://collegeapp1-env.eba-cmqnpwm2.us-east-2.elasticbeanstalk.com/authenticateInstructor/${userName}/${password}`, {
            headers: {
                authorization: AuthenticationService.createBasicAuthToken()
            }
        });

    }




}

export default new RESTService();