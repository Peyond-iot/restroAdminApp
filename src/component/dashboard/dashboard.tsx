import React, { useState } from "react";
import Sidebar from "../sidebar/sidebar.tsx";
import Menu from "../menu/menu.tsx";
import AddMenu from "../add_menu/addMenu.tsx";
import DashoardContent from "./dashboard_content/dashboard_content.tsx";
import CreateAccount from "../create_account/create_account.tsx";
import Table from "../table/table.tsx";

const Dashboard = () => {
  const [isLoading, setisLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const logOut = () => {
    setisLoading(true);
    window.location.reload();
    sessionStorage.clear();
  };

  return (
    <div>
      {isLoading && (
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
      <div className="sticky top-0 bg-white z-50 shadow-md">
        <div className="flex flex-row justify-between items-center container !py-4">
          <h2 className="text-red-500 font-serif font-bold text-2xl">
            {activeTab}
          </h2>
          <div className="flex flex gap-6">
            <div className="flex space-x-1 hover:underline cursor-pointer">
              <img className="w-6 h-6" src="./assets/user.svg" alt="user" />
            </div>
            <div className="flex space-x-1 hover:underline cursor-pointer">
              <img
                className="w-6 h-6"
                src="./assets/sign_out.svg"
                alt="signout"
                onClick={() => {
                  logOut();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        <div className="flex-1 !pl-20 md:!pl-48 lg:!pl-34 py-6 container">
          {activeTab === "Dashboard" && <DashoardContent/>}
          {activeTab === "Menu" && <Menu/>}
          {activeTab === "Add Menu" && <AddMenu/>}
          {activeTab === "Staff" && <AddMenu/>}
          {activeTab === "Create Account" && <CreateAccount/>}
          {activeTab === "Tables" && <Table/>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
