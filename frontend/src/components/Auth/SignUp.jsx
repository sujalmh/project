import { useState } from "react";
import axiosInstance from "../../axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Make a POST request to the Flask register API
      const response = await axiosInstance.post("/api/register", {
        username,
        password,
      });

      if (response.status === 201) {
        // If user is registered successfully, navigate to login
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("User with that username already exists");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="flex border border-gray-700 shadow shadow-gray-400 text-lightWhite flex-col max-w-md min-w-[25rem] px-10 pt-7 pb-5 rounded-md sm:px-10">
        <div className="mb-8 text-center">
          <h1 className="my-1 text-lightWhite text-4xl font-bold">Sign Up</h1>
          <p className="text-sm dark:text-gray-600">
            Sign up to create your account
          </p>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form noValidate="" onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm">
                Create username
              </label>
              <input
                type="username"
                name="username"
                id="username"
                placeholder="jenkins"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                required
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Create Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                required
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Re-enter Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
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
                Sign up
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Have an account,{" "}
              <Link
                rel="noopener noreferrer"
                to={"/login"}
                className="hover:underline text-darkPurple"
              >
                {" "}
                Log in
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
