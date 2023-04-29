import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentSong } from "../redux/reducers/songs";
import { songsSelector } from "../redux/selectors";

import control from "../assets/control-1.svg";
import next from "../assets/next.svg";
import previous from "../assets/previous.svg";
import pause from "../assets/pause.svg";
import play from "../assets/play.svg";
import volume from "../assets/volume.svg";

import "../styles/control.style.css";

const Controls = ({ song }) => {
  const dispatch = useDispatch();
  const { currentSong, allSongs } = useSelector(songsSelector);
  const [audio, setAudio] = useState({
    currentValue: "",
    maxValue: "",
    isPaused: false,
  });
  const ref = useRef();

  useEffect(() => {
    ref.current.play();
  }, [currentSong]);

  const toggleSong = () => {
    if (ref.current.paused) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  };

  const handlePrevious = () => {
    const currentSongIndex = allSongs.findIndex(
      (item) => currentSong._id === item._id
    );
    if (currentSongIndex !== 0) {
      const newCurrentSong = { ...allSongs?.[currentSongIndex - 1] };
      dispatch(setCurrentSong(newCurrentSong));
    }
  };

  const handleNext = () => {
    const currentSongIndex = allSongs.findIndex(
      (item) => currentSong._id === item._id
    );
    if (currentSongIndex < allSongs.length - 1) {
      const newCurrentSong = { ...allSongs?.[currentSongIndex + 1] };
      dispatch(setCurrentSong(newCurrentSong));
    } else {
      dispatch(setCurrentSong(allSongs[0]));
    }
  };

  const onTimeUpdate = (e) => {
    setAudio({
      currentValue: e.target.currentTime,
      maxValue: e.target.duration.toString(),
      isPaused: e.target.paused,
    });
  };

  return (
    <div>
      <audio src={song} ref={ref} onTimeUpdate={onTimeUpdate} />
      <input
        type="range"
        value={audio.currentValue || 0}
        min="1"
        max={audio.maxValue}
        className="lg:mt-6 w-full overflow-hidden cursor-pointer"
        onChange={(e) => {
          ref.current.currentTime = e.currentTarget.valueAsNumber;
          ref.current.play();
        }}
      />
      <div className="lg:mt-8 mt-2 flex lg:justify-between justify-center">
        <img src={control} alt="" className="cursor-pointer hidden lg:block" />

        <div className="flex gap-[36.8px]">
          <img
            className="cursor-pointer transition-all hover:scale-125 "
            src={previous}
            alt=""
            onClick={handlePrevious}
          />

          <img
            className="cursor-pointer transition-all hover:scale-125"
            src={audio.isPaused ? play : pause}
            alt=""
            onClick={toggleSong}
          />

          <img
            className="cursor-pointer transition-all hover:scale-125"
            src={next}
            alt=""
            onClick={handleNext}
          />
        </div>

        <img className="cursor-pointer hidden lg:block" src={volume} alt="" />
      </div>
    </div>
  );
};

export default Controls;
