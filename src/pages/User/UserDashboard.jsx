import React, { useEffect, useState } from 'react';  
import { useParams } from 'react-router-dom';  
import useLogout from '../../components/Hooks/useLogout';  
import toast from 'react-hot-toast';  
import Form from 'react-bootstrap/Form';  
import ApiRoutes from '../../utils/Routes/ApiRoutes';  
import AxiosService from '../../utils/AxioService';  

function UserDashboard() {  
    const userId = sessionStorage.getItem('id');  
    const logout = useLogout();  
    const auth_token = sessionStorage.getItem('token');  
    const [userData, setData] = useState([]);  

    const fetchData = async () => {  
        try {  
            const res = await AxiosService.get(`${ApiRoutes.GET_ALL_USERS.path}`, {  
                authenticate: ApiRoutes.GET_ALL_USERS.auth,  
            });  
            if (res.status === 200) {  
                setData(res.data.data);  
            }  
        } catch (error) {  
            toast.error(error.response.data.message);  
        }  
    };  

    const changeStatus = async (email, status) => {  
        status = !status;  
        try {  
            const res = await AxiosService.put(`${ApiRoutes.CHANGE_STATUS.path}`, {  
                email,  
                status,  
            }, { authenticate: ApiRoutes.CHANGE_STATUS.auth });  
            if (res.status === 200) {  
                toast.success(res.data.message);  
                fetchData();  
            }  
        } catch (error) {  
            toast.error(error.response.data.message);  
        }  
    };  

    useEffect(() => {  
        if (auth_token) fetchData();  
        else logout();  
    }, []);  

    return (  
        <>  
            <div className="p-6 mt-4">  
                <h5 className="text-2xl font-bold mb-4 text-[#3737e0]">User Details</h5>  
                <div className="overflow-x-auto">  
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">  
                        <thead className="bg-gray-200">  
                            <tr>  
                                <th className="py-2 px-4 border-b">#</th>  
                                <th className="py-2 px-4 border-b">Name</th>  
                                <th className="py-2 px-4 border-b hidden md:table-cell">Email</th>  
                                <th className="py-2 px-4 border-b">Status</th>  
                                <th className="py-2 px-4 border-b hidden md:table-cell">Created At</th>  
                            </tr>  
                        </thead>  
                        <tbody>  
                            {userData.map((user, i) => (  
                                <tr key={i} className="hover:bg-gray-100">  
                                    <td className="py-2 px-4 border-b">{i + 1}</td>  
                                    <td className="py-2 px-4 border-b">{`${user.firstName} ${user.lastName}`}</td>  
                                    <td className="py-2 px-4 border-b hidden md:table-cell">{user.email}</td>  
                                    <td className="py-2 px-4 border-b">  
                                        <Form.Check  
                                            type="switch"  
                                            id={`custom-switch-${i}`}  
                                            checked={user.status}  
                                            onChange={() => changeStatus(user.email, user.status)}  
                                        />  
                                    </td>  
                                    <td className="py-2 px-4 border-b hidden md:table-cell">{new Date(user.createdAt).toLocaleDateString()}</td>  
                                </tr>  
                            ))}  
                        </tbody>  
                    </table>  
                </div>  
            </div>  
        </>  
    );  
}  

export default UserDashboard;