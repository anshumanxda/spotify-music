import { motion } from "framer-motion";

import Controls from "./Controls";

const Player = ({ songDetail }) => {

  const isMobile = window.innerWidth < 1024;

  const animationVariants = {
    initial: {
      opacity: isMobile ? 1 : 0.5,
      x: isMobile ? 0 : -50,
    },
    animate: {
      opacity: 1,
      x: 0,
    }
  }

  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      key={songDetail?._id}
      className="text-white lg:w-[380px] 2xl:w-[60%] 2xl:max-w-[700px] mx-auto lg:static fixed bottom-0 left-0 max-w-screen w-full  bg-black opacity-90 p-5 lg:p-0 lg:bg-transparent"
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
        className="cover w-full aspect-square mt-8 hidden lg:block rounded-lg"
      />

      <Controls song={songDetail.url} />
    </motion.div>
  );
};

export default Player;
