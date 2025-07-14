import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../../contexts/userContext";
import { useAlertContext } from "../../contexts/alertContext";
import { useNavigate } from "react-router-dom";

export const TimingChange = () => {
  const { fetchRestaurants, currentRestaurant } = useUserContext();
  const { setAlert } = useAlertContext();
  const navigate = useNavigate();

  const [timing, setTiming] = useState({
    opensAt: "",
    closesAt: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTiming((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTimingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/updateTimings/${currentRestaurant.Restaurant_id}`, {
        OpensAt: timing.opensAt,
        ClosesAt: timing.closesAt,
      });

      setAlert({
        message: "Timings updated successfully!",
        type: "success",
      });

      fetchRestaurants();
      setTiming({ opensAt: "", closesAt: "" });
      navigate(-1); // Go back
    } catch (error) {
      console.error("Error updating timings:", error.response?.data || error);
      setAlert({
        message: "Failed to update timings.",
        type: "failure",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Update Timings</h2>
        </div>
        <form onSubmit={handleTimingSubmit} className="px-6 py-8 space-y-6">
          <div>
            <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700 mb-1">
              New Opening Time
            </label>
            <input
              type="time"
              id="openingTime"
              name="opensAt"
              value={timing.opensAt}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700 mb-1">
              New Closing Time
            </label>
            <input
              type="time"
              id="closingTime"
              name="closesAt"
              value={timing.closesAt}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row-reverse gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
