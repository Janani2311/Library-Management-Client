import React, { useState } from 'react';  
import ApiRoutes from '../../utils/Routes/ApiRoutes';
import AxioService from '../../utils/AxioService';
import toast from 'react-hot-toast';

const NotificationDashboard = () => {  
    

    const handleNotifyOverdue = async () => {  
        try {  
            let res = await AxioService.post(ApiRoutes.OVER_DUE.path,
                { authenticate: ApiRoutes.OVER_DUE.auth }
            );
            if(res.status === 200){
                toast.success(res.data.message)
            }
            
        } catch (error) {  
            toast.error('Error sending overdue notifications.'|| error.message);  
        }  
    };  

    return (  
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">  
            <h1 className="text-2xl font-bold mb-4">Notification Dashboard</h1>  
            <button   
                onClick={handleNotifyOverdue}   
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"  
            >  
                Send Overdue Notifications  
            </button>   
        </div>  
    );  
};  

export default NotificationDashboard;