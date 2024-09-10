import React,{useState} from 'react'
import { useNavigate , Link} from 'react-router-dom'
import toast from 'react-hot-toast'
import AxiosService from './../../utils/AxioService'
import ApiRoutes from '../../utils/Routes/ApiRoutes'

function ForgotPassword() {

  let navigate = useNavigate()
  let [resetPassword,setResetPassword] = useState("")
  let [confirmPassword,setConfirmPassword] = useState("")
  

  const resettingPassword = async(e) => {
    
    e.preventDefault()

    if(confirmPassword !== resetPassword){
      toast.error("Confirm password does not match!!")
      setConfirmPassword("")
    }
    else{
    var url = window.location;
    var token = new URLSearchParams(url.search).get('token');
      try {
          let res = await AxiosService.post(`${ApiRoutes.RESET_PASSWORD.path}`,{
           token,
           resetPassword
          },{authenticate:ApiRoutes.RESET_PASSWORD.auth})
          if(res.status === 200){
              toast.success(res.data.message);
              navigate('/login')
          }

      } catch (error) {
          toast.error(error.response.data.message)
      }
    }
  }
  return <>
  <div className="flex items-center justify-center min-h-screen bg-blue-400">  
            <div className="bg-white p-8 rounded-lg shadow-md w-96">  
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2> 
        {/* <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Reset Password</h3> */}
           
           <form>
                <div className="form-group mt-3">
                <label>New Password</label>
                <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    onChange={(e) => setResetPassword(e.target.value)}
                
                />
                </div>
                <div className="form-group mt-3">
                <label>confirm Password</label>
                <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>
                <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={(e) => resettingPassword(e)}>
                    Submit
                </button>
                </div>
                <p className="text-center mt-2">
                Go to <Link to="/login">LogIn Page</Link>
                </p>
            </form>
          </div>
       
      </div>
  </>
}

export default ForgotPassword