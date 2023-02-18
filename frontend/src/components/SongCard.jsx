import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import {
  deleteAlbum,
  deleteArtist,
  deleteSong,
  getAllAlbums,
  getAllArtists,
  getAllSongs,
} from "../api";
import { useStateValue } from "../context/StateProvider";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

const SongCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [{ alertType, isSongPlaying, songIndex }, dispatch] = useStateValue();

  const DeleteObject = () => {
    console.log("HI", type);
    if (type === "album") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});
      deleteAlbum(data._id).then((data) => {
        if (data) {
          dispatch({
            type: "SET_ALERT_TYPE",
            alertType: "success",
          });
          setTimeout(() => {
            dispatch({
              type: "SET_ALERT_TYPE",
              alertType: null,
            });
          }, 3000);
        } else {
          dispatch({
            type: "SET_ALERT_TYPE",
            alertType: "danger",
          });
          setTimeout(() => {
            dispatch({
              type: "SET_ALERT_TYPE",
              alertType: null,
            });
          }, 3000);
        }
        getAllAlbums().then((data) => {
          dispatch({
            type: "SET_ALL_ALBUMS",
            allAlbums: data.data,
          });
        });
      });
    } else if (type === "artist") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});
      deleteArtist(data._id).then((data) => {
        if (data) {
          dispatch({
            type: "SET_ALERT_TYPE",
            alertType: "success",
          });
          setTimeout(() => {
            dispatch({
              type: "SET_ALERT_TYPE",
              alertType: null,
            });
          }, 3000);
        } else {
          dispatch({
            type: "SET_ALERT_TYPE",
            alertType: "danger",
          });
          setTimeout(() => {
            dispatch({
              type: "SET_ALERT_TYPE",
              alertType: null,
            });
          }, 3000);
        }
        getAllArtists().then((data) => {
          dispatch({
            type: "SET_ALL_ARTISTS",
            allArtists: data.data,
          });
        });
      });
    } else if (type === "song") {
      const deleteRef = ref(storage, data.imageURL);
      deleteObject(deleteRef).then(() => {});
      deleteSong(data._id).then((data) => {
        if (data) {
          dispatch({
            type: "SET_ALERT_TYPE",
            alertType: "success",
          });
          setTimeout(() => {
            dispatch({
              type: "SET_ALERT_TYPE",
              alertType: null,
            });
          }, 3000);
        } else {
          dispatch({
            type: "SET_ALERT_TYPE",
            alertType: "danger",
          });
          setTimeout(() => {
            dispatch({
              type: "SET_ALERT_TYPE",
              alertType: null,
            });
          }, 3000);
        }
        getAllSongs().then((data) => {
          dispatch({
            type: "SET_ALL_SONGS",
            allSongs: data.data,
          });
        });
      });
    }
  };

  const addToContext = () => {
    console.log("HI");
    if (!isSongPlaying) {
      dispatch({
        type: "SET_IS_SONG_PLAYING",
        isSongPlaying: true,
      });
    }
    if (songIndex !== index) {
      dispatch({
        type: "SET_SONG_INDEX",
        songIndex: index,
      });
    }
  };

  return (
    <motion.div
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
      onClick={type === "song" && addToContext}
    >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          src={data.imageURL}
          referrerPolicy="no-referrer"
          className="w-full h-full rounded-lg object-cover"
          whileHover={{ scale: 1.05 }}
        />
      </div>
      <p className="text-base text-center text-headingColor font-semibold my-1">
        {data.name > 25 ? data.name.slice(0, 25) + "..." : data.name}
        {data.artist && (
          <span className="block text-sm my-1 text-gray-400">
            {data.artist > 25 ? data.artist.slice(0, 25) + "..." : data.artist}
          </span>
        )}
      </p>
      <div className="w-full bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i whileTap={{ scale: 0.75 }} onClick={() => setIsDelete(true)}>
          <IoTrash className="text-base text-red-400 drop-shadow-md hover:text-red-600" />
        </motion.i>
      </div>
      {isDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center bg-cardOverlay px-4 py-2"
        >
          <p className="text-lg text-headingColor font-semibold text-center">
            Are you sure you want to delete it?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              className="px-2 py-1 text-sm uppercase hover:bg-green-500 bg-green-300 rounded-md cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={DeleteObject}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm uppercase hover:bg-red-500 bg-red-300 rounded-md cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => setIsDelete(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
