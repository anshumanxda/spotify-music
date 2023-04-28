import { gql } from "@apollo/client";

export const GET_PLAYLISTS = gql`
  query GetPlaylists {
    getPlaylists {
      id
      title
    }
  }
`;

export const GET_SONGS = gql`
  query GetSongs($playlistId: Int!) {
    getSongs(playlistId: $playlistId) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;

export const SEARCH_SONG = gql`
  query GetSongs($search: String, $playlistId: Int!) {
    getSongs(search: $search, playlistId: $playlistId) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;
