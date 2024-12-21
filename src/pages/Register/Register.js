import React, { useCallback, useState } from 'react'

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoading } from '../../store/features/common';
import { loginAPI, RegisterAPI } from '../../api/authentication';
import { saveToken } from '../../utils/jwt-helper';
import GoogleSignIn from '../../components/Buttons/GoogleSignIn';
import VerifyCode from './VerifyCode';

const Register = () => {
  const [values, setValues] = useState({
    email:'',
    firstName:'',
    lastName:'',
    password: '',
    phoneNumber:'',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
 
  const [enableVerify,setEnableVerify] =useState(false);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError('');
      dispatch(setLoading(true));
      RegisterAPI(values).then(res=>{
        if(res?.code === 200){
          setEnableVerify(true);
        }
      }).catch(err=>{
        setError("Invalid or Email already exits")
      }).finally(()=>{
        dispatch(setLoading(false));
      })
    },
    [dispatch,values] // Ensures the latest values are logged
  );

  const handleOnChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value // Updates the respective field dynamically
    }));
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-12 w-full">
      { !enableVerify && 
      <>
      <p className="text-3xl font-bold pb-4 pt-4">Sign Up</p>
      <GoogleSignIn />
      <p className="text-gray-500 items-center text-center w-full py-2">OR</p>

      <div className="pt-4">
        <form onSubmit={onSubmit} autoComplete='off'>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            onChange={handleOnChange}
            value={values.userName}
            placeholder="Email address"
            className="h-[48px] w-full border p-2 border-gray-400"
            required autoComplete='off'
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleOnChange}
            value={values.password}
            placeholder="Password"
            className="h-[48px] mt-8 w-full border p-2 border-gray-400"
            required
            autoComplete="new-password"
          />
          <Link
            to="/forgot-password" // Add appropriate route if needed
            className="text-right w-full float-right underline pt-2 text-gray-500 hover:text-black"
          >
            Forgot Password?
          </Link>
          <button className="border w-full rounded-lg h-[48px] mb-4 bg-black text-white mt-4 hover:opacity-80">
            Sign In
          </button>
        </form>
      </div>
      {error && <p className='text-lg text-red-700'>{error}</p>}
      <Link to={"/v1/login"} className='underline text-gray-500 hover:text-black'>You have an account?Sign In</Link>
      </>
       }
      {enableVerify &&<VerifyCode email={values?.email}/>}
    </div>
  );
}

export default Register
