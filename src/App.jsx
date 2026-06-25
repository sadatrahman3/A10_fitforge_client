import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
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

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Routes>
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
          </div>
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
