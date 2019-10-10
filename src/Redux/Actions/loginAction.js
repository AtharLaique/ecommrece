import axios from 'axios';
import {LOGIN_DISPATCH} from './type';
import {LOG_DISPATCH} from './type';
import url from '../../config/Url';
export const loginuser=(userData ,history )=>dispatch =>{
    console.log(userData)
    axios.post(url.Login,userData) //sending user data to server
    .then(function (response) {  //Request is successfull
       if(!response.status=='200')
       {
           dispatch({
               type:LOGIN_DISPATCH ,
               payload:"Login failed"
           })
       }
       else if(response.status=='200' )
       {
           localStorage.setItem('LOG','true');
           
           if(response.data.user.eRoleId=='1')
            {
                localStorage.setItem('ROLE','admin');
              
            
            }
            else
             {
                 localStorage.setItem('ROLE','user');
                 localStorage.setItem('id',response.data.userId);
                 history.push('/user'); 
             }
        dispatch({
            type:LOG_DISPATCH ,
            payload:response.data.user,
        })     
        if(response.data.user.eRoleId=='1')
        {
            
            history.push('/admin/dash'); 
        }
        else
        {
            
            history.push('/user'); 
        }
        
               
       }
    })
   
}; 