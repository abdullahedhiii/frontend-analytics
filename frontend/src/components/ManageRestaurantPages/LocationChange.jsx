import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../contexts/alertContext";
import { useUserContext } from "../../contexts/userContext"
import axios from "axios";
import { useState } from "react";

export const LocationChange = () => {
  const {fetchRestaurants,currentRestaurant} = useUserContext();
  const {setAlert} = useAlertContext()
  const navigate = useNavigate();
 const [locationData, setLocationData] = useState({
    address: "",
    contactNo: "",
  });
  const handleLocationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocationData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    const req = {
      Restaurant_Name: currentRestaurant.Restaurant_Name,
      OpensAt: currentRestaurant.OpensAt,
      closesAt: currentRestaurant.ClosesAt,
      Restaurant_Image: currentRestaurant.Restaurant_Image,
      Owner_id: currentRestaurant.Owner_id,
      Address: locationData.address,
      Contact_No: locationData.contactNo,
    };
    try {
      
      const response = await axios.post(
        "/api/addLocation/",
        JSON.stringify(req),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAlert({
        message: 'Location added successfully',
        type: 'success'
      });
      setLocationData({
        address: "",
        contactNo: "",
        status: true, // Default value
      });
      fetchRestaurants();
      navigate(-1)
    } catch (error) {
      console.error("Error adding location:", error.response?.data || error);
      setAlert({
        message: 'Failed to add location',
        type: 'failure'
      });
    }
  };


    return (
          <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          Add Location for {currentRestaurant.Restaurant_Name}
        </h2>
      </div>
      <form onSubmit={handleLocationSubmit} className="p-6 space-y-6">
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={locationData.address}
            onChange={handleLocationChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="contactNo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={locationData.contactNo}
            onChange={handleLocationChange}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row-reverse gap-3 pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Add Location
          </button>
          <button
            type="button"
            className="w-full sm:w-auto bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
    )
}