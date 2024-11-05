import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import '../index.css'
import Modal from '../notifications/Modal.jsx'
const SignUp = ({setSignedUp}) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        avatar: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            avatar: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Use FormData to handle file uploads
        const form = new FormData();
        form.append('userName', formData.userName);
        form.append('email', formData.email);
        form.append('password', formData.password);
        if (formData.avatar) {
            form.append('avatar', formData.avatar);
        }

        try {
            // Send the form data to  the backend
            const response = await axios.post('http://localhost:3300/users/register', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('User signed up successfully', response.data);
            localStorage.setItem('refresh-token', response.data.refreshToken);
            console.log(localStorage.getItem('refresh-token'));
            
            if(response.status == 201){
                navigate('/login')
                alert(response.data.message)
                // setSignedUp(prev => !prev)
            }
        } catch (error) {
            alert("Error While SignUp 😔")
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className='signup-compo'>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userName">Username:</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="conf-password">Confirm Password:</label>
                        <input
                            type="password"
                            id="conf-password"
                            name="conf-password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatar">Avatar (optional):</label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleFileChange}
                        />
                    </div>
                    <Modal />
                    <button type="submit">Sign Up</button>

                    <div className='text-center py-1 text-base'>
                        <span>Already have an account ? </span><Link to="/users/login" className='bg-red-400 rounded p-0.5'>Login</Link>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default SignUp;
