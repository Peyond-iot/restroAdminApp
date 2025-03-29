import React from "react";

const DashoardContent = () => {
    return (
        <div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow rounded-lg flex items-center">
              <div>
                <h2 className="text-lg font-bold">Total Food Item</h2>
                <p className="text-gray-500">58 Items</p>
              </div>
            </div>
            <div className="bg-white p-6 shadow rounded-lg flex items-center">
              <div>
                <h2 className="text-lg font-bold">Table Count</h2>
                <p className="text-gray-500">12 tables</p>
              </div>
            </div>
            <div className="bg-white p-6 shadow rounded-lg flex items-center">
              <div>
                <h2 className="text-lg font-bold">Orders Today</h2>
                <p className="text-gray-500">23 Orders</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-bold text-red-500 mb-4">
                🔥 Popular Dishes
              </h2>
              <ul className="space-y-3">
                <li className="flex justify-between text-gray-700">
                  <span>🍗 Chicken Biryani</span> <span>120 Orders</span>
                </li>
                <li className="flex justify-between text-gray-700">
                  <span>🍔 Cheese Burger</span> <span>98 Orders</span>
                </li>
                <li className="flex justify-between text-gray-700">
                  <span>🍕 Pepperoni Pizza</span> <span>87 Orders</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-bold text-red-500 mb-4">
                🔔 Recent Notifications
              </h2>
              <ul className="space-y-3">
                <li className="text-gray-700">
                  ⚠️ Low stock on <strong>Paneer Butter Masala</strong>
                </li>
                <li className="text-gray-700">
                  🔄 Menu item updated: <strong>Spaghetti Carbonara</strong>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 shadow rounded-lg mt-6">
            <h2 className="text-lg font-bold text-red-500 mb-4">
              🎉 Current Offers
            </h2>
            <p className="text-gray-700">
              Get <strong>20% OFF</strong> on all pasta dishes this weekend! 🍝
            </p>
          </div>
        </div>
    )
}

export default DashoardContent;