import React, { useCallback, useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";

import searchIcon from "../assets/search.svg";
import { setSongSearch } from "../redux/reducers/songs";

import debounce from "../utils/debounce";
import { SEARCH_SONG } from "../graphQL/queries";
import { playlistSelector, songsSelector } from "../redux/selectors";
import { setAllSong } from "../redux/reducers/songs";

const Search = () => {
  const dispatch = useDispatch();
  const { currentPlaylist } = useSelector(playlistSelector);
  const { search } = useSelector(songsSelector);
  const ref = useRef()

  useEffect(() => {
    ref.current.focus()
  }, [])

  const [getSearchResult, { loading, data }] = useLazyQuery(SEARCH_SONG, {
    variables: {
      playlistId: parseInt(currentPlaylist?.playlistid),
      search: search,
    },
  });

  useEffect(() => {
    dispatch(setAllSong(data));
  }, [data]);

  const handleSearch = (e) => {
    dispatch(setSongSearch(e.target.value));
    getSearchResult();
  };
  const optimizedFn = useCallback(debounce(handleSearch), []);

  return (
    <div className="relative mt-[33px]">
      <input
        type="text"
        placeholder="Search Song, Artist"
        className="p-[10px] pr-12 rounded-[8px] w-full bg-[#482a2419] h-[48px] text-white text-[18px] !outline-none"
        onChange={optimizedFn}
        ref={ref}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleSearch(e)
          }
        }}
      />
      <img
        src={searchIcon}
        alt="search"
        className="absolute right-4 top-[12px] cursor-pointer"
      />
    </div>
  );
};

export default Search;
