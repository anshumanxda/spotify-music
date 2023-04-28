import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentSong, toggleSongControl } from '../redux/reducers/songs';
import { songsSelector } from '../redux/selectors';

import control from "../assets/control-1.svg";
import next from "../assets/next.svg";
import previous from "../assets/previous.svg";
import pause from "../assets/pause.svg";
import play from "../assets/play.svg";
import volume from "../assets/volume.svg";

import '../styles/control.style.css'

const Controls = ({ song }) => {
  const dispatch = useDispatch()
  const { currentSong, allSongs, songPaused } = useSelector(songsSelector)
  const [audio, setAudio] = useState()
  const ref = useRef()

  useEffect(() => {
    ref.current.play()
  }, [currentSong])

  const toggleSong = () => {
    if (songPaused) {
      ref.current.play()
      dispatch(toggleSongControl(false))
    }
    else {
      ref.current.pause()
      dispatch(toggleSongControl(true))
    }
  }

  const handlePrevious = () => {
    const currentSongIndex = allSongs.findIndex((item) => currentSong._id === item._id);
    if (currentSongIndex !== 0) {
      const newCurrentSong = { ...allSongs?.[currentSongIndex - 1] };
      dispatch(setCurrentSong(newCurrentSong))
    }
  }

  const handleNext = () => {
    const currentSongIndex = allSongs.findIndex((item) => currentSong._id === item._id);
    if (currentSongIndex < allSongs.length - 1) {
      const newCurrentSong = { ...allSongs?.[currentSongIndex + 1] }
      dispatch(setCurrentSong(newCurrentSong))
    }
    else {
      dispatch(setCurrentSong(allSongs[0]))
    }
  }

  return (
    <div>
      <audio src={song} ref={ref} onTimeUpdate={setAudio} onEnded={e => {
        dispatch(toggleSongControl(true))
      }} />
      <input
        type="range"
        value={audio?.target.currentTime || 0}
        min="1"
        max={audio?.target.duration.toString()}
        className="lg:mt-6 w-full overflow-hidden cursor-pointer"
        onChange={e => {
          ref.current.currentTime = e.currentTarget.valueAsNumber
          ref.current.play()
          dispatch(toggleSongControl(false))
        }}
      />
      <div className="lg:mt-8 mt-2 flex lg:justify-between justify-center">
        <img src={control} alt="" className="cursor-pointer hidden lg:block" />

        <div className="flex gap-[36.8px]">
          <img className="cursor-pointer " src={previous} alt="" onClick={handlePrevious} />
          <img
            className="cursor-pointer"
            src={songPaused ? play : pause}
            alt=""
            onClick={toggleSong}
          />
          <img className="cursor-pointer" src={next} alt="" onClick={handleNext} />
        </div>

        <img className="cursor-pointer hidden lg:block" src={volume} alt="" />
      </div>
    </div>
  )
}

export default Controls