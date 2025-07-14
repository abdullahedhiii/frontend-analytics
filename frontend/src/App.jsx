
import {createBrowserRouter,RouterProvider,Route, Outlet,createRoutesFromElements} from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Restaurants from './pages/Restaurants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OwnedRestaurants from './pages/OwnedRestaurants';
import Menu from './components/Menu';  // Your menu component
import 'bootstrap/dist/css/bootstrap.min.css';
import RiderDashboard from "./views/rider/RiderDashboard";
import AdminDashboard from './views/AdminDashboard';
import { ChangePicture } from './components/ManageRestaurantPages/ChangePicture';
import { TimingChange } from './components/ManageRestaurantPages/TimingChange';
import { LocationChange } from './components/ManageRestaurantPages/LocationChange';
import { AddItem } from './components/ManageRestaurantPages/AddItem';
import { UpdateAdmin } from './components/ManageRestaurantPages/UpdateAdmin';
import { UpdateMenu } from './components/ManageRestaurantPages/UpdateMenu';


const Layout = () =>{
   return(
      <>
         <Navbar/>
         <Outlet/>
         <Footer/>
      </>
   );
}

const router = createBrowserRouter(
   createRoutesFromElements(
     <Route path='/' element={<Layout />}>
       <Route path='' element={<Home />} />
       <Route path='register' element={<Register />} />
       <Route path='login' element={<Login />} />
       <Route path='restaurants' element={<Restaurants />} />
       <Route path='ownedRestaurants' element = {<OwnedRestaurants/>}/>
       <Route path ='menu/:restaurant_name/:restaurant_id' element = {<Menu/>}/>
       <Route path= 'RiderDashboard' element = {<RiderDashboard/>} />
       <Route path= 'AdminDashboard' element = {<AdminDashboard/>} />
       <Route path= 'manageRestaurant/picture' element = {<ChangePicture/>} />
       <Route path= 'manageRestaurant/timings' element = {<TimingChange/>} />
       <Route path= 'manageRestaurant/locations' element = {<LocationChange/>} />
       <Route path= 'manageRestaurant/additem' element = {<AddItem/>} />
       <Route path= 'manageRestaurant/admin' element = {<UpdateAdmin/>} />
       <Route path= 'manageRestaurant/menu' element = {<UpdateMenu/>} />

       <Route path='*' element={<h1>404 Not Found</h1>} />
     </Route>
   ),
 );

 function App() {
  return (
    <div className="min-h-screen w-full bg-purple-50 flex flex-col">
      
        <RouterProvider router={router}/>

      
    </div>
  );
}


export default App;
