import React from "react";

type SidebarProps = {
  setActiveTab: (tab: string) => void;
  activeTab: string;
};

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
  const menuButtons = [
    { text: "Dashboard", icon: "assets/dashboard.svg", icon_w: "assets/dashboard-w.svg"},
    { text: "Menu", icon: "assets/menu.svg", icon_w: "assets/menu-w.svg"},
    { text: "Add Menu", icon: "assets/add_menu.svg", icon_w: "assets/add_menu-w.svg"},
    { text: "Staff", icon: "assets/user.svg", icon_w: "assets/user-w.svg"},
    { text: "Create Account", icon: "assets/create_user.svg", icon_w: "assets/create_user-w.svg" },
    { text: "Tables", icon: "assets/table.svg", icon_w: "assets/table-w.svg" },
    { text: "Live Order", icon: "assets/live_order.svg", icon_w: "assets/live_order-w.svg" },
  ];

  return (
    <div className="w-auto bg-white text-red shadow-md h-screen lg:py-12 py-6 fixed">
      <div className="flex flex-col gap-2 lg:gap-4">
        {menuButtons.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(item.text)}
            className={`py-2 text-sm font-bold cursor-pointer
                ${
                  activeTab === item.text
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-500"
                }`}
          >
            <div className="flex gap-2 items-center px-4 md:px-6">
              {activeTab === item.text ? <img
                src={item.icon_w}
                className="w-6 h-6"
                alt=""
              /> :<img
              src={item.icon}
              className="w-6 h-6"
              alt=""
            /> }
              <span className="text-md hidden md:flex">{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
