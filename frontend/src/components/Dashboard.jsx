import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Header from "./Header";
import {
  DashboardHome,
  DashboardAlbums,
  DashboardArtists,
  DashboardSongs,
  DashboardUsers,
  DashboardNewSong,
  Alert,
} from "../components";
import { IoHome } from "react-icons/io5";
import { isActiveStyle, isNonActiveStyle } from "../utils/styles";
import { useStateValue } from "../context/StateProvider";

const Dashboard = () => {
  const [{ alertType }, dispatch] = useStateValue();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <div className="w-[60%] my-2 p-4 bg-primary flex items-center justify-evenly">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNonActiveStyle
          }
        >
          <IoHome className="text-exl text-textColor" />
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNonActiveStyle
          }
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/songs"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNonActiveStyle
          }
        >
          Songs
        </NavLink>
        <NavLink
          to={"/dashboard/artists"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNonActiveStyle
          }
        >
          Artists
        </NavLink>
        <NavLink
          to={"/dashboard/albums"}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNonActiveStyle
          }
        >
          Albums
        </NavLink>
      </div>
      <div className="my-4 w-full p-4">
        <Routes>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/users" element={<DashboardUsers />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/albums" element={<DashboardAlbums />} />
          <Route path="/artists" element={<DashboardArtists />} />
          <Route path="/newSong" element={<DashboardNewSong />} />
        </Routes>
      </div>
      {alertType && <Alert type={alertType} />}
    </div>
  );
};

export default Dashboard;
