import HomePage from "../../components/Home/HomePage";
import Login from "../../components/Login/Login";
import Sidebar from "../../components/Sidebar/Sidebar";
import Signup from "../../components/Signup/Signup";
import TopNav from "../../components/TopNav/TopNav";
import AddBooks from "../../pages/Books/AddBooks";
import ViewBooks from "../../pages/Books/ViewBooks";
import UpdateBookInfo from "../../pages/Books/UpdateBookInfo";
import UpdationForm from "../../pages/Books/UpdationForm";
import AdminDashboard from "../../pages/dashboard/AdminDashboard";
import ActivationLogin from "../../components/Login/ActivationLogin";
import ForgotPassword from "../../components/ForgotPwd/ForgotPassword";
import ForgotPasswordEmailCheck from "../../components/ForgotPwd/ForgotPwdEmailCheck";
import UpdateReviews from "../../pages/Reviews/UpdateReviews";
import BookBorrowing from "../../pages/BorrowAndReturns/BookBorrowing";
import BookReturn from "../../pages/BorrowAndReturns/BookReturn";
import BookAdminDashboard from "../../pages/BorrowAndReturns/BookAdminDashboard";
import UserProfile from "../../pages/User/UserProfile";
import UserDashboard from "../../pages/User/UserDashboard";
import ProtectedRoute from "../Guard/ProtectedRoute";
import AdminGuard from "../Guard/AdminGuard";


export default [
    {
      path: "/",
      element: (
        <>
          <TopNav />
          <HomePage />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <TopNav />
          <Login />
        </>
      ),
    },
    {
      path: "/activelogin",
      element: (
        <>
          <TopNav />
          <ActivationLogin />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <TopNav />
          <Signup />
        </>
      ),
    },
    {
      path: "/forgotpwdcheck",
      element: (
        <>
          <TopNav />
          <ForgotPasswordEmailCheck />
        </>
      ),
    },
    {
      path: "/forgotpassword",
      element: (
        <>
          <TopNav />
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/adminDashboard",
      element: (
        <div className="flex flex-row gap-x-4 bg-[#f0eeee]">
          <Sidebar />
          <AdminDashboard />
        </div>
      ),
    },
    {
      path: "/addBooks",
      element: (
        
            <div className="flex flex-row gap-x-4 bg-[#f0eeee]">
              <Sidebar />
              <AddBooks />
            </div>
        
      ),
    },
    {
      path: "/viewBooks",
      element: (
        <ProtectedRoute>
          <div className="flex flex-row gap-x-4 bg-[#f0eeee]">
            <Sidebar />
            <ViewBooks />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/updateBooks",
      element: (
       
          <div className="flex flex-row gap-x-4 bg-[#f0eeee]">
            <Sidebar />
            <UpdateBookInfo />
          </div>
       
      ),
      children: [
        {
          path: "/updateBooks/updation",
          element: <UpdationForm />,
        },
      ],
    },
    {
      path: "/updateReviews",
      element: (
        <AdminGuard>
          <ProtectedRoute>
            <div className="flex flex-row gap-x-4 bg-[#f0eeee]">
              <Sidebar />
              <UpdateReviews />
            </div>
          </ProtectedRoute>
        </AdminGuard>
      ),
    },
    {
      path: "/borrow",
      element: (
        <ProtectedRoute>
          <div className="flex flex-row gap-x-4 bg-[#f0eeee]">
            <Sidebar />
            <BookBorrowing />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/return",
      element: (
        <ProtectedRoute>
          <div className="flex flex-row gap-x-4 bg-[#f0eeee]">
            <Sidebar />
            <BookReturn />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/bookNotify",
      element: (
        <AdminGuard>
          <ProtectedRoute>
            <div className="flex flex-row gap-x-4 bg-[#f0eeee]">
              <Sidebar />
              <BookAdminDashboard />
            </div>
          </ProtectedRoute>
        </AdminGuard>
      ),
    },
    {
      path: "/userprofile",
      element: (
        <ProtectedRoute>
          <div className="flex flex-row gap-x-4 bg-[#f0eeee]">
            <Sidebar />
            <UserProfile />
          </div>
        </ProtectedRoute>
      ),
    },
    {
      path: "/userdashboard",
      element: (
        <AdminGuard>
          <ProtectedRoute>
            <div className="flex flex-row gap-x-4 bg-[#f0eeee]">
              <Sidebar />
              <UserDashboard />
            </div>
          </ProtectedRoute>
        </AdminGuard>
      ),
    },
];