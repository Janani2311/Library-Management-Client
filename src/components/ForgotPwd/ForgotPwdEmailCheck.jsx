import React, { useState } from 'react'
import AxiosService from './../../utils/AxioService'
import ApiRoutes from '../../utils/Routes/ApiRoutes'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function ForgotPasswordEmailCheck() {
    let [email,setEmail] = useState("")

    const ForgotPassword = async(e) => {
        e.preventDefault()
          try {
              let res = await AxiosService.post(`${ApiRoutes.FORGOT_PASSWORD.path}`,{
                  email
              },{authenticate:ApiRoutes.FORGOT_PASSWORD.auth})
              if(res.status === 200){
                  toast.success(res.data.message);
              }
  
          } catch (error) {
             toast.error(error.message)
          }
    }

  return <>

            <div className="flex items-center justify-center min-h-screen bg-blue-400">  
            <div className="bg-white p-8 rounded-lg shadow-md w-96">  
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2> 
                <p className="text-center mt-2 font-medium">
                        Remember?<Link to="/login" className="text-blue-600 dark:text-blue-500 hover:underline">Sign In</Link>
                    </p>
            <form>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={(e) => ForgotPassword(e)}>
                Submit
              </button>
            </div>
            </form>
          </div>
        
      </div>
  
  </>
}

export default ForgotPasswordEmailCheck