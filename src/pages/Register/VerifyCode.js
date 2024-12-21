
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/features/common';
import { verifyAPI } from '../../api/authentication';

const VerifyCode = ({email}) => {

const [values,setValues]=useState({
    userName:email,
    code:''
});

const [error, setError] = useState('');
const dispatch = useDispatch();
const [message,setMessage] = useState('');

const onSubmit = useCallback(
  (e) => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));
    verifyAPI(values).then(res=>{
      setMessage('Thank you! your email has been sucessfully verified.');
    }).catch(err=>{
      setError('The verification code u entered not correct')
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
    <div className='p-4'>
      {!message && 
      <>
      <p className='text-lg text-blue-900'>Registration sucessfull !! plese go and check u r email for VerifyCode!!</p>
    <p className='text-lg text-gray-600 pt-4 font-bold'>Please enter the 6-digit verification code sent to your email</p>
<form onSubmit={onSubmit} className='flex flex-col gap-4'>
  <input type='text' name='code' value={values?.code} maxLength={6} onChange={handleOnChange} placeholder='6digit code' className='h-[48px] border rounded border-gray-600 p-2 mt-4 required'/>
  <button type='submit' className='border w-[120px] rounded-lg h-[48px] bg-black text-white mb-4'>Verify</button>
</form>
{error && <p className='text-xl text-red-600'>{error}</p>}
</>
}
{message && <p className='text-lg'>{message}</p>}
    </div>
  )
}
export default VerifyCode