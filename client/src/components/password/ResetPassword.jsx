import React from 'react';
import axios from 'axios';

const ResetPassword = ({match}) => {
    const [newPassword, setNewPassword] = React.useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await axios.put(`http://localhost:3000/reset-password/${match.params.token}`, newPassword);
        console.log(response);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ResetPassword