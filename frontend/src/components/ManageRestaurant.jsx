import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TrashIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAlertContext } from "../contexts/alertContext";
import { FaTimes } from "react-icons/fa";
import { ChangePicture } from "./ManageRestaurantPages/ChangePicture";
import { useUserContext } from "../contexts/userContext";

const ManageRestaurant = ({
  isOpen,
  onClose,
  restaurant,
}) => {

  const navigate = useNavigate();
  const { setAlert } = useAlertContext();
  const {fetchRestaurants,setAdminData,adminData} = useUserContext();
  const { id } = useParams();
  const [menuId, setMenuId] = useState(restaurant.Menu_id); 
 

  useEffect(() => {
    setMenuId(restaurant.Menu_id);
    fetchRestaurants();
  }, [restaurant.Menu_id]);

  if (!isOpen) return null;



    const handleAdminCred = (e) => {
    e.preventDefault();
    if (restaurant.r_admin && !adminData.Email_address) {
      axios.get('/api/getAdmin/' + restaurant.Location_id)
        .then(res => {
          
          setAdminData({ ...res.data.admin, newPassword: "" })
        })
    }
   navigate('/manageRestaurant/admin');
  }


  
  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        onClick={onClose}
      >
        <XMarkIcon className="h-6 w-6" />
      </button>

        <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
          Manage Restaurant
        </h1>
        <p className="text-gray-700 mb-8 text-lg text-center">
          You are managing restaurant{" "}
          <strong>{restaurant.Restaurant_Name}</strong>
        </p>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuId !== null && (
            <button
              className="bg-purple-600 text-white py-3 px-4 rounded-lg shadow hover:bg-purple-700 transition flex items-center justify-center"
              onClick={() => navigate('/manageRestaurant/menu')}
            >
              <PencilSquareIcon className="h-5 w-5 mr-2" />
              Update Menu
            </button>
          )}

          
          <button
            className="bg-purple-600 text-white py-3 px-4 rounded-lg shadow hover:bg-purple-700 transition flex items-center justify-center"
            onClick={handleAdminCred}
          >
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            {restaurant.r_admin ? 'Update Admin' : 'Add Admin'}
          </button>
          
          {menuId !== null && (
            <button
              className="bg-purple-600 text-white py-3 px-4 rounded-lg shadow hover:bg-purple-700 transition flex items-center justify-center"
              onClick={() => navigate('/manageRestaurant/additem')}
            >
              <PencilSquareIcon className="h-5 w-5 mr-2" />
              Add Menu Item
            </button>
          )}
 <button
            className="bg-purple-600 text-white py-3 px-4 rounded-lg shadow hover:bg-purple-700 transition flex items-center justify-center"
            onClick={() => navigate('/manageRestaurant/timings')}
          >
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Change Timings
          </button>

          <button
            className="bg-purple-600 text-white py-3 px-4 rounded-lg shadow hover:bg-purple-700 transition flex items-center justify-center"
            onClick={() => navigate('/manageRestaurant/locations')}
          >
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Add Location
          </button>

 <button
            className="bg-purple-600 text-white py-3 px-4 rounded-lg shadow hover:bg-purple-700 transition flex items-center justify-center"
            onClick={() => navigate('/manageRestaurant/picture')}
          >
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Change Cover Picture
          </button>

        

      



  


        </div>




      </div>
    </div>
  );
};

export default ManageRestaurant;