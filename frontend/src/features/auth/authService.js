import axios from 'axios'


const API_URL = 'api/users/'
//register user 
const register = async (userData)=>{
    try {
        const response = await axios.post(API_URL, userData);
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      } catch (error) {
        // Handle error here (e.g., log or display an error message)
        console.error('Registration failed:', error);
        throw error; // Rethrow the error to propagate it to the caller
      }
    };
//login user 
const login = async (userData)=>{
    const response = await axios.post(API_URL + 'login',userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
    }
//logout 

const logout = () =>{
    localStorage.removeItem('user')
}

const authService={
    register,
    login,
    logout
}
export default authService
