// router.jsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Home/Home';
import Courses from '../Courses/Courses';
import License from '../License/License';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import ManageCourses from '../AdminDashboard/ManageCourses';
import LearnerLicenseApplicants from '../AdminDashboard/LearnerLicenseApplicants';
import UserManagement from '../AdminDashboard/UserManagement';
import Login from '../components/Login';
import EnquiriesManagement from '../AdminDashboard/EnquiriesManagement';
import AddCourse from '../AdminDashboard/AddCourses';
import EditCourse from '../AdminDashboard/EditCourses';
import SignUp from '../components/SignUp';
import Profile from '../UserDashboard/Profile';
import UserDashboard from '../UserDashboard/UserDashboard';
import PrivateRoute from '../components/ProtectRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/learnToDrive', element: <Courses /> },
      { path: '/getYourLicense', element: <License /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
    ),
    children: [
      { path: '', element: <ManageCourses /> },
      { path: 'manage-courses', element: <ManageCourses /> },
      { path: 'add-course', element: <AddCourse /> },
      { path: 'edit-course/:id', element: <EditCourse /> },
      { path: 'learner-license-applicants', element: <LearnerLicenseApplicants /> },
      { path: 'user-management', element: <UserManagement /> },
      { path: 'enquiries-management', element: <EnquiriesManagement /> },
    ],
  },
  { path: '/signup', element: <SignUp /> },
  { path: '/login', element: <Login /> },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <UserDashboard />
      </PrivateRoute>
    ),
    children: [
      { path: '', element: <Profile /> },
      { path: 'user-progress', element: <div>User Progress Component</div> },
      { path: 'license-status', element: <div>License Status Component</div> },
      { path: 'mock-test-results', element: <div>Mock Test Results Component</div> },
    ],
  },
]);

export default router;
