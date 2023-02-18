import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getAllSongs } from "../api";
import { IoClose, IoMusicalNote } from "react-icons/io5";

const MusicPlayer = () => {
  const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const nextTrack = () => {
    if (songIndex < allSongs.length - 1) {
      dispatch({
        type: "SET_SONG_INDEX",
        songIndex: songIndex + 1,
      });
    } else {
      dispatch({
        type: "SET_SONG_INDEX",
        songIndex: 0,
      });
    }
  };

  const prevTrack = () => {
    if (songIndex > 0) {
      dispatch({
        type: "SET_SONG_INDEX",
        songIndex: songIndex - 1,
      });
    } else {
      dispatch({
        type: "SET_SONG_INDEX",
        songIndex: allSongs.length - 1,
      });
    }
  };

  const closePlayer = () => {
    dispatch({
      type: "SET_IS_SONG_PLAYING",
      isSongPlaying: false,
    });
  };

  return (
    <div className="w-full flex items-center gap-3">
      <div className="w-full flex items-center gap-3 p-4 relative">
        <img
          src={allSongs[songIndex].imageURL}
          className="w-40 h-20 object-cover rounded-md"
        />
        <div className="flex items-start flex-col">
          <p className="text-xl text-headingColor font-semibold">
            {allSongs[songIndex]?.name.slice(0, 20)}{" "}
            <span className="text-base">{allSongs[songIndex]?.album}</span>
          </p>
          <p className="text-textColor">
            {allSongs[songIndex]?.artist}{" "}
            <span className="text-textColor text-sm font-semibold">
              {`(${allSongs[songIndex]?.category})`}
            </span>
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
          >
            <RiPlayListFill className="text-textColor hover:text-headingColor text-lg" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={allSongs[songIndex]?.songURL}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={prevTrack}
          />
        </div>
        {isPlaylistOpen && <PlaylistCard />}
        <IoClose onClick={closePlayer} />
      </div>
    </div>
  );
};

export default MusicPlayer;

export const PlaylistCard = ({ data, index }) => {
  const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();

  const setSongPlaying = (si) => {
    if (!isSongPlaying) {
      dispatch({
        type: "SET_IS_SONG_PLAYING",
        isSongPlaying: true,
      });
    }
    if (songIndex !== si) {
      dispatch({
        type: "SET_SONG_INDEX",
        songIndex: si,
      });
    }
  };

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: "SET_ALL_SONGS",
          allSongs: data.data,
        });
      });
    }
  }, []);
  return (
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
      {allSongs.length > 0 &&
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
            onClick={() => setSongPlaying(index)}
            key={index}
          >
            <IoMusicalNote className="text-2xl text-textColor group-hover:text-headingColor cursor-pointer" />
            <div className="flex items-start flex-col">
              <p className="text-lg Otext-headingColor font-semibold">
                {music?.name.slice(0, 20)}{" "}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-textColor">
                {music?.artist}{" "}
                <span className="text-textColor text-sm font-semibold">
                  {`(${music?.category})`}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
    </div>
  );
};
