import React, { useCallback, useEffect, useState } from "react";

const login: any = sessionStorage.getItem("login");
const token = JSON.parse(login);

const Staff = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>();

  const fetchUserData = useCallback(async () => {
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
        "https://backend-nwcq.onrender.com/api/users",
        requestOptions
      );

      setLoading(false);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setUser(result);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  let deleteUser = async (user: any) => {
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
        `https://backend-nwcq.onrender.com/api/users/${user?._id}`,
        requestOptions
      );

      setLoading(false);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.body}`);
      }
      fetchUserData();
    } catch (error) {
      setLoading(false);
    }
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

      {user?.length && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {user?.map((data) => (
             data?.role === "staff" && <div className="flex flex-col gap-1 justify-center items-center">
                <div
                  key={data._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden items-center"
                >
                  <img
                    src="assets/user.svg"
                    className="aspect-4/5 w-16"
                    alt="user"
                  />
                  <div className="w-64 p-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-gray-500 font-semibold truncate">
                        Name: <span className="text-red-500">{data?.name}</span>
                      </h3>

                      <div className="flex flex-col gap-4 justify-between">
                        <h3 className="text-md text-gray-500 font-semibold truncate">
                          Email: <span className="text-red-500">{data?.email}</span>
                        </h3>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer">
                            Edit
                          </button>
                          <button
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 cursor-pointer"
                            onClick={() => {
                              setShowPopup(true);
                              setSelectedUser(data);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete Confirmation Popup */}
                {showPopup && (
                  <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                      <p className="mb-4 text-lg font-semibold">
                        Are you sure you want to delete <br />
                        User{" "}
                        <span className="text-red-500 font-sans">
                          {" "}
                          {selectedUser?.name}
                        </span>{" "}
                        ?
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
                            deleteUser(selectedUser);
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
