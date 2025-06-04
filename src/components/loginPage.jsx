// import { useState } from "react";
// import LoginHeaderComponent from "./LoginHeaderComponent";
// import { TbBusinessplan } from "react-icons/tb";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// const LoginPage = () => {
//   const [usernameEmailInput, setUsernameEmailInput] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loginWithPassword, setLoginWithPassword] = useState(false);
//   const [loginWithPasswordInput, setLoginWithPasswordInput] = useState("");
//   const [seePasswordClicked, setSeePasswordClicked] = useState(false);

//   return (
//     <div>
//       <LoginHeaderComponent />
//       <div>
//         <h3 className="text-md text-black">
//           Log in to manage your workstreams, projects and teams
//         </h3>
//         <div>
//           <form>
//             <div>
//               <input
//                 type="text"
//                 value={usernameEmailInput}
//                 onChange={(e) => setUsernameEmailInput(e.target.value)}
//                 placeholder="Email or username"
//               />
//               {loginWithPassword && (
//                 <div>
//                   <input
//                     type={seePasswordClicked ? "text" : "password"}
//                     value={loginWithPasswordInput}
//                     onChange={(e) => setLoginWithPasswordInput(e.target.value)}
//                   />
//                   {seePasswordClicked ? (
//                     <FaRegEyeSlash
//                       onClick={() => setSeePasswordClicked((prev) => !prev)}
//                     />
//                   ) : (
//                     <FaRegEye
//                       onClick={() => setSeePasswordClicked((prev) => !prev)}
//                     />
//                   )}
//                 </div>
//               )}
//               <button
//                 className=""
//                 onClick={() => setLoginWithPassword((prev) => !prev)}
//               ></button>
//             </div>
//             <div className="flex">
//               <input
//                 type="checkbox"
//                 onClick={() => setRememberMe((prev) => !prev)}
//               />
//               <label>Remember me</label>
//               <span onClick={() => setLoginWithPassword((prev) => !prev)}>
//                 Login with password
//               </span>
//             </div>
//           </form>
//           <div>
//             <label>or log in with </label>
//             <div>
//               <button>Google</button>
//               <button>Microsoft</button>
//             </div>
//           </div>
//         </div>
//         <div>
//           <h4>Use Workstream to all your groups related activity</h4>
//           <div className="flex">
//             <TbBusinessplan />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

//
import { useState } from "react";
import LoginHeaderComponent from "./LoginHeaderComponent";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Lock, TimerIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import configurations from "../config/config";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const baseURL = configurations.baseURL;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [usernameEmailInput, setUsernameEmailInput] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginWithPassword, setLoginWithPassword] = useState(false);
  const [loginWithPasswordInput, setLoginWithPasswordInput] = useState("");
  const [seePasswordClicked, setSeePasswordClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); //prevent page reloading..
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userrnameOrEmail: usernameEmailInput,
          //   password: loginWithPasswordInput,
        }),
      });

      if (!response.ok) {
        console.log("Login Failed");
        return;
      }
      const responseJson = response.json();
      console.log(responseJson);
      login();
      navigate("/dashboard");
    } catch (error) {
      console.log("Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center">
      <LoginHeaderComponent />
      <h3 className="text-2xl font-semibold text-gray-800 pl-50 pt-30 px-4 w-full">
        Log in to manage your workstreams and your teams enjoy using for free
      </h3>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 pb-50 pl-50 pr-50 mt-10 bg-white rounded-lg">
        {/* Left Side: Login Form */}
        <div className="space-y-6 h-full flex flex-col justify-center">
          <form
            className="space-y-4 w-full"
            autoComplete="off"
            spellCheck="false"
            onSubmit={handleLogin}
          >
            <input
              autoComplete="off"
              type="text"
              name="no-autofill-user"
              className="w-full px-6 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
              value={usernameEmailInput}
              onChange={(e) => setUsernameEmailInput(e.target.value)}
              placeholder="Email or username"
            />

            {/* ─────────────── Always‐there wrapper ─────────────── */}
            <div
              className={`relative overflow-hidden transition-all duration-300 ${
                loginWithPassword ? "h-14 opacity-100" : "h-0 opacity-0"
              }`}
            >
              {/* 
                - We keep the wrapper at fixed height = h-14 (≈56px).
                - Inside, we toggle visibility of the actual <input> & icon.
              */}
              <input
                autoComplete="new-password"
                name="new-password"
                readOnly
                type={seePasswordClicked ? "text" : "password"}
                className={`
                  w-full px-6 py-3 text-lg border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-gray-700
                  ${loginWithPassword ? "visible" : "invisible"}
                  `}
                onFocus={(e) => e.target.removeAttribute("readOnly")}
                value={loginWithPasswordInput}
                onChange={(e) => setLoginWithPasswordInput(e.target.value)}
                placeholder="Password"
              />
              {/* Only render the “eye” icon when loginWithPassword === true */}
              {loginWithPassword && (
                <div
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setSeePasswordClicked((prev) => !prev)}
                >
                  {seePasswordClicked ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-700">
              <label className="flex items-center space-x-2">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((prev) => !prev)}
                />
                <span className="text-md text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setLoginWithPassword((prev) => !prev)}
                className="text-blue-600 hover:underline"
              >
                {loginWithPassword ? "Login with OTP" : "Login with password"}
              </button>
            </div>

            <button
              type="submit"
              style={{ backgroundColor: "#0b1b36" }}
              className="w-full text-white text-lg py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
              {/* Continue */}
            </button>
          </form>

          <div className="text-center text-gray-500 text-sm">
            or log in with
          </div>

          <div className="flex space-x-4 justify-center">
            <div className="w-full items-center px-5 py-2 border border-gray-300 shadow-sm rounded-md hover:bg-gray-100 transition">
              <div>
                <FcGoogle />
                Google
              </div>
            </div>
            <div className="w-full items-center px-5 py-2 border border-gray-300 shadow-sm rounded-md hover:bg-gray-100 transition">
              Microsoft
            </div>
          </div>
        </div>

        {/* Right Side: Info / Branding */}
        <div className="flex flex-col items-center justify-center text-center p-20 rounded-md border border-gray-200 shadow-sm h-70">
          <div className="w-full space-y-4">
            <h5 className="text-md text-gray-700 font-semibold mb-2 text-left pb-5">
              Manage your project easily:
            </h5>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <TimerIcon className="text-gray-500 w-5 h-5" />
              <span>Real time collaboration</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Lock className="text-gray-500 w-5 h-5" />
              <span>Permission control</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
