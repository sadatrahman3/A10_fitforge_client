import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/home/Home';
import AllClasses from './pages/classes/AllClasses';
import ClassDetails from './pages/classes/ClassDetails';
import Payment from './pages/classes/Payment';
import Forum from './pages/forum/Forum';
import ForumPostDetails from './pages/forum/ForumPostDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import UserOverview from './pages/dashboard/user/UserOverview';
import BookedClasses from './pages/dashboard/user/BookedClasses';
import FavoriteClasses from './pages/dashboard/user/FavoriteClasses';
import ApplyTrainer from './pages/dashboard/user/ApplyTrainer';
import Profile from './pages/dashboard/user/Profile';
import TrainerOverview from './pages/dashboard/trainer/TrainerOverview';
import AddClass from './pages/dashboard/trainer/AddClass';
import MyClasses from './pages/dashboard/trainer/MyClasses';
import TrainerAddPost from './pages/dashboard/trainer/TrainerAddPost';
import TrainerMyPosts from './pages/dashboard/trainer/TrainerMyPosts';
import AdminOverview from './pages/dashboard/admin/AdminOverview';
import ManageUsers from './pages/dashboard/admin/ManageUsers';
import AppliedTrainers from './pages/dashboard/admin/AppliedTrainers';
import ManageTrainers from './pages/dashboard/admin/ManageTrainers';
import ManageClasses from './pages/dashboard/admin/ManageClasses';
import AdminAddPost from './pages/dashboard/admin/AdminAddPost';
import AdminTransactions from './pages/dashboard/admin/AdminTransactions';
import ForumManage from './pages/dashboard/admin/ForumManage';
import NotFound from './pages/NotFound';
import Loading from './components/ui/Loading';
import PrivateRoute from './components/shared/PrivateRoute';
import AdminRoute from './components/shared/AdminRoute';
import TrainerRoute from './components/shared/TrainerRoute';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/classes" element={<><Navbar /><AllClasses /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
          <Route path="/class/:id" element={<PrivateRoute><><Navbar /><ClassDetails /><Footer /></></PrivateRoute>} />
          <Route path="/payment/:id" element={<PrivateRoute><><Navbar /><Payment /><Footer /></></PrivateRoute>} />
          <Route path="/forum" element={<><Navbar /><Forum /><Footer /></>} />
          <Route path="/forum/:id" element={<PrivateRoute><><Navbar /><ForumPostDetails /><Footer /></></PrivateRoute>} />

          <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<UserOverview />} />
            <Route path="booked-classes" element={<BookedClasses />} />
            <Route path="favorites" element={<FavoriteClasses />} />
            <Route path="profile" element={<Profile />} />
            <Route path="apply-trainer" element={<ApplyTrainer />} />
            <Route path="trainer" element={<TrainerRoute><TrainerOverview /></TrainerRoute>} />
            <Route path="trainer/add-class" element={<TrainerRoute><AddClass /></TrainerRoute>} />
            <Route path="trainer/my-classes" element={<TrainerRoute><MyClasses /></TrainerRoute>} />
            <Route path="trainer/add-post" element={<TrainerRoute><TrainerAddPost /></TrainerRoute>} />
            <Route path="trainer/my-posts" element={<TrainerRoute><TrainerMyPosts /></TrainerRoute>} />
            <Route path="admin" element={<AdminRoute><AdminOverview /></AdminRoute>} />
            <Route path="admin/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
            <Route path="admin/applied-trainers" element={<AdminRoute><AppliedTrainers /></AdminRoute>} />
            <Route path="admin/manage-trainers" element={<AdminRoute><ManageTrainers /></AdminRoute>} />
            <Route path="admin/manage-classes" element={<AdminRoute><ManageClasses /></AdminRoute>} />
            <Route path="admin/add-post" element={<AdminRoute><AdminAddPost /></AdminRoute>} />
            <Route path="admin/transactions" element={<AdminRoute><AdminTransactions /></AdminRoute>} />
            <Route path="admin/forum-manage" element={<AdminRoute><ForumManage /></AdminRoute>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <AnimatedRoutes />
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
