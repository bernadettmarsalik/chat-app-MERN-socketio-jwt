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
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto bg-img w-[800px] h-[800px]">
      <div className="w-[400px] p-8 rounded-box shadow-md glass bg-white bg-opacity-50">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-2">
          Sign Up
          <span className="text-teal-500 mx-2">Chirip Chat</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base labe-text">Full Name</span>
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
              <span className="text-base labe-text">Username</span>
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
              <span className="text-base labe-text">Password</span>
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
              <span className="text-base labe-text">Confirm Password</span>
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
              className="btn btn-primary btn-block btn-sm mt-3"
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
            className="text-sm hover:underline hover:text-teal-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

// STARTER CODE
// import GenderCheckbox from "./GenderCheckbox";

// const SignUp = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
//         <h1 className="text-3xl font-semibold text-center text-gray-500">
//           Sign Up
//           <span className="text-teal-500 mx-2">ChatApp</span>
//         </h1>
//         <form>
//           <div>
//             <label className="label p-2">
//               <span className="text-base labe-text">Full Name</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter full name"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base labe-text">Username</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter username"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base labe-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base labe-text">Confirm Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter password again"
//               className="w-full input input-bordered h-10"
//             />
//           </div>
//           <GenderCheckbox />
//           <div>
//             <button className="btn btn-primary btn-block btn-sm mt-3">
//               Sign Up
//             </button>
//           </div>
//           <a
//             href="#"
//             className="text-sm hover:underline hover:text-teal-600 mt-2 inline-block"
//           >
//             {"Don't"} have an account?
//           </a>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
