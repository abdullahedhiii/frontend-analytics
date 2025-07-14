import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../contexts/alertContext";
import { TrashIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaTimes } from "react-icons/fa";


export const UpdateMenu = () => {
  const navigate = useNavigate();
  const { fetchRestaurants,currentRestaurant } = useUserContext();
  const {setAlert} = useAlertContext();


  const [menuItems, setMenuItems] = useState([]);
  const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`/api/menu/${currentRestaurant.Restaurant_id}`);
        setMenuItems(response.data);
        
      } catch (err) {
        setError("Failed to fetch menu items.");
      }
    };
  


  const handleDeleteItemClick = async (item_id) => {
    try {
      const response = await axios.post(
        `/api/deleteItem/${currentRestaurant.Restaurant_id}`,
        { item_id: item_id }
      );
      const temp = menuItems;

      setMenuItems(temp.filter((ele) => ele.Item_id != item_id));
    } catch (err) {
      
    }
  };
  
  const handleUpdateMenuClick = async () => {
    await fetchMenuItems();
  };

    useEffect(() => {
    
   handleUpdateMenuClick()

  },[])

   const [updatedItem, setUpdated] = useState({
      // Item_id : 0,
      // name: "",
      // price: "",
      // cuisine: "",
      // image: null,
    });
    const [updateItemPopup, setPopup] = useState(false);

  const handleUpdateItemClick = (item) => {
    
    setUpdated(item);
    setPopup(true);
  };

  
  const handleupdatedItemChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      
      setUpdated((prevValues) => ({
        ...prevValues,
        image: e.target.files[0],
      }));
    } else {
      
      setUpdated((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const submitUpdatedItem = async (e) => {
    e.preventDefault();
    
    

    const formData = new FormData();

    formData.append("Item_id", updatedItem.Item_id);
    formData.append("Dish_Name", updatedItem.Dish_Name);
    formData.append("Item_Price", updatedItem.Item_Price);
    formData.append("Cuisine", updatedItem.Cuisine);

    if (updatedItem.image) {
      formData.append("image", updatedItem.image);
    }

    try {
      const res = await axios.post(
        `/api/updateItem/${currentRestaurant.Restaurant_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMenuItems(
        menuItems.map((ele) => {
          if (ele.Item_id === updatedItem.Item_id) {
            return {
              ...ele,
              Dish_Name: updatedItem.Dish_Name,
              Item_Price: updatedItem.Item_Price,
              Cuisine: updatedItem.Cuisine,
              Image: updatedItem.Item_image,
            };
          }
          return ele;
        })
      );

      
      setPopup(false);
      setUpdated({});
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };



  return (
     <div className="flex items-center justify-center p-4 overflow-y-auto">
        <div className="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
            <h2 className="text-xl font-semibold">Update Menu</h2>
            <button
              onClick={() => navigate(-1)}
              className="hover:bg-purple-700 rounded-full p-1 transition"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
    
          <div className="overflow-y-auto flex-grow">
            <div className="p-6">
              {menuItems.length > 0 ? (
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div
                      key={item.item_id}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{item.Dish_Name}</h3>
                        <p className="text-gray-600">Rs. {item.Item_Price}</p>
                      </div>
    
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            handleUpdateItemClick(item)
                          }}
                          className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-full transition"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItemClick(item.Item_id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No items in the menu.</p>
              )}
            </div>

            {updateItemPopup && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                  <div className="bg-purple-600 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                      Update Menu Item
                    </h2>
                    <button 
                      onClick={() => setPopup(false)}
                      className="text-white hover:text-purple-200 transition-colors"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
            
                  <form onSubmit={submitUpdatedItem} className="p-6 space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Item Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="Dish_Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 
                        transition-all duration-300"
                        value={updatedItem.Dish_Name}
                        onChange={handleupdatedItemChange}
                        required
                      />
                    </div>
            
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="Item_Price"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 
                        transition-all duration-300"
                        value={updatedItem.Item_Price}
                        onChange={handleupdatedItemChange}
                        required
                      />
                    </div>
            
                    <div>
                      <label
                        htmlFor="cuisine"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Cuisine
                      </label>
                      <input
                        type="text"
                        id="cuisine"
                        name="Cuisine"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 
                        transition-all duration-300"
                        value={updatedItem.Cuisine}
                        onChange={handleupdatedItemChange}
                        required
                      />
                    </div>
            
                    <div>
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Upload Image
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                        file:mr-4 file:rounded-lg file:border-0 file:bg-purple-50 
                        file:text-purple-700 hover:file:bg-purple-100 
                        focus:outline-none focus:ring-2 focus:ring-purple-500"
                        onChange={handleupdatedItemChange}
                        required
                      />
                    </div>
            
                    <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                      <button
                        type="button"
                        className="w-full sm:w-auto px-4 py-3 bg-gray-100 text-gray-700 
                        rounded-lg hover:bg-gray-200 transition-colors duration-300"
                        onClick={() => setPopup(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-4 py-3 bg-purple-600 text-white 
                        rounded-lg hover:bg-purple-700 transition-colors duration-300 
                        transform active:scale-95"
                      >
                        Update Item
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            
          </div>
        </div>
      </div>
  )
}