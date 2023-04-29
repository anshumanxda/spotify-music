import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { GET_SONGS } from "../graphQL/queries";
import {
  setCurrentSong,
  setAllSong,
} from "../redux/reducers/songs";
import minutesToSeconds from "../utils/minutesToSeconds";
import { songsSelector } from "../redux/selectors";

import LoadingSkeleton from "./LoadingSkeleton";

const Songs = ({ playlistId }) => {
  const dispatch = useDispatch();
  const { currentSong, allSongs, search } = useSelector(songsSelector);
  const { error, loading, data } = useQuery(GET_SONGS, {
    variables: {
      playlistId: parseInt(playlistId),
    },
  });

  useEffect(() => {
    dispatch(setAllSong(data));
  }, [data]);

  const handleSetCurrentSong = (song) => {
    const songDetails = { ...song };
    dispatch(setCurrentSong(songDetails));

    setTimeout(() => {
      const audio = document.querySelector("audio");
      audio.currentTime = 0;
      audio.play();
    }, 10);
  };

  if (error) return <div>Something went wrong</div>;

  if (!allSongs?.length && search && !loading) {
    return (
      <div className=" flex flex-col justify-center items-center text-white mt-5">
        <p className="font-semibold text-lg break-all whitespace-pre-line text-center">Couldn't find "{search}"</p>
        <p className="text-sm opacity-60 mt-1 text-center">
          Try searching again using different keyword
        </p>
      </div>
    );
  }

  if (loading) return [1, 2, 3, 4, 5, 6].map((el) => <LoadingSkeleton />)

  return (
    <div className="max-h-[75vh] overflow-y-scroll mt-6 pb-32 lg:pb-0">
      {allSongs?.map((item) => (
        <motion.div
          animate={{
            opacity: 1,
            scale: 1,
          }}
          initial={{
            opacity: 0.5,
            scale: 0.96,
          }}
          key={item._id}
          className={`text-white mt-1 flex gap-10 justify-between items-center py-4 px-4 hover:backdrop-sepia hover:bg-white/40 cursor-pointer rounded-[8px] transition-all duration-500 ${currentSong._id === item._id ? "backdrop-sepia-0 bg-white/30" : ""
            }`}
          onClick={() => handleSetCurrentSong(item)}
        >
          <div className="flex items-center gap-4 ">
            <img
              className="w-[48px] h-[48px] rounded-full"
              src={item.photo}
              alt={item.title}
            />
            <div>
              <h4 className="lg:text-[18px] text-base  line-clamp-1">
                {item.title}
              </h4>
              <p className="opacity-60 lg:text-[14px] text-xs ">
                {item.artist}
              </p>
            </div>
          </div>
          <p>{minutesToSeconds(item.duration)}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Songs;
