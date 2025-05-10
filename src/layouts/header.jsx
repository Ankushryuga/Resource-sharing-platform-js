import React from "react";
import { GoFileDirectory } from "react-icons/go";
import { MdOutlineStarBorder } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RxSlash } from "react-icons/rx";
import { AiFillLike } from "react-icons/ai";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import defaultConfig from "../config/config";
import { FaCircle } from "react-icons/fa";

const Header = () => (
  <header className="h-14 bg-white px-4 sm:px-6 shadow-sm flex items-center justify-between">
    {/* Left section: Navigation path */}
    <div className="flex items-center flex-1 min-w-0 overflow-x-auto space-x-2 text-sm text-gray-800 font-medium hide-scrollbar bg-transparent">
      {/* Dots and slash */}
      <div className="flex items-center text-gray-500 space-x-1 shrink-0">
        <BiDotsHorizontalRounded className="text-lg" />
        <RxSlash className="text-xs" />
      </div>

      {/* Folder path */}
      <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200 cursor-pointer shrink-0">
        <GoFileDirectory className="text-base" />
        <span>Tasks</span>
      </div>

      <RxSlash className="text-xs text-gray-400 shrink-0" />

      <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200 cursor-pointer shrink-0">
        <GoFileDirectory className="text-base" />
        <span>Day-1-Tasks</span>
      </div>

      {/* Star Icon */}
      <MdOutlineStarBorder className="text-xl text-gray-600 cursor-pointer hover:text-blue-500 transition-colors duration-200 shrink-0" />

      {/* Priority Icons */}
      <div className="flex items-center space-x-4 pl-50 shrink-0">
        {defaultConfig.headerTaskPriorityInformations.map((item, index) => (
          <span
            key={index}
            className="flex items-center space-x-1 text-xs group cursor-pointer transition-transform hover:scale-105"
            title={item.name}
          >
            <FaCircle
              style={{ color: `#${item.colorCode}` }}
              className="text-sm transition-colors duration-300"
            />
            <span className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
              {item.name}
            </span>
          </span>
        ))}
      </div>
    </div>

    {/* Right section: Actions */}
    <div className="flex items-center space-x-5 shrink-0">
      <IconWrapper>
        <AiFillLike />
      </IconWrapper>
      <IconWrapper>
        <BsFillPlusSquareFill />
      </IconWrapper>
      <IconWrapper>
        <IoSearchSharp />
      </IconWrapper>
    </div>
  </header>
);

// Reusable icon wrapper
const IconWrapper = ({ children }) => (
  <span className="text-xl text-gray-600 cursor-pointer hover:text-blue-500 transform hover:scale-110 transition-all duration-200 ease-in-out">
    {children}
  </span>
);

export default Header;
