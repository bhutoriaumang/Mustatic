export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_ALL_ALBUMS: "SET_ALL_ALBUMS",
  SET_FILTER_TERM: "SET_FILTER_TERM",
  SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
  SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
  SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
  SET_ALERT_TYPE: "SET_ALERT_TYPE",
  SET_IS_SONG_PLAYING: "SET_IS_SONG_PLAYING",
  SET_SONG_INDEX: "SET_SONG_INDEX",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };

    case actionTypes.SET_ALL_ARTISTS:
      return {
        ...state,
        allArtists: action.allArtists,
      };

    case actionTypes.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };

    case actionTypes.SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };
    case actionTypes.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };
    case actionTypes.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter,
      };
    case actionTypes.SET_ALBUM_FILTER:
      return {
        ...state,
        albumFilter: action.albumFilter,
      };
    case actionTypes.SET_LANGUAGE_FILTER:
      return {
        ...state,
        languageFilter: action.languageFilter,
      };
    case actionTypes.SET_ALERT_TYPE:
      return {
        ...state,
        alertType: action.alertType,
      };
    case actionTypes.SET_IS_SONG_PLAYING:
      return {
        ...state,
        isSongPlaying: action.isSongPlaying,
      };
    case actionTypes.SET_SONG_INDEX:
      return {
        ...state,
        songIndex: action.songIndex,
      };

    default:
      return state;
  }
};

export default reducer;

// SET_SEARCH_TERM: "SET_SEARCH_TERM",
// SET_FILTER_TERM: "SET_FILTER_TERM",
// SET_ARTISTS: "SET_ARTISTS",
// SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
// SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
// SET_ALL_USERS: "SET_ALL_USERS",
// SET_ALL_SONGS: "SET_ALL_SONGS",
// SET_ALL_ALBUMNS: "SET_ALL_ALBUMNS",
// SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
// SET_MINI_PLAYER: "SET_MINI_PLAYER",
