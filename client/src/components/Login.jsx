import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { SearchContext } from '../music-store/SearchContext.js';

const Login = () => {
    const navigate = useNavigate()

    const { setIsLoggedIn } = React.useContext(SearchContext);
    const { setAvatar } = React.useContext(SearchContext);
    const [userData, setUserData] = useState({
        userName: '',
        password: ''
    })


    const handleChange = (e) => {
        const { name } = e.target
        setUserData(
            {
                ...userData,
                [name]: e.target.value
            }
        )
    }

    const handleSubmit = async (e) => {
        console.log("Called");
        e.preventDefault()
        const resp = await axios.post('http://localhost:3300/users/login', userData);
        if (resp.status == 200) {
            localStorage.setItem('token', resp.data.refreshToken);
            setAvatar(resp.data.user.avatar)
            setIsLoggedIn(true)
            console.log("Token", resp.data.refreshToken);
            
            alert(resp.data.message)
            navigate('/github')
        }

    }
    return (
        <div className='login-compo flex flex-col justify-center w-1/3 h-1/2 mx-auto my-16 shadow shadow-slate-600 rounded'>
            <form className='flex flex-col space-y-5 align-middle mx-auto my-auto'
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    placeholder='Username'
                    name='userName'
                    value={userData.userName}
                    className='rounded shadow focus:shadow-slate-600 py-1 outline-none w-auto px-2'
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    value={userData.password}
                    className='rounded shadow focus:shadow-slate-600 py-1 outline-none w-auto px-2'
                    onChange={handleChange}
                />
                <button>Login</button>


                <Link to="/login/forget">
                    <p className='text-blue-600 underline font-semibold'>
                        Forget Password?Click here
                    </p>
                </Link>

            </form>
            <Outlet />


        </div>
    )
}

export default Login