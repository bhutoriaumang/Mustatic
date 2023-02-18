import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";

const FilterButtons = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);
  const [{ filterTerm, artistFilter, albumFilter, languageFilter }, dispatch] =
    useStateValue();

  const filterValue =
    (flag === "Artist" && (artistFilter === null ? flag : artistFilter)) ||
    (flag === "Album" && (albumFilter === null ? flag : albumFilter)) ||
    (flag === "Language" &&
      (languageFilter === null ? flag : languageFilter)) ||
    (flag === "Category" && (filterTerm === null ? flag : filterTerm));

  const updateFilterParameter = (name) => {
    setFilterName(name);
    setFilterMenu(false);
    if (flag === "Artist") {
      dispatch({
        type: "SET_ARTIST_FILTER",
        artistFilter: name,
      });
    }
    if (flag === "Album") {
      dispatch({
        type: "SET_ALBUM_FILTER",
        albumFilter: name,
      });
    }
    if (flag === "Language") {
      dispatch({
        type: "SET_LANGUAGE_FILTER",
        languageFilter: name,
      });
    }
    if (flag === "Category") {
      dispatch({
        type: "SET_FILTER_TERM",
        filterTerm: name,
      });
    }
  };

  return (
    <div className="border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400">
      <p
        className="text-base flex gap-2 text-textColor tracking-wide items-center"
        onClick={() => setFilterMenu(!filterMenu)}
      >
        {!filterName && (
          <>
            {filterValue.length > 15
              ? `${filterValue.slice(0, 15)}...`
              : filterValue}
          </>
        )}
        {filterName && (
          <>
            {filterName.length > 15
              ? `${filterName.slice(0, 15)}...`
              : filterName}
          </>
        )}
        <IoChevronDown
          className={`text-base text-textColor duration-150 transition-all ease-in-out ${
            filterMenu ? "rotate-180" : "rotate-0"
          }`}
        />
      </p>
      {filterData && filterMenu && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0"
        >
          {filterData &&
            filterData.map((data, index) => (
              <div
                key={data.name}
                className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
                onClick={(e) => updateFilterParameter(data.name)}
              >
                {(flag === "Artist" || flag === "Album") && (
                  <img
                    src={data.imageURL}
                    className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                  />
                )}
                <p className="w-full">
                  {data.name.length > 15
                    ? `${data.name.slice(0, 15)}...`
                    : data.name}
                </p>
              </div>
            ))}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButtons;
