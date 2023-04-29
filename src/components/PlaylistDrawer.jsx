import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { playlistSelector } from "../redux/selectors";
import closeIcon from "../assets/close.svg";

import Playlist from "./Playlist";

const PlaylistDrawer = ({ isOpen, setIsOpen }) => {
  const { currentPlaylist } = useSelector(playlistSelector);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <main
        className={`fixed w-[300px] overflow-hidden z-[99] bg-[#202f4a] inset-0 transform transition-all  duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <img
          className="mt-2 w-8 absolute right-5 top-4"
          src={closeIcon}
          alt=""
          onClick={handleClose}
        />

        <div className="ml-5 mt-5">
          <Playlist currentPlaylist={currentPlaylist} closeDrawer={handleClose} />
        </div>
      </main>
      <div
        className={`min-w-screen min-h-screen fixed z-[90] top-0 right-0 left-0 bottom-0 bg-black opacity-70  ${isOpen ? "translate-x-0 " : "-translate-x-full"
          }`}
        onClick={handleClose}
      ></div>
    </>
  );
};

export default PlaylistDrawer;
