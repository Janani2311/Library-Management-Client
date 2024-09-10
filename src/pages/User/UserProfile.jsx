import React, { useEffect, useState } from 'react';  
import AxioService from '../../utils/AxioService';  
import ApiRoutes from '../../utils/Routes/ApiRoutes';  
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const UserProfile = () => {  
    const userId = sessionStorage.getItem('id');  
    const books = useSelector((state) => state.books);

    const [userInfo, setUserInfo] = useState({});  
    const [borrowingHistory, setBorrowingHistory] = useState([]);  
    const [reservedBooks, setReservedBooks] = useState([]);  
    const [overdueNotifications, setOverdueNotifications] = useState([]);  
    const [formData, setFormData] = useState({});  
    const [isEditing, setIsEditing] = useState(false);  
    const [error, setError] = useState('');  
    const [loading, setLoading] = useState(true);  

    const fetchUserData = async () => {  
        try {  
            const userResponse = await AxioService.get(`${ApiRoutes.GET_USER_BY_ID.path}/${userId}`, { authenticate: ApiRoutes.GET_USER_BY_ID.auth });  
            if (userResponse.status === 200) {  
                const userData = userResponse.data.data;  
                setUserInfo(userData);  
                setFormData(userData); // Initialize form data  
            }  
        } catch (err) {  
            setError('Failed to fetch user data.');  
        } finally {  
            setLoading(false);  
        }  
    };  

    const fetchBorrowedData = async () => {  
        try {  
            const res = await AxioService.get(`${ApiRoutes.GET_BORROWBOOK_BY_ID.path}/${userId}`, { authenticate: ApiRoutes.GET_BORROWBOOK_BY_ID.auth });  
            if (res.status === 200) {  
                const borrowedBooks = res.data.books;
                const bookIDs = borrowedBooks.map(book => book.bookID); 

                const borrowingHistory = bookIDs.map(bookID => {  
                    const book = books.find((b) => {
                        return b.bookID == bookID
                    });    
                    return book ? book.title : null;  
                }).filter(title => title !== null); 
                
               setBorrowingHistory(borrowingHistory);  
            }  
        } catch (err) {  
            toast.error(err.message) 
        } finally {  
            setLoading(false);  
        }  
    };  

    const fetchReservedData = async () => {  
        try {  
            const res = await AxioService.get(`${ApiRoutes.GET_RESERVEBOOK_BY_ID.path}/${userId}`, { authenticate: ApiRoutes.GET_RESERVEBOOK_BY_ID.auth });  
            if (res.status === 200) {  
                const reservedBooks = res.data.books;
                const bookIDs = reservedBooks.map(book => book.bookID); 

                const reservedHistory = bookIDs.map(bookID => {  
                    const book = books.find((b) => {
                        return b.bookID == bookID
                    });   
                    return book ? book.title : null;  
                }).filter(title => title !== null); 
                
               setReservedBooks(reservedHistory);  
              
            }  
        } catch (err) {  
            toast.error(err.message) 
        } finally {  
            setLoading(false);  
        }  
    }; 

    useEffect(() => {  
        fetchUserData(); 
        fetchBorrowedData(); 
        fetchReservedData();
    }, [userId]);  

    const handleEditToggle = () => {  
        setIsEditing(!isEditing);  
    };  

    const handleChange = (e) => {  
        const { name, value } = e.target;  
        setFormData({ ...formData, [name]: value });  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        try {  
            const res = await AxioService.patch(`${ApiRoutes.UPDATE_USER_DETAILS.path}/${userId}`, formData, {authenticate:ApiRoutes.UPDATE_USER_DETAILS.auth});  
            if (res.status == 200) {  
                toast.success(res.data.message)
                setUserInfo(res.data.data);  
                setIsEditing(false);  
            } else {  
               toast.error(res.data.message)
            }  
        } catch (err) {  
            toast.error(err.message) 
        }  
    };  

    return (  
        <div className="container mx-auto p-6">  
            <div className="flex flex-col lg:flex-row gap-6">  
                {/* User Profile Card and Table Section */}  
                <div className="bg-white shadow-lg rounded-lg p-6 flex-1">  
                    <div className="flex items-center mb-4">  
                        <img src="/images/dummy.webp" alt="" className="w-24 h-24 rounded-full border-2 border-gray-300" />  
                        <div className="ml-4">  
                            <h1 className="text-2xl font-bold">{userInfo.firstName}&nbsp;{userInfo.lastName}</h1>  
                            <span className="block text-gray-500">{userInfo.email}</span>  
                            <p className="text-gray-500">{userInfo.role}</p>  
                            <span className="block text-sm text-gray-400">Created At: {new Date(userInfo.createdAt).toLocaleDateString()}</span>  
                        </div>  
                    </div>  
                    <div className='flex items-center mb-2'>  
                        <span className="font-semibold">Status: </span>&nbsp;<span className={userInfo.status ? "text-green-500" : "text-red-500"}>{userInfo.status ? "Active" : "Inactive"}</span>  
                    </div>  

                    <h1 className="text-2xl font-bold mb-4">User Profile</h1>  

                    <h2 className="text-xl font-semibold mb-2">Borrowing History</h2>  
                    <Table data={borrowingHistory} />  

                    <h2 className="text-xl font-semibold mb-2 mt-6">Reserved Books</h2>  
                    <Table data={reservedBooks} />  

                    <h2 className="text-xl font-semibold mb-2 mt-6">Overdue Notifications</h2>  
                    <Table data={overdueNotifications} />  
                </div>  

                {/* Update Form Section */}  
                <div className="bg-white shadow-lg rounded-lg p-6 flex-1">  
                    <h2 className="text-2xl font-bold mb-4">Update Profile</h2>  
                    {isEditing ? (  
                        <form onSubmit={handleSubmit} className="space-y-4">  
                            <input  
                                type="text"  
                                name="firstName"  
                                value={formData.firstName || ''}  
                                onChange={handleChange}  
                                placeholder="First Name"  
                                className="border p-2 w-full rounded"  
                            />  
                            <input  
                                type="text"  
                                name="lastName"  
                                value={formData.lastName || ''}  
                                onChange={handleChange}  
                                placeholder="Last Name"  
                                className="border p-2 w-full rounded"  
                            />  
                            <input  
                                type="email"  
                                name="email"  
                                value={formData.email || ''}  
                                onChange={handleChange}  
                                placeholder="Email"  
                                className="border p-2 w-full rounded"  
                            />  
                            <input  
                                type="number"  
                                name="phone"  
                                value={formData.phone || ''}  
                                onChange={handleChange}  
                                placeholder="Phone"  
                                className="border p-2 w-full rounded"  
                            />   
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>  
                        </form>  
                    ) : (  
                        <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button>  
                    )}  
                </div>  
            </div>  
        </div>  
    );  
};  

const Table = ({ data }) => {  
    return (  
        <table className="min-w-full bg-white border border-gray-300 mb-4">  
            <thead>  
                <tr>  
                    <th className="py-2 px-4 border-b">Title</th>  
                    <th className="py-2 px-4 border-b">Status</th>  
                </tr>  
            </thead>  
            <tbody>  
                {data.length > 0 ? (  
                    data.map((item) => (  
                        <tr key={item.id} className="hover:bg-gray-100">  
                            <td className="py-2 px-4 border-b">{item}</td>  
                            <td className="py-2 px-4 border-b">{item.status || 'N/A'}</td>  
                        </tr>  
                    ))  
                ) : (  
                    <tr>  
                        <td colSpan="2" className="py-2 px-4 text-center">No records found</td>  
                    </tr>  
                )}  
            </tbody>  
        </table>  
    );  
};  

export default UserProfile;