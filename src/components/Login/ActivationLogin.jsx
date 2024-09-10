
import React, { useState } from "react";  
import validateForm from "./LoginValidation";
import toast from "react-hot-toast";
import ApiRoutes from "../../utils/Routes/ApiRoutes";
import AxiosService from "../../utils/AxioService";
import {Link, useNavigate} from 'react-router-dom';
import { Navigate } from "react-router-dom";


const LoginPage = () => {  
    const [email, setEmail] = useState("");  
    const [password, setPassword] = useState(""); 
    const [token, setToken] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");  

    let navigate = useNavigate();

    const handleValidation = (event) => {
        event.preventDefault();
        setErrorMessage('')
        const error = validateForm(email,password);
        setErrorMessage(error)
        return error;
    }
     
    const handleActivation = async(e) => {
    
       e.preventDefault()
        const error = handleValidation(e)

        if(!error){
        try {
            
              let res = await AxiosService.post(`${ApiRoutes.ACTIVATE_NEW_ACCOUNT.path}`,
                {
                  email,password,token
                },
                {authenticate:ApiRoutes.ACTIVATE_NEW_ACCOUNT.auth})
                console.log(res)
                if(res.status === 200){
                  toast.success(res.data.message)
                  navigate('/login')
                }
            
          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
        }
    }

    return (  
        <div className="flex items-center justify-center min-h-screen bg-blue-400">  
            <div className="bg-white p-8 rounded-lg shadow-md w-96">  
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>  
                <div className="text-red-500 text-sm mb-4">{errorMessage}</div>  
                <form>  
                    <div className="mb-4">  
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>  
                        <input  
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
                            id="email"  
                            type="email"  
                            placeholder="Email"  
                            value={email}  
                            onChange={(e) => setEmail(e.target.value)}  
                            required 
                        />  
                    </div>  
                    <div className="mb-6">  
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>  
                        <input  
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
                            id="password"  
                            type="password"  
                            placeholder="Password"  
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)}  
                            required  
                        />  
                    </div>  

                    <div className="mb-6">  
                        <label className="block text-gray-700 text-sm font-bold mb-2">Activation token</label>  
                        <input  
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
                            id="token"  
                            type="text"  
                            placeholder="Paste the token"  
                            value={token}  
                            onChange={(e) => setToken(e.target.value)}  
                            required  
                        />  
                    </div> 

                    <div className="flex items-center justify-between">  
                        <button  
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  
                            type="submit"  
                            onClick={handleActivation}
                        >  
                            Activate Your account  
                        </button>  
                    </div>  
                </form>  
            </div>  
        </div>  
    );  
};  

export default LoginPage;  