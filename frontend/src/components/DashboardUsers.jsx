import React, { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import moment from "moment";
import { DashboardUserCard } from "../components";
import { getAllUsers } from "../api";

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: "SET_ALL_USERS",
          allUsers: data.data,
        });
      });
    }
  });

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count :{allUsers?.length}
            </span>
          </p>
        </div>
        <div className="w-full min-w-[750px] flex items-center justify-between">
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Created</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</p>{" "}
        </div>
        {allUsers &&
          allUsers?.map((data, i) => (
            <DashboardUserCard data={data} index={i} />
          ))}
      </div>
    </div>
  );
};

// export const DashboardUserCard = ({ data, index }) => {
//   const createdAt = moment(data.createdAt).format("DD/MM/YYYY");

//   return (
//     <motion.div className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md">
//       <div className="w-275 min-w-[160px] flex items-center justify-center">
//         <img
//           src={data.imageURL}
//           alt=""
//           className="w-10 h-10 object-cover rounded-md shadow-md min-w-[40px]"
//           referrerPolicy="no-referrer"
//         />
//       </div>
//       <p className="text-base text-textColor w-275 min-w-[160px] text-center">
//         {data.name}
//       </p>
//       <p className="text-base text-textColor w-275 min-w-[160px] text-center">
//         {data.email}
//       </p>
//       <p className="text-base text-textColor w-275 min-w-[160px] text-center">
//         {data.email_verified ? "Yes" : "No"}
//       </p>
//       <p className="text-base text-textColor w-275 min-w-[160px] text-center">
//         {createdAt}
//       </p>
//       <p className="text-base text-textColor w-275 min-w-[160px] text-center">
//         {data.role}
//       </p>
//     </motion.div>
//   );
// };

export default DashboardUsers;
