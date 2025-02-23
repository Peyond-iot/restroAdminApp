import React, { useCallback, useEffect, useState } from "react";

const Menu = () => {
  const [menuData, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [dupData, setDupData] = useState<any>();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://backend-nwcq.onrender.com/api/menuItems"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result); // Assuming the API returns an array or object
      setDupData(result);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const searchMenu = (title: string) =>{
    setDupData(menuData)
    if(title?.length>1){
        const dupMenu = dupData.filter((item:any)=>(item?.title?.toLowerCase().includes(title.toLowerCase()) || (item?.price)?.toString().includes(title)))
        setDupData(dupMenu);
    }else{
        setDupData(menuData);
    }
  }

  return (
    <div className="py-6 container">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-40 backdrop-blur-sm z-50">
          <div className="p-4 bg-white rounded-full shadow-lg">
            <img
              src="assets/loading.gif"
              className="w-20 h-20"
              alt="Loading..."
            />
          </div>
        </div>
      )}
      <div className="flex flex-row justify-between items-center gap-6">
        <h2 className="w-1/3 text-red-500 font-serif font-bold text-2xl">
          Menu
        </h2>
        <div className="flex items-center lg:w-1/3 w-full bg-white border border-gray-300 rounded-full shadow-md focus-within:ring-2 focus-within:ring-red-500 px-4 py-2">
          <img className="w-6 h-6" src="./assets/search.svg" alt="eyeOpen" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
                setQuery(e?.target?.value)
                searchMenu(e?.target?.value)
            }}
            placeholder="Search for food or price..."
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 ml-2"
          />

          {/* Clear Button (Shows only when there is input) */}
          {query && (
            <button
              onClick={() => {
                setQuery("")
                setDupData(menuData)
            }}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✖
            </button>
          )}
        </div>
      </div>
      <div className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dupData?.map((card) => (
            <div
              key={card._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {/* Image */}
              <img
                src={card.image}
                alt={card.title}
                className="aspect-square w-full h-60 object-cover"
              />

              {/* Card Footer (Title + Buttons) */}
              <div className="flex justify-between items-center p-3">
                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {card?.title}
                    </h3>
                    <h3 className="text-md text-red-500 font-semibold">
                        {card?.currency}{card?.price}
                    </h3>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
