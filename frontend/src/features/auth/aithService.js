import axios from 'axios'


const API_URL = 'api/users/'
//register user 
const register = async (userData)=>{
const response = await axios.post(API_URL,userData)
if(response.data){
    localStorage.setItem('user',JSON.stringify(response.date))
}
return response.date
}
const authService={
    register
}
export default authService
