import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from './../../provider/AuthProvider';
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Audio, Hourglass } from 'react-loader-spinner';

const Register = () => {
  const {setUser, userSignIn, googleSignIn, user, userCreate} = useContext(AuthContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit = data => {
    console.log(data)
    userCreate(data.email, data.password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      setUser(user)
      console.log(user);
      Swal.fire({
        position: "middle-middle",
        icon: "success",
        title: "register success",
        showConfirmButton: false,
        timer: 1500
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      // ..
    });
  };

  //google signin
  const handleGoogleSignIn = () =>{
    googleSignIn()
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      
      const user = result.user;
      console.log(user);
      setUser(user);
      Swal.fire({
        position: "middle-middle",
        icon: "success",
        title: "register success",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(()=>{
        navigate('/')
      },[2000])
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
  }
    return (
        <div className="bg-gray-50 font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full">
            {/* <a href="javascript:void(0)"><img
              src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-40 mb-8 mx-auto block' />
            </a> */}
  
            <div className="p-8 rounded-2xl bg-white shadow">
              <h2 className="text-gray-800 text-center text-2xl font-bold">Register</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">User Email</label>
                  <div className="relative flex items-center">
                    <input {...register('email',{required:true})} name="email" type="text" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter user name" />
                    {errors.email?.type == 'required' && <p role="alert" className="text-red-500 font-bold ">You must input email</p>}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                      <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
  
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input name="password" type="password" required {...register('password',{required:true, pattern:!/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/})}
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                  {errors.password?.type == 'required' && <p role="alert" className="text-red-500 font-bold ">You must input password</p>}
                  {errors.password?.type == 'pattern' && <p role="alert" className="text-red-500 font-bold ">Your password must be 8 character long and must to have a UpperCase letter</p>}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
  
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input  id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label for="remember-me" className="ml-3 block text-sm text-gray-800">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="jajvascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                      Forgot your password?
                    </a>
                  </div>
                </div>
  
                <div className="!mt-8">
                  <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    Register
                  </button>
                </div>
                <div className="!mt-8">
                  <button onClick={handleGoogleSignIn}  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                     <span className="flex justify-center items-center gap-3"> Continue with google <FaGoogle /></span>
                  </button>
                </div>
                <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <a href="javascript:void(0);" class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;