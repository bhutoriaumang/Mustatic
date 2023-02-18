import React, { useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { useStateValue } from "../context/StateProvider";
import { changeUserRole, deleteUser, getAllUsers } from "../api";
import { MdDelete } from "react-icons/md";

const DashboardUserCard = ({ data, index }) => {
  const createdAt = moment(data.createdAt).format("DD/MM/YYYY");
  const [{ user }, dispatch] = useStateValue();
  const [isUserRoleupdated, setIsUserRoleupdated] = useState(false);

  const updateUserRole = async (id, role) => {
    changeUserRole(id, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: "SET_ALL_USERS",
            allUsers: data.data,
          });
        });
        setIsUserRoleupdated(false);
      }
    });
  };

  const deleteUserData = async (id) => {
    deleteUser(id).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: "SET_ALL_USERS",
            allUsers: data.data,
          });
        });
      }
    });
  };

  return (
    <motion.div
      key={index}
      className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
    >
      {data._id !== user?.user._id && (
        <motion.div className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200">
          <MdDelete
            className="text-xl text-red-400 hover:text-red-500"
            onClick={() => deleteUserData(data._id)}
          />
        </motion.div>
      )}
      <div className="w-275 min-w-[160px] flex items-center justify-center">
        <img
          src={data.imageURL}
          alt=""
          className="w-10 h-10 object-cover rounded-md shadow-md min-w-[40px]"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.name}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email_verified ? "Yes" : "No"}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {createdAt}
      </p>
      <div className="text-base text-textColor w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor text-center">{data.role}</p>
        {data._id !== user?.user._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            onClick={() => setIsUserRoleupdated(true)}
            className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md"
          >
            {data.role === "admin" ? "Member" : "Admin"}
          </motion.p>
        )}
        {isUserRoleupdated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-10 top-6 right-4 p-4 flex items-center flex-col gap-4 bg-white shadow-xl rounded-md"
          >
            <p className="text-textColor text-sm font-semibold">
              Are you sure you want to change the user role to{" "}
              <span>{data.role === "admin" ? "Member" : "Admin"}</span>?
            </p>
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                onClick={() =>
                  updateUserRole(
                    data._id,
                    data.role === "admin" ? "member" : "admin"
                  )
                }
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
              >
                YES
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                onClick={() => setIsUserRoleupdated(false)}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md"
              >
                NO
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardUserCard;
