import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { token } from '../constant.js'
import { BiLoaderCircle } from "react-icons/bi";

const Github = () => {
    const [profileData, setProfileData] = useState(null)
    const [loader, setLoader]= useState(true)
    // console.log(profileData);
    
    useEffect(()=>{
        (async()=>{
            const data = await axios.get('https://api.github.com/users/mansunkasyap', { headers: { Authorization: `token ${token}`}})
            setProfileData(data.data)
            setLoader(false)
            return ()=>{console.log("smwsdwdmnwd");
            }
        })()
    }, [])

    if(loader){
        return (
            <div>
                <BiLoaderCircle   className="loader" />
            </div>
        )
    }
  return (
    <div className="git-page">
        <div>
            <img src={profileData.avatar_url} alt=""  className='rounded-full'/>
        </div>
    </div>
  )
}

export default Github