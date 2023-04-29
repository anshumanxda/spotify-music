import { useSelector } from "react-redux";

import {
  playlistSelector,
  songsSelector,
} from "../redux/selectors";

import Playlist from "../components/Playlist";
import Title from "../components/Title";
import Search from "../components/Search";
import Songs from "../components/Songs";
import Player from "../components/Player";

const Home = () => {
  const { currentPlaylist } = useSelector(playlistSelector);
  const { currentSong } = useSelector(songsSelector);

  return (
    <div
      style={{
        backgroundImage: `url(${currentSong.photo})`,
      }}
      className="bg-no-repeat bg-cover bg-left-top bg-slate-50 "
    >
      <div className="p-4 lg:p-[32px] min-h-screen flex backdrop-blur-3xl backdrop-brightness-50 transition-all" >
        <div className="lg:w-[50%] flex gap-[50px] w-full">
          <div className="hidden lg:block min-w-[170px]">
            <Playlist currentPlaylist={currentPlaylist} />
          </div>

          <section className="lg:px-10 flex-1 ">
            <Title title={currentPlaylist.playlist} />
            <Search />
            <Songs playlistId={currentPlaylist.playlistid} />
          </section>
        </div>

        <div className="lg:w-[50%] flex justify-center items-center">
          {!!currentSong?.title && <Player songDetail={currentSong} />}
        </div>
      </div>

    </div>
  );
};

export default Home;
