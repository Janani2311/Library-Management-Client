import React from 'react';  
import { Link } from 'react-router-dom';  
import "./sidebar.css";  
import useLogout from "../../components/Hooks/useLogout";  

function Sidebar() {  
    let logout = useLogout();  
    let role = sessionStorage.getItem('role');  

    return (  
        <>  
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">  
                <a className="sidebar-brand">  
                    <div className="sidebar-brand-icon d-flex align-items-center justify-content-center rotate-n-15">  
                        <img src="/images/logo.jpeg" className="h-10" alt="Flowbite Logo" />  
                        <div className="sidebar-brand-text">Libro</div>  
                    </div>  
                </a>  
                <hr className="sidebar-divider my-0" />  

                {/* Common Links */}  
                <li className="nav-item">  
                    <Link to='/adminDashboard' className="nav-link">  
                        <i className="fas fa-fw fa-tachometer-alt"></i>  
                        <span>Dashboard</span>  
                    </Link>  
                </li>  
                <hr className="sidebar-divider my-0" />  

                <li className="nav-item">  
                    <Link to='/viewBooks' className="nav-link">  
                        <i className="fas fa-fw fa-tachometer-alt"></i>  
                        <span>View Books</span>  
                    </Link>  
                </li>  
                <hr className="sidebar-divider my-0" />

                {/* Conditional Links based on Role */}  
                {role === 'Admin' && (  
                    <>  
                        <li className="nav-item">  
                            <Link to='/addBooks' className="nav-link">  
                                <i className="fas fa-fw fa-tachometer-alt"></i>  
                                <span>Add Books</span>  
                            </Link>  
                        </li>  
                        <hr className="sidebar-divider my-0" />  
                        <li className="nav-item">  
                            <Link to='/updateBooks' className="nav-link">  
                                <i className="fas fa-fw fa-tachometer-alt"></i>  
                                <span>Update Books</span>  
                            </Link>  
                        </li>  
                        <hr className="sidebar-divider my-0" />  
                        <li className="nav-item">  
                            <Link to='/updateReviews' className="nav-link">  
                                <i className="fas fa-fw fa-tachometer-alt"></i>  
                                <span>Manage Reviews</span>  
                            </Link>  
                        </li>  
                        <hr className="sidebar-divider my-0" />  
                        <li className="nav-item">  
                            <Link to='/bookNotify' className="nav-link">  
                                <i className="fas fa-fw fa-tachometer-alt"></i>  
                                <span>Manage Book Returns</span>  
                            </Link>  
                        </li>  
                        <hr className="sidebar-divider my-0" />  
                        <li className="nav-item">  
                            <Link to='/userdashboard' className="nav-link">  
                                <i className="fas fa-fw fa-tachometer-alt"></i>  
                                <span>User Dashboard</span>  
                            </Link>  
                        </li>  
                        <hr className="sidebar-divider my-0" />  
                    </>  
                )}  

                {role === 'User' && (  
                    <>  
                          
                        <li className="nav-item">  
                            <Link to='/borrow' className="nav-link">  
                                <i className="fas fa-fw fa-tachometer-alt"></i>  
                                <span>Borrow Books</span>  
                            </Link>  
                        </li>  
                        <hr className="sidebar-divider my-0" />  
                        <li className="nav-item">  
                            <Link to='/return' className="nav-link">  
                                <i className="fas fa-fw fa-tachometer-alt"></i>  
                                <span>Return Books</span>  
                            </Link>  
                        </li>  
                        <hr className="sidebar-divider my-0" />  
                        <li className="nav-item">  
                            <Link to='/userprofile' className="nav-link">  
                                <i className="fas fa-fw fa-tachometer-alt"></i>  
                                <span>User Profile</span>  
                            </Link>  
                        </li>  
                        <hr className="sidebar-divider my-0" />  
                    </>  
                )}  

                {/* Logout Link for both roles */}  
                <li className="nav-item">  
                    <Link className="nav-link" onClick={() => logout()}>  
                        <i className="fas fa-fw fa-tachometer-alt"></i>  
                        <span>Log Out</span>  
                    </Link>  
                </li>  
            </ul>  
        </>  
    );  
}  

export default Sidebar;
