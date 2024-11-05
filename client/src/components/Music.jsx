import React, { useEffect, useRef } from 'react'
import music1 from '../assets/music1.jpg'
import { RiPlayLargeFill } from "react-icons/ri";
import { FaPause } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";
import { useMusic } from '../hooks/useMusic';
function Music() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isFav, setIsFav] = React.useState(false)

  const audioRef = useRef(new Audio("/o-maahi.mp3"))

  const HandleClick = () => {
    setIsPlaying(prev => !prev)
   }
   
   useEffect(()=>{
      const audio = audioRef.current
      isPlaying ? audio.play() : audio.pause();
      return () => {audio.pause()}
    }, 
    [isPlaying])
  

  return (
    <div className='music-compo'>
      <img src={music1} alt="song-wallpaper" className='music-img' />
      <div className='song-info'>
        <div className="song-name">Shree Ganesha Deva</div>
        <div className="artist-name">Artist-Name</div>
      </div>
      <button className='fav-music' onClick={() => { setIsFav(prev => !prev) }}>
        {isFav ? <GoHeartFill /> : <FiHeart />}
      </button>
      <button className='music-btn' onClick={HandleClick}>
        {isPlaying ? <FaPause /> : <RiPlayLargeFill />}
      </button>
    </div>
  )
}

export const Music1 = () => {
  const aud = useMusic()
  console.log(aud);
  
  return (
    <audio controls>
      <source src="./heart.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
    </audio>
  )
}

export default Music