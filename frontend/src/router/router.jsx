// router.jsx
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Loader from '../components/Loader';
const Home = lazy(() => import('../Home/Home'));
const Courses = lazy(() => import('../Courses/Courses'));
const License = lazy(() => import('../License/License'));
const AdminDashboard = lazy(() => import ('../AdminDashboard/AdminDashboard'));
const ManageCourses = lazy(() => import( '../AdminDashboard/ManageCourses'));
const LearnerLicenseApplicants = lazy(() => import( '../AdminDashboard/LearnerLicenseApplicants'));
const UserManagement = lazy(() => import( '../AdminDashboard/UserManagement'));
const Login = lazy(() => import( '../components/Login'));
const EnquiriesManagement = lazy(() => import( '../AdminDashboard/EnquiriesManagement'));
const AddCourse = lazy(() => import( '../AdminDashboard/AddCourses'));
const EditCourse = lazy(() => import( '../AdminDashboard/EditCourses'));
const SignUp = lazy(() => import( '../components/SignUp'));
const Profile = lazy(() => import( '../UserDashboard/Profile'));
const UserDashboard = lazy(() => import( '../UserDashboard/UserDashboard'));
const PrivateRoute = lazy(() => import( '../components/ProtectRoutes'));
const Quiz = lazy(() => import('../components/Quiz/Quiz'));
const AboutUs = lazy(() => import('../components/AboutUs'));
const ContactUs = lazy(() => import('../components/ContactUs'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/learnToDrive', element: <Courses /> },
      { path: '/getYourLicense', element: <License /> },
      { path: '/quiz', element: <Quiz /> },
      { path: '/about', element: <Suspense fallback={<Loader />}><AboutUs /></Suspense> },
      { path: '/contact', element: <Suspense fallback={<Loader />}><ContactUs /></Suspense> },
    ],
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <Suspense fallback={<Loader />}>
          <AdminDashboard />
        </Suspense>  
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
  { path: '/signup', element: <Suspense fallback={<Loader />}><SignUp /></Suspense> },
  { path: '/login', element: <Suspense fallback={<Loader />}><Login /></Suspense> },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Suspense fallback={<Loader />}>
          <UserDashboard />
        </Suspense>  
      </PrivateRoute>
    ),
    children: [
      { path: '', element: <Suspense fallback={<Loader />}><Profile /></Suspense> },
      { path: 'user-progress', element: <div>User Progress Component</div> },
      { path: 'license-status', element: <div>License Status Component</div> },
      { path: 'mock-test-results', element: <div>Mock Test Results Component</div> },
    ],
  },
]);

export default router;
