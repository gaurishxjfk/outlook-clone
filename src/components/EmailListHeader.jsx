import React, { useEffect, useState } from "react";
import { IoIosCheckmarkCircleOutline, IoMdFunnel } from "react-icons/io";
import {
  MdOutlineMarkEmailUnread,
  MdOutlineMarkEmailRead,
  MdOutlinedFlag,
  MdOutlineEmail,
  MdDone,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredEmailsList,
  setAllEmailsSelected,
} from "../features/emailSlice";

const icons = {
  All: <MdOutlineEmail />,
  Flagged: <MdOutlinedFlag />,
  Unread: <MdOutlineMarkEmailUnread />,
  Read: <MdOutlineMarkEmailRead />,
};
const EmailListHeader = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const {
    emailData: { emailsList, selectAllEmail },
  } = useSelector((state) => state);

  useEffect(() => {
    if (emailsList.length > 0) {
      dispatch(setFilteredEmailsList(activeFilter));
    }
  }, [activeFilter, emailsList]);

  const handleToggle = () => {
    if (activeFilter !== "All" && !toggle) {
      setActiveFilter("All");
      setToggle(true);
    } else {
      setToggle(!toggle);
    }
  };

  return (
    <div className="text-slate-500 bg-white w-[100%] flex items-center justify-between py-2 text-[20px] border border-b-slate-300 rounded-[5px]">
      <div className="w-[8%] flex justify-center">
        <span
          onClick={() => dispatch(setAllEmailsSelected())}
          className={`rounded-full cursor-pointer ${
            selectAllEmail
              ? "bg-[#3468fa] text-white"
              : "hover:bg-[#3468fa]  hover:text-white"
          }`}
        >
          <IoIosCheckmarkCircleOutline />
        </span>
      </div>
      <div className="relative transition-all	ease-in-out delay-8500 mr-4">
        <button
          onClick={() => handleToggle()}
          className={`flex gap-2 items-center cursor-pointer hover:bg-slate-200 p-1 px-3 rounded-[3px] ${
            activeFilter !== "All" && "bg-slate-200"
          }`}
        >
          <span className="text-[14px]">
            {activeFilter !== "All" ? icons[activeFilter] : <IoMdFunnel />}
          </span>
          <p className="text-[12px]">
            {activeFilter !== "All" ? activeFilter : "Filter"}{" "}
          </p>
        </button>
        {toggle && (
          <div
            className={`absolute bg-white w-[8em] min-h-[7em] transition-all ease-in-out top-[1.6em] border  rounded-[5px] shadow-lg flex flex-col z-50	`}
          >
            {["All", "Unread", "Read", "Flagged"].map((i) => (
              <button
                key={i}
                onClick={() => setActiveFilter(i)}
                className={`group text-md text-slate-500 flex items-center gap-6 p-2 hover:bg-slate-100 `}
              >
                <span
                  className={`text-[14px] ${
                    activeFilter !== i ? "invisible" : ""
                  }`}
                >
                  <MdDone />
                </span>
                <div className=" flex items-center gap-3 ">
                  <span className="group-hover:text-[#0001ff] text-[16px]">
                    {icons[i]}
                  </span>
                  <span className="text-[12px] text-slate-500">{i}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailListHeader;
