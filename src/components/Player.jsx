import { motion } from "framer-motion";

import Controls from "./Controls";

const Player = ({ songDetail }) => {
  return (
    <motion.div
      animate={{
        opacity: 1,
        x: 0,
      }}
      initial={{
        opacity: 0.5,
        x: -50,
      }}
      key={songDetail?._id}
      className="text-white mt-[2.5rem] lg:w-[480px] mx-auto lg:static fixed bottom-0 left-0 max-w-screen w-full  bg-black opacity-90 p-5 lg:p-0 lg:bg-transparent"
    >
      <p className="lg:text-[32px] font-bold line-clamp-1 transition ease-in-out delay-150 ">
        {songDetail.title}
      </p>

      <p className="opacity-60 mt-1  transition ease-in-out delay-150">
        {songDetail.artist}
      </p>
      <img
        src={songDetail.photo}
        alt="cover"
        className="cover max-w-[480x] max-h-[480px] h-full w-full mt-8 hidden lg:block"
      />

      <Controls song={songDetail.url} />
    </motion.div>
  );
};

export default Player;
