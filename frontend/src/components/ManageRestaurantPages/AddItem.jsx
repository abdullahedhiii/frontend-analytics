import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../contexts/alertContext";

export const AddItem = () => {
    const {fetchRestaurants,currentRestaurant} = useUserContext();
    const {setAlert} = useAlertContext()
    const navigate = useNavigate();
  const [menuId, setMenuId] = useState(currentRestaurant.Menu_id); // Local state to track menu_id


    const [menuItem, setMenuItem] = useState({
    name: "",
    price: "",
    cuisine: "",
    category: "other", //if not specified
    image: null,
  });


     const handleMenuItemChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      
      setMenuItem((prevValues) => ({
        ...prevValues,
        image: e.target.files[0], 
      }));
    } else {
      setMenuItem((prevValues) => ({
        ...prevValues,
        [name]: value, 
      }));
    }
  };


    const handleMenuItemSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", menuItem.name);
    formData.append("price", menuItem.price);
    formData.append("cuisine", menuItem.cuisine);
    formData.append("category", menuItem.category);
    if (menuItem.image) {
      
      formData.append("image", menuItem.image);
    }
    formData.append("menu_id", menuId);
    try {
      
      const response = await axios.post(
        `/api/addMenuItem/${currentRestaurant.Restaurant_id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setAlert({
        message: 'Menu item added successfully!',
        type: 'success'
      });
      
      fetchRestaurants(); // Refresh the menu
      setMenuItem({
        name: "",
        price: "",
        cuisine: "",
        image: null,
      });
      navigate(-1)
    } catch (error) {
      console.error("Error adding menu item:", error.response?.data || error);
      setAlert({
        message: 'Failed to add menu item',
        type: 'failure'
      });
    }
  };


  return (
   <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          Add Menu Item
        </h2>
      </div>
      <div className="p-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
        <form onSubmit={handleMenuItemSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={menuItem.name}
              onChange={handleMenuItemChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={menuItem.price}
              onChange={handleMenuItemChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="cuisine"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cuisine
            </label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={menuItem.cuisine}
              onChange={handleMenuItemChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={menuItem.category}
              onChange={handleMenuItemChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              onChange={handleMenuItemChange}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row-reverse gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Add Item
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
  </div>
  )
}