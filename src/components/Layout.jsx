import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmailsListAsync,
  setFilteredEmailsList,
} from "../features/emailSlice";
import EmailBody from "./EmailBody";
import EmailList from "./EmailList";

const Layout = () => {
  const [activeFilter, setActiveFilter] = useState("none");
  const dispatch = useDispatch();

  const {
    emailData: { selectedEmail, emailsList },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getEmailsListAsync());
  }, []);

  useEffect(() => {
    if (emailsList.length > 0) {
      dispatch(setFilteredEmailsList(activeFilter));
    }
  }, [activeFilter, emailsList]);

  const loaderPlaceholder = (key) => (
    <div
      key={key}
      className={`bg-white lg:p-4 md:p-2 lg:max-h-[8em] my-1 mx-4 rounded-[5px] border border-[#CFCFCF] ${
        emailsList.length > 0 && "hidden"
      }`}
    >
      <div className="animated-background">
        <div className="bg-white absolute top-0 left-25 h-full w-1/20"></div>
      </div>
    </div>
  );

  return (
    <div className="p-5">
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

      <div
        className={`flex min-h-[60vh] flex-col ${
          emailsList.length > 0 && "hidden"
        }`}
      >
        {[...new Array(3)].map((i, j) => loaderPlaceholder(j))}
      </div>
      <div className={`flex`}>
        <div
          className={selectedEmail?.id ? "w-[45%] hidden md:block" : "w-full "}
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
