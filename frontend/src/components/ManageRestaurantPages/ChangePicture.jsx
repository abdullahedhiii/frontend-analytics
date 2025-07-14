import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../contexts/alertContext";

export const ChangePicture = () => {
  const navigate = useNavigate();
  const { fetchRestaurants,currentRestaurant } = useUserContext();
  const {setAlert} = useAlertContext();
  const [newImage, setNewImage] = useState(null);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!newImage) {
      setAlert({ message: "Please select an image", type: "failure" });
      return;
    }

    const formData = new FormData();
    formData.append("Restaurant_image", newImage);

    try {
      const response = await axios.post(
        `/api/changeRestaurantImage/${currentRestaurant.Restaurant_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAlert({ message: "Image updated successfully", type: "success" });
      fetchRestaurants();
      navigate(-1); // go back after success
    } catch (error) {
      console.error("Error changing image:", error.response?.data || error);
      setAlert({ message: "Failed to update image.", type: "failure" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6">
          Change Restaurant Picture
        </h2>

      
        <form onSubmit={handleImageSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Image
            </label>
            <input
              type="file"
              id="newImage"
              name="New_Image"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row-reverse gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Change
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
  );
};
