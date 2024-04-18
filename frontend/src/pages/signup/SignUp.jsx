import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignUp from "../../hooks/useSignUp";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // using signup function from useSignUp hook:
  const { loading, signup } = useSignUp();

  // handle gender checkbox
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); //does not refresh form after submit
    console.log(inputs);
    await signup(inputs);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center mx-auto bg-img">
      <div className="w-4/5 md:w-3/5 lg:w-1/4 p-8 rounded-box shadow-md glass bg-base bg-opacity-50">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-2">
          Sign Up
          <span className="text-teal-300 mx-2">Chirip</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-gray-800 labe-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-gray-800 labe-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-gray-800 labe-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-gray-800 labe-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password again"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
          <div>
            <button
              className="btn btn-accent btn-block btn-sm mt-3"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          <Link
            to={"/login"}
            className="text-sm link link-neutral hover:text-teal-400 mt-2 inline-block"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
