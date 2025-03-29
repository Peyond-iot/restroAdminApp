import React, { useEffect, useRef } from "react";
import { useState } from "react";

type MenuFormProps = {
  onSubmit: (menuData: any) => void;
  setRemove: (remove: boolean) => void;
  removeData: boolean;
  popData: any;
};

const MenuForm: React.FC<MenuFormProps> = ({
  onSubmit,
  setRemove,
  popData,
  removeData,
}) => {
  let [formData, setFormData] = useState({
    image: null as File | null,
    altImage: null as File | null,
    name: "some name",
    title: "",
    desc: "",
    category: "starters",
    type: "veg",
    disclaimer: "Serves 1",
    rating: 4.7,
    price: "",
    currency: "रु.",
  });

  const [preview, setPreview] = useState<string | null>(popData?.image || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      name: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file, altImage: file }));

      // Generate preview URL
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleRemoveImage = async () => {
    if (formData?.image) {
      setFormData((prev) => ({ ...prev, image: null, altImage: null }));
      setPreview(null);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData });
  };

  // Reset form when removeData is true
  useEffect(() => {
    if (removeData) {
      setFormData({
        image: null,
        name: "some name",
        altImage: null,
        title: "",
        desc: "",
        category: "starters",
        type: "veg",
        disclaimer: "Serves 1",
        rating: 4.7,
        price: "",
        currency: "रु.",
      });
    }
  }, [removeData]);

  useEffect(() => {
    if (popData) {
      setFormData({
        image: popData.image,
        name: popData.name,
        altImage: popData.altImage,
        title: popData.title,
        desc: popData.desc,
        category: popData.category,
        type: popData.type,
        disclaimer: popData.disclaimer,
        rating: popData.rating,
        price: popData.price,
        currency: popData.currency,
      });
    }
  }, [popData]);

  return (
    <form
      onSubmit={handleSubmit}
      className={`lg:shadow-lg lg:p-6 lg:rounded-lg ${popData ? "p-6" : ""}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-1">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-red-500 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
            placeholder="Enter menu item title"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block text-red-500 font-semibold mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
          >
            <option value="starters">Starters</option>
            <option value="main-course">Main Course</option>
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
          </select>
        </div>

        {/* Type Dropdown */}
        <div className="mb-4">
          <label className="block text-red-500 font-semibold mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-red-500 font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Currency Dropdown */}
        <div className="mb-4">
          <label className="block text-red-500 font-semibold mb-2">
            Currency
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
          >
            <option value="रु.">रु. (NPR)</option>
            <option value="$">$ (USD)</option>
            <option value="€">€ (EUR)</option>
            <option value="₹">₹ (INR)</option>
          </select>
        </div>

        {/* Disclaimer Dropdown */}
        <div className="mb-4">
          <label className="block text-red-500 font-semibold mb-2">
            Disclaimer
          </label>
          <select
            name="disclaimer"
            value={formData.disclaimer}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
          >
            <option value="Serve 1">Serve 1</option>
            <option value="Serves 1-2">Serves 1-2</option>
            <option value="Serves 2">Serves 2</option>
            <option value="Serves 2-3">Serves 2-3</option>
            <option value="Serves 3-4">Serves 3-4</option>
            <option value="Serves 5-6">Serves 5-6</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-red-500 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
            placeholder="Enter menu item description"
            required
          />
        </div>

        {/* Upload Image */}
        <div className="mb-4">
          <label className="block text-red-500 font-semibold mb-2">
            Upload Image
          </label>
          <div className="cursor-pointer">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>

          {preview && (
            <div className="relative inline-block mt-2">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-lg shadow"
              />
              <button
                onClick={handleRemoveImage}
                className="cursor-pointer absolute top-0 right-0 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs"
              >
                ❌
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="lg:w-1/3 mt-6 flex flex-row gap-4 lg:ml-auto lg:justify-end">
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer"
        >
          {popData ? "Update" : "Add Item"}
        </button>
        {!popData && (
          <button
            type="reset"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
            onClick={() => {
              setRemove(true);
            }}
          >
            Reset
          </button>
        )}
        {popData && (
          <button
            type="reset"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
            onClick={() => {
              setRemove(false);
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default MenuForm;
