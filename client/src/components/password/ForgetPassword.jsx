import React from 'react';
import axios from 'axios';

const ForgetPassword = () => {
    const [forgotEmail, setForgotEmail] = React.useState('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await axios.post('', forgotEmail)
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-1 justify-center'>
            <input 
                type='email'
                placeholder='Enter Your Email'
                onChange={(e) => setForgotEmail(e.target.value)}
                value={forgotEmail}
                className='outline-none px-2 py-1 rounded-sm w-3/4'
            />
            <button className='w-auto mx-auto bg-slate-500'>Reset Password</button>
        </form>
    </div>
  )
}

export default ForgetPassword