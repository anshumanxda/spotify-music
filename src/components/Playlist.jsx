import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import { GET_PLAYLISTS } from "../graphQL/queries";
import { setCurrentPlaylist } from "../redux/reducers/playlist";
import { setSongSearch } from "../redux/reducers/songs";
import { playlistSelector } from "../redux/selectors";

import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.png";

const Playlist = ({ closeDrawer }) => {
  const { error, loading, data } = useQuery(GET_PLAYLISTS);
  const { currentPlaylist } = useSelector(playlistSelector);
  const dispatch = useDispatch();

  const isMobile = window.innerWidth < 1024;

  const handlePlaylistChange = (e) => {
    const { playlist, playlistid } = e.currentTarget.dataset;
    dispatch(setCurrentPlaylist({ playlist, playlistid }));
    dispatch(setSongSearch(""));
    if (isMobile) closeDrawer()
  };

  if (error) return <>error</>;

  return (
    <div className=" flex flex-col justify-between lg:min-h-[90vh] min-h-[95vh] ">
      <div className="">
        <img className="w-[132px] h-[40px]" src={logo} alt="" />
        <div className="mt-[30px]">
          {data?.getPlaylists?.map(({ title, id }) => (
            <p
              key={id}
              className={`text-white lg:mt-4 mt-10 text-[20px] cursor-pointer ${currentPlaylist.playlist === title
                ? "opacity-100"
                : "opacity-40"
                }`}
              data-playlist={title}
              data-playlistid={id}
              onClick={handlePlaylistChange}
            >
              {title}
            </p>
          ))}
        </div>
      </div>

      <img className="w-12 h-12 rounded-full" src={avatar} alt="" />
    </div>
  );
};

export default Playlist;
