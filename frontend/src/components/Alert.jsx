import React from "react";
import { BsEmojiWink } from "react-icons/bs";
import { motion } from "framer-motion";

const Alert = ({ type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 200 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 200 }}
      key={type}
      className={`fixed top-12 right-12 p-4 rounded-md backdrop-blur-md shadow-xl flex items-center justify-center ${
        type === "success" && "bg-green-500"
      } ${type === "danger" && "bg-red-500"}`}
    >
      {type === "success" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiWink className="text-3xl text-primary" />
          <p className="text-xl text-primary font-semibold">DATA SAVED</p>
        </div>
      )}
      {type === "danger" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiWink className="text-3xl text-primary" />
          <p className="text-xl text-primary font-semibold">
            Something went wrong, please try again later
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
