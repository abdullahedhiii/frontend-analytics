import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../contexts/alertContext";


export const UpdateAdmin = () => {
  const navigate = useNavigate();
  const { fetchRestaurants,currentRestaurant,adminData, setAdminData } = useUserContext();
  const {setAlert} = useAlertContext();



  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      

      if (currentRestaurant.r_admin === null) {
        

        const response = await axios.post(
          `/api/addAdmin/${currentRestaurant.Restaurant_id}`,
          { adminData, Location_id: currentRestaurant.Location_id }
        );
        if (response.status === 200) {
          setAlert({
            message: 'Admin added',
            type: 'success'
          });
        }
      }
      else {
        
        axios.post('/api/updateAdmin', JSON.stringify({ adminData }), { withCredentials: true, headers: { "Content-Type": "application/json" } })
          .then(res => {
            setAlert({
              message: 'Admin updated successfully',
              type: 'success'
            });
          })

      } 
       navigate(-1)

    } catch (err) {
    console.log(err)
      setAlert({
        message: 'Error adding admin',
        type: 'failure'
      });
    }
  };

  return (
    <div className="flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden">
      <div className="bg-purple-600 p-4">
        <h2 className="text-xl font-semibold text-white text-center">
          {currentRestaurant.r_admin ? 'Update Admin' : 'Add Admin'}
        </h2>
      </div>
      <div className="p-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
        <form onSubmit={handleAdminSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="admin_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Admin Name
            </label>
            <input
              type="text"
              id="admin_name"
              name="Admin_Name"
              value={adminData.Admin_Name}
              onChange={handleAdminChange}
              required
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="email_address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email_address"
              name="Email_address"
              value={adminData.Email_address}
              onChange={handleAdminChange}
              required
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="account_password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {currentRestaurant.r_admin ? 'Current Password' : 'Password'}
            </label>
            <input
              type="password"
              id="account_password"
              name="Account_Password"
              value={adminData.Account_Password}
              onChange={handleAdminChange}
              required
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          {currentRestaurant.r_admin && (
            <div>
              <label
                htmlFor="new_password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="new_password"
                name="newPassword"
                value={adminData.newPassword}
                onChange={handleAdminChange}
                required
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="phone_no"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_no"
              name="Phone_no"
              value={adminData.Phone_no}
              onChange={handleAdminChange}
              required
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col sm:flex-row-reverse gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {currentRestaurant.r_admin ? 'Update Admin' : 'Create Admin'}
            </button>
            <button
              type="button"
              className="w-full sm:w-auto bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200"
              onClick={() => setAdminPopup(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}