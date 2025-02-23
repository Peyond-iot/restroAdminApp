import React from "react";
import MenuForm from "../component/menu_form/menu_form.tsx";

const AddMenu = () => {
  const handleMenuSubmit = (menuData: any) => {
    console.log("Submitted Menu Data:", menuData);
    // Here you can send `menuData` to your backend or database (e.g., Supabase)
  };

  return (
    <div className="container py-6">
      {/* Heading */}
      <h2 className="text-red-500 font-serif font-bold text-2xl">
        Add Menu
      </h2>

      {/* Menu Form */}
      <div className="mt-6">
        <MenuForm onSubmit={handleMenuSubmit} />
      </div>
    </div>
  );
};

export default AddMenu;
