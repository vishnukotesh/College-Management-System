import axios from "axios";

class AuthenticationService {

    

    registerSuccessfulLogin(username,password){
        sessionStorage.setItem("authenticatedUser",username);
        this.setupAxiosInterceptors();
    }

    logout(){
        sessionStorage.removeItem("authenticatedUser");
    }

    isUserLoggedIn(){
        let user=sessionStorage.getItem("authenticatedUser");
        if(user===null){
            return false;
        }
        return true;
    }

    createBasicAuthToken(){
       
        return 'Basic ' + window.btoa("username" + ":" + "password")
    }

    setupAxiosInterceptors(){
        
        axios.interceptors.request.use(
            (config) => {

                if(this.isUserLoggedIn()){
                    config.headers.authorization=this.createBasicAuthToken()
                }
                return config

            })
    }

}

export default new AuthenticationService();