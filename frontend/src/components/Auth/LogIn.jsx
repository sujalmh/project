import axiosInstance from "../../axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous errors

    try {
      const response = await axiosInstance.post("/api/login", {
        username,
        password,
      });

      // Assuming the response contains the access token
      const { access_token } = response.data;

      // Store the token in localStorage
      localStorage.setItem("jwtToken", access_token);

      // Redirect to a secure page after login
      navigate("/"); // Or whichever page you want to redirect the user to
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="flex border border-gray-700 shadow shadow-gray-400 text-lightWhite flex-col max-w-md min-w-[25rem] px-10 pt-7 pb-5 rounded-md sm:px-10">
        <div className="mb-8 text-center">
          <h1 className="my-1 text-lightWhite text-4xl font-bold">Log In</h1>
          <p className="text-sm dark:text-gray-600">Log into your account</p>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form noValidate="" onSubmit={handleLogin} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm">
                Enter Username
              </label>
              <input
                type="username"
                name="username"
                id="username"
                placeholder="jenkins"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Enter Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-purple hover:bg-darkPurple dark:text-gray-50"
              >
                Log In
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Don't have an account?,{" "}
              <Link
                rel="noopener noreferrer"
                to={"/signup"}
                className="hover:underline text-darkPurple"
              >
                {" "}
                Sign Up
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
