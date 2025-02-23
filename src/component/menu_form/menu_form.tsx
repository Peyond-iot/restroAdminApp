import React from "react";
import { useState } from "react";

const MenuForm = ({ onSubmit }: { onSubmit: (menuData: any) => void }) => {
  const [formData, setFormData] = useState({
    image: "",
    altImage: "",
    title: "",
    desc: "",
    category: "starters",
    type: "veg",
    disclaimer: "Serves 1",
    rating: 4.7,
    price: "",
    currency: "रु.",
    public_id: "",
    signature: "",
    api_key: "",
    imageSlider: [],
  });

  let [sliderImages, setSliderImages] = useState<
    { src: string; alt: string }[]
  >([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];

        // Prepare FormData
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "clifford_images"); // Replace with Cloudinary upload preset
        formData.append("cloud_name", "duepdybse"); // Replace with Cloudinary cloud name

        try {
            // Upload to Cloudinary
            const response = await fetch("https://api.cloudinary.com/v1_1/duepdybse/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.secure_url) {
                setFormData(prevData => ({ ...prevData, image: data?.secure_url }));
                setFormData(prevData => ({ ...prevData, public_id: data?.public_id }));
                setFormData(prevData => ({ ...prevData, signature: data?.signature }));
            } else {
                console.error("Cloudinary upload failed:", data);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
};

const handleRemoveImage = async () => {
  if (!formData.public_id) return;

  try {
      // Call Cloudinary API to delete image
      await fetch("https://api.cloudinary.com/v1_1/duepdybse/image/destroy", {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            "public_id": formData?.public_id,
            "signature": formData?.signature,
            "api_key": "344574761446118",
            "timestamp":   Math.floor(Date.now() / 1000)
        }),
      });

      setFormData(prevData => ({ ...prevData, image: "", publicId: "", api_key: "" }));

  } catch (error) {
      console.error("Error deleting image:", error);
  }
};

  const handleAddSliderImage = () => {
    setSliderImages([...sliderImages, { src: "", alt: "" }]);
  };

  const handleSliderImageChange = (
    index: number,
    field: "src" | "alt",
    value: string
  ) => {
    const updatedImages = [...sliderImages];
    updatedImages[index][field] = value;
    setSliderImages(updatedImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, imageSlider: sliderImages });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:shadow-lg lg:p-6 lg:rounded-lg"
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

            <div className="mb-4">
                <label className="block text-red-500 font-semibold mb-2">
                    Upload Image
                </label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded cursor-pointer"
                    accept="image/*"
                />

                {formData?.image && (
                    <div className="relative inline-block mt-2">
                        <img
                            src={formData?.image}
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


            {/* Image Slider */}
            <div className="mb-4">
                <label className="block text-red-500 font-semibold mb-2">
                Image Slider
                </label>
                {sliderImages.map((img, index) => (
                <div key={index} className="flex gap-2 items-center mb-2">
                    <input
                    type="text"
                    placeholder="Image URL"
                    value={img.src}
                    onChange={(e) =>
                        handleSliderImageChange(index, "src", e.target.value)
                    }
                    className="p-2 border rounded w-full"
                    />
                    <input
                    type="text"
                    placeholder="Alt text"
                    value={img.alt}
                    onChange={(e) =>
                        handleSliderImageChange(index, "alt", e.target.value)
                    }
                    className="p-2 border rounded w-full"
                    />
                </div>
                ))}
                <button
                type="button"
                onClick={handleAddSliderImage}
                className={`w-full text-white py-2 rounded
                    ${
                      sliderImages?.length===3
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 cursor-pointer"
                    }`}
                disabled={sliderImages?.length===3}
                >
                Add Image
                </button>
            </div>
        </div>

        {/* Submit Button */}
        <div className="lg:w-1/3 mt-6 flex flex-row gap-4 lg:ml-auto lg:justify-end">
            <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer"
            >
                Add Menu Item
            </button>
            <button
                type="reset"
                className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
                onClick={()=>{
                    sliderImages=[];
                }}
            >
                Reset
            </button>
        </div>
    </form>
  );
};

export default MenuForm;
