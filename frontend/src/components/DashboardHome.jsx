import React, { useEffect } from "react";
import { getAllUsers, getAllSongs, getAllArtists, getAllAlbums } from "../api";
import { useStateValue } from "../context/StateProvider";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { bgColors } from "../utils/styles";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
    useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((users) => {
        console.log(`USER DATA : ${users.data}`);
        dispatch({
          type: "SET_ALL_USERS",
          allUsers: users.data,
        });
      });
    }
    if (!allSongs) {
      getAllSongs().then((songs) => {
        console.log(`SONG DATA : ${songs.data}`);
        dispatch({
          type: "SET_ALL_SONGS",
          allSongs: songs.data,
        });
      });
    }
    if (!allArtists) {
      getAllArtists().then((artists) => {
        console.log(`ARTIST DATA : ${artists.data}`);
        dispatch({
          type: "SET_ALL_ARTISTS",
          allArtists: artists.data,
        });
      });
    }
    if (!allAlbums) {
      getAllAlbums().then((albums) => {
        console.log(`ALBUM DATA : ${albums.data}`);
        dispatch({
          type: "SET_ALL_ALBUMS",
          allAlbums: albums.data,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      {/* prettier-ignore */}
      <DashboardCard icon={<FaUsers className="text-3xl text-textColor" />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<GiLoveSong className="text-3xl text-textColor" />} name={"Songs"} count={allSongs?.length > 0 ? allSongs?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor" />} name={"Artist"} count={allArtists?.length > 0 ? allArtists?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<GiMusicalNotes className="text-3xl text-textColor" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
    </div>
  );
};

export default DashboardHome;
