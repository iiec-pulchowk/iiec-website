import React from "react";

export const DashboardCard = ({ itemName }) => {
  return (
    <div className="m-4 w-60 h-40 bg-white border border-blue-500 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-center items-center cursor-pointer hover:bg-blue-100">
      <h2 className="text-xl font-semibold capitalize text-blue-600 text-center">
        {itemName}
      </h2>
    </div>
  );
};
