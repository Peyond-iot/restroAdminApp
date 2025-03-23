import React, { useCallback, useEffect, useState } from "react";

const login: any = sessionStorage.getItem("login");
const token = JSON.parse(login);

const Menu = () => {
  const [menuData, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [dupData, setDupData] = useState<any>();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<any>()

  const fetchData = useCallback(async () => {
    setLoading(true);
    const requestOptions: any = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://backend-nwcq.onrender.com/api/menu-items/",
        requestOptions
      );

      setLoading(false);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setDupData(result);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const searchMenu = (title: string) => {
    setDupData(menuData);
    if (title?.length > 1) {
      const dupMenu = dupData.filter(
        (item: any) =>
          item?.title?.toLowerCase().includes(title.toLowerCase()) ||
          item?.price?.toString().includes(title)
      );
      setDupData(dupMenu);
    } else {
      setDupData(menuData);
    }
  };


  let deleteMenu = async(menu: any) => {
    setLoading(true);
    const requestOptions: any = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://backend-nwcq.onrender.com/api/menu-items/${menu?._id}`,
        requestOptions
      );

      setLoading(false);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.body}`);
      }
      fetchData();
    } catch (error) {
      setLoading(false);
    }
  }

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

      <div className="flex flex-row justify-end items-center gap-6 mb-12">
        <div className="fixed flex items-center md:w-1/3 w bg-white border border-gray-300 rounded-full shadow-md focus-within:ring-2 focus-within:ring-red-500 px-4 py-2">
          <img className="w-6 h-6" src="./assets/search.svg" alt="search" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e?.target?.value);
              searchMenu(e?.target?.value);
            }}
            placeholder="Search for food or price..."
            className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 ml-2"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setDupData(menuData);
              }}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✖
            </button>
          )}
        </div>
      </div>

      <div className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dupData?.map((card) => (
            <div
              key={card._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={card.image}
                alt={card.title}
                className="aspect-square w-full h-60 object-cover"
              />
              <div className="w-full p-3">
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {card?.title}
                  </h3>

                  <div className="flex justify-between items-center">
                    <h3 className="text-md text-red-500 font-semibold">
                      {card?.currency}
                      {card?.price}
                    </h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer"
                      onClick={()=>{
                        setShowPopup(true);
                        setSelectedMenu(card);
                      }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to delete <br />
              <span className="text-red-500 font-sans">{selectedMenu?.title} </span> ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteMenu(selectedMenu)
                  setShowPopup(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
