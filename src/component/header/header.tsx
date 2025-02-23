import React from "react";
import { useState } from "react";
import { supabase } from "../../supabaseClient.ts";
import { Link } from "react-router-dom";

interface HeaderListProps{
    userDetails: any;
    url: string;
}

const Header: React.FC<HeaderListProps> = ({ userDetails, url }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  const logout = async () => {
        const { error } = await supabase.auth.signOut();
            
        if (error) {
            console.error("Logout failed:", error.message);
            return;
        }
    };


  return (
    <header className="sticky top-0 bg-white z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Left: Logo */}
        <Link className="text-2xl font-bold !text-red-500 cursor-pointer" to={'/'}>
          Clifford Restaurant
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-red-500 text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 
          (<img
            className="w-4 h-4"
            src="./assets/cross.svg"
            alt="close"
            />) : 
          (<img
            className="w-6 h-6"
            src="./assets/breadcrumb.svg"
            alt="breadcrumb"
        />)}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <Link 
            to="/menu" 
            className={`!text-red-500 hover:underline uppercase ${url === '/menu' ? "border-red-500 border-b" : ""}`}
          >
            Menu
          </Link>
          <a href="#" className="!text-red-500 hover:underline uppercase">Create Menu</a>
          <a href="#" className="!text-red-500 hover:underline uppercase">Edit Menu</a>
          <Link 
            to="/add-menu" 
            className={`!text-red-500 hover:underline uppercase ${url === '/add-menu' ? "border-red-500 border-b" : ""}`}
          >
            Add Menu
          </Link>
          <a href="#" className="!text-red-500 hover:underline uppercase">Live Orders</a>
          <a href="#" className="!text-red-500 hover:underline uppercase">Bills</a>
          <a href="#" className="!text-red-500 hover:underline uppercase">Orders</a>
        </nav>

        {/* Right: Profile Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex flex gap-6">
            <div className="flex space-x-1 hover:underline cursor-pointer">
                <img
                    className="w-5 h-5"
                    src="./assets/user.svg"
                    alt="user"
                />
                <a href="#" className="!text-red-500">{userDetails?.full_name}</a>
            </div>
            <div className="flex space-x-1 hover:underline cursor-pointer">
                <img
                    className="w-6 h-6"
                    src="./assets/sign_out.svg"
                    alt="signout"
                />
                <a href="" className="!text-red-500" onClick={() => {
                    localStorage.clear()
                    logout();
                    }}>Sign-Out</a>
            </div>
        </div>
      </div>

      {/* Mobile Menu Popup */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-1/2 bg-opacity-40 backdrop-blur-sm z-50 shadow-lg p-5 flex flex-col space-y-4 md:hidden">
          <a href="#" className="!text-red-500 text-lg hover:underline flex items-center space-x-2 uppercase">
          <img
                className="w-6 h-6"
                src="./assets/menu.svg"
                alt="menu"
            />
            <span>Menu</span>
          </a>
          <a href="#" className="!text-red-500 text-lg hover:underline flex items-center space-x-2 uppercase">
          <img
                className="w-6 h-6"
                src="./assets/menu.svg"
                alt="menu"
            />
            <span>Create Menu</span>
          </a>
          <a href="#" className="!text-red-500 text-lg hover:underline flex items-center space-x-2 uppercase">
          <img
                className="w-6 h-6"
                src="./assets/menu.svg"
                alt="menu"
            />
            <span>Add Menu</span>
          </a>
          <a href="#" className="!text-red-500 text-lg hover:underline flex items-center space-x-2 uppercase">
          <img
                className="w-6 h-6"
                src="./assets/menu.svg"
                alt="menu"
            />
            <span>Live Orders</span>
          </a>
          <a href="#" className="!text-red-500 text-lg hover:underline flex items-center space-x-2 uppercase">
          <img
                className="w-6 h-6"
                src="./assets/menu.svg"
                alt="menu"
            />
            <span>Bills</span>
          </a>
          <a href="#" className="!text-red-500 text-lg hover:underline flex items-center space-x-2 uppercase">
          <img
                className="w-6 h-6"
                src="./assets/menu.svg"
                alt="menu"
            />
            <span>Orders</span>
          </a>
          {/* <a href="#" className="!text-red-500 text-lg hover:underline flex space-x-2">
          <img
                className="w-6 h-6"
                src="./assets/user.svg"
                alt="user"
            />
            <span>Food</span>
          </a> */}
          <a href="#" className="!text-red-500 text-lg hover:underline flex items-center space-x-2 uppercase">
          <img
                className="w-6 h-6"
                src="./assets/user.svg"
                alt="user"
            />
            <span>{userDetails?.full_name}</span>
          </a>
          <a href="" onClick={() => {
            localStorage.clear()
            logout();
            }} className="!text-red-500 text-lg hover:underline flex items-center space-x-2 uppercase">
          <img
                className="w-6 h-6"
                src="./assets/sign_out.svg"
                alt="signout"
            />
            <span>Sign-out</span>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
