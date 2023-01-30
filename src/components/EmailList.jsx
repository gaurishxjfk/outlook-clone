import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import EmailItem from "./EmailItem";
import EmailListHeader from "./EmailListHeader";

const EmailList = ({ indexOfFirstRecord, indexOfLastRecord }) => {
  const { filteredEmailsList } = useSelector((state) => state.emailData);
  const currentRecords = filteredEmailsList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const resizableRef = useRef(null);
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);

  useEffect(() => {
    if (resizableRef?.current) {
      resizableRef.current.style.minWidth = "17em";
    }
  }, [resizableRef]);

  const initial = (e) => {
    setInitialPos(e.clientX);
    setInitialSize(resizableRef.current.offsetWidth);
  };

  const resize = (e) => {
    resizableRef.current.style.width = `${
      parseInt(initialSize) + parseInt(e.clientX - initialPos)
    }px`;
  };

  return (
    <div className="flex items-center">
      <div
        id="Resizable"
        ref={resizableRef}
        className="border border-1 border-r-0 border-slate-200 rounded-[5px] max-h-[85vh] relative"
      >
        <EmailListHeader />
        <div
          className={`max-h-[70vh] bg-slate-100  ${
            currentRecords &&
            currentRecords.length > 0 &&
            "overflow-y-scroll custom-scrollbar "
          }`}
        >
          {currentRecords && currentRecords.length > 0 ? (
            currentRecords.map((i) => <EmailItem key={i.id} data={i} />)
          ) : (
            <div
              className={`flex py-2 mb-[.1em] cursor-pointer w-[100%] min-w-[10vh] bg-white text-slate-400 px-12`}
            >
              <span className="text-center mx-auto">
                nothing to show{" :("}
              </span>
            </div>
          )}
        </div>

        <div
          draggable="true"
          onDragStart={initial}
          onDrag={resize}
          className={`border-r-2 cursor-col-resize border-0 border-r-1 rounded-[5px] border-slate-200 w-0 absolute top-0 right-0 h-[100%]`}
        />
      </div>
    </div>
  );
};

export default EmailList;
