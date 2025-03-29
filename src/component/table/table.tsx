import React, { useCallback, useEffect, useState } from "react";

const login: any = sessionStorage.getItem("login");
const token = JSON.parse(login);

const Table = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [table, setTable] = useState<any>([]);
  const [tableNumber, setTableNumber] = useState<number>();
  const [error, setError] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>();

  const fetchTableData = useCallback(async () => {
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
        "https://backend-nwcq.onrender.com/api/tables",
        requestOptions
      );

      setLoading(false);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setTable(result);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  let setTableNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const tableNo = Number(e.target.value);
      setTableNumber(tableNo);
    }
  };

  let createTable = async (e: React.FormEvent) => {
    setError("");
    e.preventDefault();
    setLoading(true);
    const requestOptions: any = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableNumber: tableNumber }),
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://backend-nwcq.onrender.com/api/tables/create",
        requestOptions
      );

      setLoading(false);

      if (!response.ok) {
        const result = await response.json();
        setError(result.message);
        throw new Error(`HTTP error! Status: ${response.body}`);
      }
      fetchTableData();
    } catch (error) {
      setLoading(false);
    }
  };

  let deleteTable = async(table: any) =>{
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
        `https://backend-nwcq.onrender.com/api/tables/${table?._id}`,
        requestOptions
      );

      setLoading(false);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.body}`);
      }
      fetchTableData();
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

      {table?.length && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {table?.map((tab) => (
              <div className="relative flex flex-col gap-1 justify-center items-center">
                <button
                  onClick={() => {
                    setShowPopup(true);
                    setSelectedTable(tab);
                }}
                  className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <img
                    src="assets/delete.svg"
                    className="w-5 h-5"
                    alt="table"
                  />
                </button>

                {/* Table Image */}
                <img src="assets/table.svg" className="w-16 h-16" alt="table" />
                <span className="text-red font-mono text-lg">
                  Table {tab?.tableNumber}
                </span>

                {/* Delete Confirmation Popup */}
                {showPopup && (
                  <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                      <p className="mb-4 text-lg font-semibold">
                        Are you sure you want to delete <br/><span className="text-red-500 font-sans">Table No. {selectedTable?.tableNumber}</span> ?
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
                            deleteTable(selectedTable)
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

      <div className="mt-12 items-center flex justify-center">
        <form onSubmit={createTable}>
          <div className="flex flex-col gap-1 justify-center">
            <label className="block text-red-500 font-semibold mb-2">
              Create table number
            </label>
            <div className="flex flex-col gap-1 justify-center items-center">
              <input
                type="number"
                name="tableNumber"
                onChange={setTableNo}
                className="p-2 border rounded focus:ring-2 focus:ring-red-500"
                placeholder="Table No."
                required
              />
              {error && <div className="text-red-500 font-serif">{error}</div>}
              <button
                type="submit"
                className="mt-3 w-2/3 bg-red-500 text-white py-2 px-1 rounded hover:bg-red-600 cursor-pointer"
              >
                Create Table
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Table;
