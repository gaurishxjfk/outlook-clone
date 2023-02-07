import React, { useState } from "react";
import { FiMenu, FiMail } from "react-icons/fi";
import {
  RiDeleteBinLine,
  RiArchiveLine,
  RiErrorWarningLine,
  RiFolderSharedLine,
  RiUbuntuLine,
} from "react-icons/ri";
import { BsReplyAll, BsReply, BsThreeDots } from "react-icons/bs";
const Header = ({ toggleFolderPanel, setToggleFolderPanel }) => {
  const [toggleMenuOptions, setToggleMenuOptions] = useState(false);
  return (
    <div className="text-slate-500 border w-[100%] mb-3 rounded p-2 px-4 flex justify-between items-center relative shadow-lg">
      <div className="w-[100%] lg:w-[90%] flex justify-between">
        <div className="flex  items-center ">
          <span
            role={"button"}
            onClick={() => setToggleFolderPanel(!toggleFolderPanel)}
          >
            <FiMenu />
          </span>
          <button className="flex ml-5 gap-1 items-center bg-[#0001ff] rounded text-white px-5 py-1">
            <span>
              <FiMail />
            </span>
            <p className="text-[12px]">New email</p>
          </button>
        </div>
        <div className=" hidden md:flex justify-evenly items-center ">
          <div className="flex gap-5 text-[18px] ">
            <span role={"button"} className="flex gap-1">
              <RiDeleteBinLine />{" "}
              <span className="text-slate-600 text-sm">Delete</span>
            </span>
            <span role={"button"} className="flex gap-1 text-green-800">
              <RiArchiveLine />
              <span className="text-slate-600 text-sm">Archive</span>
            </span>
            <span role={"button"} className="flex gap-1 text-red-800">
              <RiErrorWarningLine />
              <span className="text-slate-600 text-sm">Report</span>
            </span>
            <span role={"button"} className="flex gap-1 text-blue-800">
              <RiFolderSharedLine />
              <span className="text-slate-600 text-sm">Move</span>
            </span>
          </div>
          <div className="hidden lg:flex gap-5 text-[18px] pl-5">
            <span role={"button"} className="flex gap-1 text-purple-800">
              <BsReply />
              <span className="text-slate-600 text-sm">Reply</span>
            </span>
            <span role={"button"} className="flex gap-1 text-purple-800">
              <BsReplyAll />
              <span className="text-slate-600 text-sm">Reply all</span>
            </span>
            <span role={"button"} className="flex gap-1 text-[#0001ff]">
              <span className="flip-hor">
                <BsReply />
              </span>
              <span className="text-slate-600 text-sm">Forward</span>
            </span>
          </div>
        </div>
      </div>

      <div
        role={"button"}
        onClick={() => setToggleMenuOptions(!toggleMenuOptions)}
        className={`mr-2 hover:bg-slate-200 rounded py-1 px-1 ${
          toggleMenuOptions && "bg-slate-200"
        }`}
      >
        <BsThreeDots />
      </div>
      <div
        className={`${
          !toggleMenuOptions && "hidden"
        } absolute border w-[10em]  bg-white top-[-.5em] right-[3em] z-50 rounded shadow-xl	"`}
      >
        <div className="md:hidden border-b-[1px] border-slate-300 pl-4">
          <h6 className="font-bold text-slate-800 my-2">Move & Delete</h6>
          <span role={"button"} className="flex items-center gap-1 my-2">
            <RiDeleteBinLine />
            <span className="text-slate-700">Delete</span>
          </span>
          <span
            role={"button"}
            className="text-green-800 flex items-center gap-1  my-2"
          >
            <RiArchiveLine />
            <span className="text-slate-700">Archive</span>
          </span>
          <span
            role={"button"}
            className="text-red-800 flex items-center gap-1 my-2"
          >
            <RiErrorWarningLine />
            <span className="text-slate-700">Report</span>
          </span>
          <span
            role={"button"}
            className="text-blue-800 flex items-center gap-1 my-2"
          >
            <RiFolderSharedLine />
            <span className="text-slate-700">Move</span>
          </span>
        </div>
        <div className="lg:hidden  border-b-[1px] border-slate-300 pl-4">
          <h6 className="font-bold text-slate-800 my-2">Respond</h6>
          <span
            role={"button"}
            className="flex items-center gap-1 my-2 text-purple-800"
          >
            <BsReply />
            <span className="text-slate-700">Reply</span>
          </span>
          <span
            role={"button"}
            className="text-green-800 flex items-center gap-1  my-2 text-purple-800"
          >
            <BsReplyAll />
            <span className="text-slate-700">Reply all</span>
          </span>
          <span
            role={"button"}
            className="flex items-center gap-1 my-2 text-[#0001ff] "
          >
            <span className="flip-hor">
              <BsReply />
            </span>
            <span className="text-slate-700">Forward</span>
          </span>
        </div>
        <div className="border-b-[1px] border-slate-300 pl-4">
          <h6 className="font-bold text-slate-800 my-2">Find</h6>
          <span
            role={"button"}
            className="flex items-center gap-1 my-2 text-purple-800"
          >
            <RiUbuntuLine />
            <span className="text-slate-700">Discover</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
