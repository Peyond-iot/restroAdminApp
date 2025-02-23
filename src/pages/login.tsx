import React, { useState } from "react";
import { supabase } from "../supabaseClient.ts";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isDisabled, setisDisabled] = useState(true);
    const [isLoading, setisLoading] = useState(false);

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState("");

    const changeForm = () => {
      setMessage("")
      setError("")
      setName("")
      setEmail("");
      setPassword("") 
      setisDisabled(true)
    }

    // Name Validation
    const validateName = (name: string) => {
      const nameRegex = /^[A-Za-z\s]{3,}$/; // Allows only letters & spaces, min 3 chars

      if(isSignUp){
        if (!nameRegex.test(name.trim())) {
          setisDisabled(true);
          setError("Please enter a valid name with at least 3 letters.");
          return false;
        }else if(validateEmail(email) && validatePassword(password)){
          setisDisabled(false);
          setError("");
          return true;
        }else{
          setError("")
          return true;
        }
      }      
    };

    // Email Validation
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Password Validation (At least 6 characters)
    const validatePassword = (password: string) => {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?]{6,}$/.test(password);
    };

    const checkEmailExists = async (email: string) => {
        const response = await fetch("/api/getUsers");
        const users = await response.json();
        console.log(users); // List of users from auth.users
      };

    // Signup function
    const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setisLoading(true);
      // const emailExists = await checkEmailExists(email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name }, // Store full name in user metadata
        },
      });

      setTimeout(async () => {
        if (error) {
          setisLoading(false);
          setMessage(error.message);
        }
        // else if (emailExists){
        //     setisLoading(false)
        //     setMessage('This email is already registered. Please log in instead.');
        //     return;
        // }
        else {
          setisLoading(false);
          checkEmailExists(email);
          setMessage("Signup successful! Check your email for confirmation.");
        }
      }, 2000); 
    };

    // Login function
    const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {   
        event.preventDefault();
        setisLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        setTimeout(async ()=>{
            if (error) {
                setisLoading(false)
                setMessage(error.message);
            } else {
                setisLoading(false)
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) {
                  setMessage(error.message)
                } else if(session){
                  window.location.href = '/dashboard'
                }
            }
        },2000)
    };

    const checkEmailInput = async (e) => {

        // Check email
        if (!validateEmail(e)) {
            setisDisabled(true)
            setError("Invalid email format.");
            return;
        }else if(isSignUp){
            if(validateEmail(e) && validatePassword(password) && validateName(name)){
              setisDisabled(false);
              setError(""); // Clear any previous errors
            }
        }else if(!isSignUp){
          if(validateEmail(e) && validatePassword(password)){
            setisDisabled(false);
            setError(""); // Clear any previous errors
          }
        }else {
            setError("");
            return;
        }     
    }

    const checkPasswordInput = async (pass) => {

        // Check password
        if (!validatePassword(pass)) {
            setisDisabled(true);
            setError("Password must be combination of letters and digits and at least 6 characters");
            return;
        }else if(isSignUp){
          if(validateEmail(email) && validatePassword(pass) && validateName(name)){
              setisDisabled(false);
              setError(""); // Clear any previous errors
          }
        }else if(!isSignUp){
          if(validateEmail(email) && validatePassword(pass)){
              setisDisabled(false);
              setError(""); // Clear any previous errors
          }
        }else {
            setError("");
            return;
        }
    }

  
    return (
      <div className="lg:py-0 py-4">
        {isLoading && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-40 backdrop-blur-sm z-50">
                <div className="p-4 bg-white rounded-full shadow-lg">
                <img src="assets/loading.gif" className="w-20 h-20" alt="Loading..." />
                </div>
            </div>
        )}
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="font-bold text-3xl font-serif uppercase mb-6 mx-6 text-center text-red-500">
            Clifford Restaurant
          </h1>
          <div className="flex lg:flex-row flex-col lg:justify-between lg:gap-12 items-center bg-white px-8 rounded-lg shadow-lg lg:w-1/2 mx-6 pb-12">
            <div className="w-full lg:pb-6 pt-6">
              <h2 className="text-2xl font-bold font-mono text-red-500 mb-2">
                {isSignUp ? "Create Account" : "Sign-In"}
              </h2>
              <p className="font-serif text-base text-justify">
                Welcome to{" "}
                <span className="font-bold text-red-500">
                  Clifford Restaurant,
                </span>{" "}
                where flavors come alive with every bite! 🍽️✨ We take pride in
                serving freshly prepared dishes made from the finest
                ingredients, bringing you a delightful culinary experience.
                Enjoy a warm, cozy ambiance perfect for family gatherings,
                romantic dinners, or casual meet-ups. 🍷🍕
              </p>
            </div>

            <div className="w-full pt-6">
              <p className="text-red-500 text-lg text-center font-serif my-2">
                {message}
              </p>

              <form className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-gray-600">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                      value={name}
                      onChange={(e) => {
                        setName(e?.target?.value);
                        validateName(e?.target?.value)
                      }}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                    value={email}
                    onChange={(e) => {
                      setEmail(e?.target?.value);
                      checkEmailInput(e?.target?.value);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-gray-600">Password</label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                      value={password}
                      onChange={(e) => {
                        setPassword(e?.target?.value);
                        checkPasswordInput(e?.target?.value);
                      }}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <img
                          className="w-6 h-6"
                          src="./assets/eye_close.svg"
                          alt="eyeClose"
                        />
                      ) : (
                        <img
                          className="w-6 h-6"
                          src="./assets/eye_open.svg"
                          alt="eyeOpen"
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                  className={`w-full text-white py-2 rounded
                            ${
                              isDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600 cursor-pointer"
                            }`}
                  disabled={isDisabled}
                  onClick={(event) =>
                    isSignUp ? handleSignup(event) : handleLogin(event)
                  }
                >
                  {isSignUp ? "Sign Up" : "Login"}
                </button>
              </form>

              <p className="text-center text-gray-600 mt-4">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    changeForm()}}
                  className="text-red-500 font-bold ml-1 hover:underline cursor-pointer"
                >
                  {isSignUp ? "Login" : "Sign up"}
                </button>
                {isSignUp && <button
                  onClick={() => {
                    changeForm()}}
                  className="text-red-500 font-bold border-l-1 lg:pl-4 lg:ml-4 pl-1 ml-1 hover:underline cursor-pointer"
                >
                  Reset
                </button>} 
              </p> 
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;