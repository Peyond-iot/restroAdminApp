import React, { useCallback, useEffect, useState } from "react";

const login: any = sessionStorage.getItem("login");
const token = JSON.parse(login);

const LiveOrder = () => {
  const [orderedData, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderedData = useCallback(async () => {
    setLoading(true);

    var requestOptions: any = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      redirect: "follow",
    };

    fetch("https://backend-nwcq.onrender.com/api/orders", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setData(result);
        getTables(result);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  let getTables = (result) => {};

  useEffect(() => {
    fetchOrderedData();
    return () => {};
  }, [fetchOrderedData]);

  return (
    <div className="py-6 relative h-[90vh] lg:h-[70vh] xl:h-[80vh]">
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
      {orderedData && (
        <div className="flex flex-col">
          {/* <h1 className="text-2xl font-bold text-red-500 mb-4">Status Page</h1> */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-4 md:grid-cols-2 md:container md:gap-4">
            {orderedData &&
              orderedData?.map((item: any) => (
                <div className="flex flex-row w-full bg-white rounded-lg shadow-red cursor-pointer">
                  <div className="w-full flex">
                    {/* <div className="w-[176px] h-auto">
                                    <img
                                    className="fit-image border-solid border-r-1 border-red-500"
                                    src="https://files.oaiusercontent.com/file-GcpxOMi27BlY2UfZzN6j9V2Q?se=2024-10-10T15%3A00%3A33Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc57acda6-3a6c-4106-b2fb-f0af9e6e29a2.webp&sig=NqY4G5Lry5dljKTFl5bF6SjHpw1FXkxL2vwtFPrWcVs%3D" 
                                    alt="chowmein"
                                    />
                                </div> */}
                    <div className="w-full pl-4 flex flex-row justify-between">
                      <div className="w-[50%] mr-2 overflow-hidden items-center py-2">
                        <h2 className="text-lg sm:max-w-[150px] sm:truncate leading-[26px] lg:leading-normal font-mono text-red-500">
                          {item?.name}
                        </h2>
                        <div className="flex flex-col gap-1">
                          <div className="w-full text-gray-400 text-base leading-relaxed">
                            Quantity: {item?.quantity}
                          </div>
                          <div>Table:</div>
                        </div>
                      </div>
                      <div className="w-[50%] text-center items-center justify-center">
                        <div
                          className={`rounded-bl-md w-full text-white px-2 pb-1
                                            ${
                                              item?.status === "pending"
                                                ? "bg-blue-500"
                                                : item?.status ===
                                                  "in-preparation"
                                                ? "bg-yellow-500"
                                                : item?.status === "completed"
                                                ? "bg-red-500"
                                                : item?.status === "served"
                                                ? "bg-green-500"
                                                : "bg-grey-500"
                                            }`}
                        >
                          {item?.status === "pending"
                            ? "Confirmed"
                            : item?.status === "in-preparation"
                            ? "Cooking"
                            : item?.status === "completed"
                            ? "Order Ready"
                            : item?.status === "served"
                            ? "Served"
                            : "Unknown"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveOrder;
