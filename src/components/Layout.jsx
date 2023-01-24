import React, { useState } from "react";
import { useSelector } from "react-redux";
import EmailBody from "./EmailBody";
import EmailList from "./EmailList";

const Layout = () => {
  const [activeFilter, setActiveFilter] = useState("");

  const {
    emailData: { selectedEmail },
  } = useSelector((state) => state);

  return (
    <div className="p-5 ">
      <div className="flex w-full gap-4 pl-5 font-bold text-gray-700 items-center mb-3">
        <span>Filter By:</span>
        {["Unread", "Read", "Favorites"].map((i) => (
          <a
            key={i}
            className={`p-1 px-3 cursor-pointer ${
              activeFilter === i && "bg-gray-300 rounded-full text-gray-600"
            } ease-in-out duration-300 hover:bg-gray-300 hover:rounded-full hover:text-gray-600`}
            onClick={() => setActiveFilter(i)}
          >
            {i}
          </a>
        ))}
      </div>
      <div className="flex">
        <div
          className={`hidden md:block ${
            selectedEmail?.id ? "w-[45%]" : "w-full"
          }`}
        >
          <EmailList />
        </div>
        {selectedEmail?.id && (
          <div className={`w-[100%]`}>
            <EmailBody />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
