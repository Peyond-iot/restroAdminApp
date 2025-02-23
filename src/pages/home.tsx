import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from "./login.tsx";
import Dashboard from './dashboard.tsx';
import { supabase } from "../supabaseClient.ts";
import Header from "../component/header/header.tsx";
import Menu from "./menu.tsx";
import AddMenu from "./addMenu.tsx";

const Home = () => {
    return (
        <Router>
          <MainLayout />
        </Router>
      );
}

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const location = useLocation();
  const[userDetails, setUserDetails] = useState<any>();
  const [route, setRoute] = useState<boolean>();

    useEffect(() => {  

      const fetchSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          if(location.pathname === '/' || location.pathname === '/sign-in'){
            navigate('/dashboard')
          }
          setRoute(true);
          const user: any = JSON.stringify(session?.user?.user_metadata);
          localStorage.setItem('userDetails', user);
          setUserDetails(JSON.parse(user));
        } else {
          setRoute(false)
          navigate('/sign-in')
        }
        setTimeout(()=>{
          setLoading(false);
        },2000)
      };
    
      fetchSession();

    }, [navigate]);

    return (
        <div>
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-40 backdrop-blur-sm z-50">
                <div className="p-4 bg-white rounded-full shadow-lg">
                <img src="assets/loading.gif" className="w-20 h-20" alt="Loading..." />
                </div>
            </div>
        )}
          {route && <Header userDetails={userDetails} url={location?.pathname}/>}
          <Routes>
            {!route && (
                <>
              <Route path="/sign-in" element={<Login/>} />
              </>
            )}
              {/* Protected Routes */}
            {route && (
              <>
                <Route path="/dashboard" element={<Dashboard userDetails={userDetails}/>}/>
                <Route path="/menu" element={<Menu/>} />
                <Route path="/add-menu" element={<AddMenu/>} />
              </>
            )}
          </Routes>
        </div>
    );

}

export default Home