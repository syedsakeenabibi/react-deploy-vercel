import React, { useCallback, useState } from 'react';
import GoogleSignIn from '../../components/Buttons/GoogleSignIn';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import {loginAPI} from '../../api/authentication';
import { saveToken } from '../../utils/jwt-helper';

const Login = () => {
  const [values, setValues] = useState({
    userName: '',
    password: ''
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError('');
      dispatch(setLoading(true));
      loginAPI(values).then(res=>{
        if(res?.token){
          saveToken(res?.token);
          navigate('/')
        }
        else{
          setError("Something went wrong!")
        }
      }).catch(err=>{
        //To-do check response status
        setError("Invalid Credentials");
      }).finally(()=>{
        dispatch(setLoading(false));
      });
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
      <p className="text-3xl font-bold pb-4 pt-4">Sign In</p>
      <GoogleSignIn />
      <p className="text-gray-500 items-center text-center w-full py-2">OR</p>

      <div className="pt-4">
        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="userName"
            onChange={handleOnChange}
            value={values.userName}
            placeholder="Email address"
            className="h-[48px] w-full border p-2 border-gray-400"
            required
          />
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
      <Link to={"/v1/register"} className='underline text-gray-500 hover:text-black'>Dont't have an account? Sign up</Link>
    </div>
  );
};

export default Login;
