import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EmailBody from "./EmailBody";
import EmailList from "./EmailList";
import FolderPanel from "./FolderPanel";
import Header from "./Header";

const Layout = () => {
  const [toggleFolderPanel, setToggleFolderPanel] = useState(true);
  let { id } = useParams();
  const {
    emailData: { emailsList },
  } = useSelector((state) => state);

  const loaderPlaceholder = (key) => (
    <div
      key={key}
      className={`bg-white lg:p-4 md:p-2 lg:max-h-[8em] my-1 mx-4 rounded-[5px] border border-[#CFCFCF] ${
        emailsList.length > 0 ? "hidden" : ""
      } ${id ? "w-[45%]" : ""}`}
    >
      <div className="animated-background">
        <div className="bg-white absolute top-0 left-25 h-full w-1/20"></div>
      </div>
    </div>
  );

  return (
    <div className="p-5">
      <Header
        toggleFolderPanel={toggleFolderPanel}
        setToggleFolderPanel={setToggleFolderPanel}
      />
      <div
        className={`flex min-h-[60vh] flex-col ${
          emailsList.length > 0 && "hidden"
        }`}
      >
        {[...new Array(3)].map((i, j) => loaderPlaceholder(j))}
      </div>
      <div className={`flex`}>
        <div className={!toggleFolderPanel ? "hidden" : "block"}>
          <FolderPanel />
        </div>
        <div className={id ? " md:block" : "w-full "}>
          <EmailList />
        </div>

        {id && (
          <div className={`w-[100%] md:ml-2`}>
            <EmailBody />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
