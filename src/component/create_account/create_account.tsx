import React from "react";
import { useState } from "react";
import bcrypt from "bcryptjs";

const login: any = sessionStorage.getItem("login");
const token = JSON.parse(login);

const CreateAccount: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff", // Default role
    restaurantId: "67bc54398156b36cc994e2a7",
  });

  // Handle input change
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);
    setFormData({ ...formData, password: hashedPassword });

    var requestOptions: any = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(formData),
      redirect: "follow",
    };

    fetch(
      "https://backend-nwcq.onrender.com/api/users/register",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setLoading(false);
        // if (result) {
        //   setRemoveData(true);
        // }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="py-6 relative min-h-[80vh]">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-40 backdrop-blur-sm z-50">
          <div className="p-4 bg-white rounded-full shadow-lg">
            <img
              src="assets/loading.gif"
              className="w-20 h-20"
              alt="Loading..."
            />
          </div>
        </div>
      )}

      <div>
        <form
          onSubmit={handleSubmit}
          className="lg:shadow-lg lg:p-6 lg:rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-1">
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-2">
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </label>

            <label className="block mb-2">
              Role:
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="staff">Staff</option>
                <option value="restaurant_admin">Restaurant Admin</option>
              </select>
            </label>
          </div>

          <div className="xl:w-1/3 md:w-1/2 mt-6 flex flex-row gap-4 lg:ml-auto lg:justify-end">
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer"
            >
              Create
            </button>
            <button
              type="reset"
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => {}}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
