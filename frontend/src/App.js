import './App.css';
import Footer from './Componets/Footerr/Footer';
import Home from './Componets/Home/Home';
import Navbar from './Componets/Navbar/Navbar';
import { Routes,Route, useNavigate } from 'react-router-dom';
import Register from './Componets/auth/Register';
import Intern from "./Componets/Internships/Intern"
import JobAvl from "./Componets/Job/JobAvl"
import JobDetail from './Componets/Job/JobDetail';
import InternDeatil from "./Componets/Internships/InternDeatil"
import { useDispatch, useSelector } from 'react-redux';
import { login,logout,selectUser } from "./Feature/Userslice"
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import ViewAllApplication from "./Admin/ViewAllApplication"
import Postinternships from './Admin/Postinternships';
import DeatilApplication from './Applications/DeatilApplication';
import UserApplicatiom from './profile/UserApplicatiom';
import UserapplicationDetail from "./Applications/DeatilApplicationUser"
import VerifyOTP from './Componets/OTP/VerifyOTP.jsx';
import VideoUpload from './Componets/videoUpload/VideoUpload.jsx'
import Resume from './Componets/resume/Resume.jsx';
import Payment from './Componets/payment/Payment.jsx';

function App() {
  const navigate = useNavigate();
  const user=useSelector(selectUser);
  const dispatch=useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
  
          uid:authUser.uid,
          photo:authUser.photoURL,
          name:authUser.displayName,
          email:authUser.email,
          phoneNumber:authUser.phoneNumber
        }))
      }
        else{
          dispatch(logout())
        }
    })
    },[dispatch] );
    // useEffect(() => {
    //   // Assuming you want to redirect after 3 seconds
    //   setTimeout(() => {
    //     navigate('/uploadvideo');
    //   }, 3000); // 3 seconds
    // }, [navigate]);
  return (
    <div className="App">
<Navbar/>



<Routes>
  <Route path='/' element={<Home/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/internship' element={<Intern/>}/>
<Route path='/Jobs' element={<JobAvl/>}/>
<Route path='/profile' element={<Profile/>}/>
<Route path='/detailjob' element={<JobDetail/>}/>
<Route path='/detailInternship' element={<InternDeatil/>}/>
<Route path='/detailApplication' element={<DeatilApplication/>}/>
<Route path='/adminLogin' element={<AdminLogin/>}/>
<Route path='/adminepanel' element={<Adminpanel/>}/>
<Route path='/postInternship' element={<Postinternships/>}/>
<Route path='/applications' element={<ViewAllApplication/>}/>
<Route path='/UserapplicationDetail' element={< UserapplicationDetail/>}/>
<Route path='/userapplication' element={<UserApplicatiom/>}/>
<Route path='/uploadvideo' element={<VideoUpload/>}/>
<Route path='/verifyOTP' element={<VerifyOTP/>}/>
<Route path='/resume' element={<Resume/>}/>






</Routes>
<Footer/>
    </div>
  );
}

export default App;
