import React, { useState } from "react";
import MenuForm from "../menu_form/menu_form.tsx";

const login: any = sessionStorage.getItem("login");
const token = JSON.parse(login);

const AddMenu = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [removeData, setRemoveData] = useState<boolean>(true);

  const handleMenuSubmit = async (menuData: any) => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token}`);

    var formdata = new FormData();
    formdata.append("name", menuData.name);
    formdata.append("title", menuData.name);
    formdata.append("desc", menuData.desc);
    formdata.append("category", menuData.category);
    formdata.append("type", menuData.type.toLowerCase());
    formdata.append("disclaimer", menuData.disclaimer);
    formdata.append("rating", menuData.rating.toString());
    formdata.append("price", menuData.price);
    formdata.append("currency", menuData.currency);
    formdata.append("available", "true");
    formdata.append("size", "medium");
    formdata.append("spicy_prefer", "true");
    if (menuData.image)
      formdata.append("image", menuData.image, menuData.image.name);
    if (menuData.altImage)
      formdata.append("altImage", menuData.altImage, menuData.altImage.name);

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://backend-nwcq.onrender.com/api/menu-items/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setLoading(false);
        if (result) {
          setRemoveData(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });

   
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
      {/* Menu Form */}
      <div>
        <MenuForm onSubmit={handleMenuSubmit} setRemove={setRemoveData} removeData={removeData} popData={''} />
      </div>
    </div>
  );
};

export default AddMenu;
