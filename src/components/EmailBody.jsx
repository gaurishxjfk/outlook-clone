import React, { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { TfiZoomIn, TfiAngleDown } from "react-icons/tfi";
import { BsReplyAll, BsReply, BsThreeDots } from "react-icons/bs";
import {
  getEmailBodyAsync,
  setFavEmails,
  setReadEmails,
  setSelectedEmail,
} from "../features/emailSlice";
import { camelize, getFirstLetter } from "./EmailItem";
import moment from "moment";
import { useParams } from "react-router-dom";
import useComponentVisible from "./Custom-hooks/useComponentVisible";

const EmailBody = () => {
  let { id } = useParams();
  const zoomBarRef = useRef()
  const [isFav, setIsFav] = useState(false);
  const [toggleZoom, setToggleZoom] = useState(false);
  const [zoomSize, setZoomSize] = useState(100);
  const dispatch = useDispatch();
  const {
    emailData: {
      emailBody,
      selectedEmail,
      emailsList,
      readFavObj: { favIds },
    },
  } = useSelector((state) => state);

  useComponentVisible(zoomBarRef, setToggleZoom)

  useEffect(() => {
    dispatch(getEmailBodyAsync(id));
    favIds.includes(id) ? setIsFav(true) : setIsFav(false);
  }, [id, favIds]);

  useEffect(() => {
    const data = emailsList.find((i) => i.id === id);
    dispatch(setReadEmails(id));
    dispatch(setSelectedEmail(data));
  }, [id, emailsList]);

  useEffect(() => {
    if (emailBody) {
    }
  }, []);

  const loaderPlaceholder = () => (
    <div
      className={`h-[10em] my-1 mx-4 rounded-[5px]  ${
        emailBody.length > 0 && "hidden"
      }`}
    >
      <div className="animated-background">
        <div className="bg-white absolute top-0 left-25 h w-1/20"></div>
      </div>
    </div>
  );

  return (
    <>
      {selectedEmail?.subject ? (
        <div className=" border border-[#CFCFCF] bg-white rounded-[5px] px-5 py-2  my-0 md:ml-1 flex justify-between relative shadow-lg	">
          <p className="text-slate-600 font-semibold">
            {selectedEmail.subject}
          </p>
          <button
            onClick={() => setToggleZoom(!toggleZoom)}
            className="text-slate-600 flex items-center gap-1 hover:bg-slate-200 px-2 py-1 rounded"
          >
            <TfiZoomIn />
            <span className="text-[10px] mt-2">
              <TfiAngleDown />
            </span>
          </button>
          <div
            ref={zoomBarRef}
            className={`${
              !toggleZoom && "hidden"
            } absolute z-50 drop-shadow-lg bg-white border border-[#CFCFCF] h-10 text-slate-500 rounded-lg flex items-center top-9 right-2 px-4 gap-4`}
          >
            <span className="text-[14px]">{zoomSize}%</span>
            <div>
              <button
                onClick={() => zoomSize <= 125 && setZoomSize(zoomSize + 25)}
                className="px-1 rounded hover:bg-slate-200 w-[1.5em] text-[16px]"
              >
                +
              </button>
              <button
                onClick={() => zoomSize >= 75 && setZoomSize(zoomSize - 25)}
                className="px-1 rounded hover:bg-slate-200 w-[1.5em] text-[16px]"
              >
                -
              </button>
              <button
                onClick={() => setZoomSize(100)}
                className="border border-[#CFCFCF] px-4 rounded text-[14px] font-semibold	ml-1"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="bg-white border border-[#CFCFCF] rounded-[5px] p-5  mt-2 ml-1 shadow-lg	">
        {selectedEmail?.from ? (
          <div className="flex bg-white">
            <div className="bg-[#0001ff] rounded-full h-9 w-9 flex items-center justify-center">
              <span className="text-lg font-bold">
                {getFirstLetter(selectedEmail.from.name)}
              </span>
            </div>
            <div className="text-[#2468fa] ml-5 flex flex-col ">
              <span className="text-slate-500 font-semibold line-clamp-1">
                {camelize(selectedEmail.from.name)}{" "}
                {" <" + selectedEmail.from.email + ">"}
              </span>
              <span className="text-sm text-slate-500">
                To: Regina Philangi
              </span>
            </div>
            <div className="ml-auto mr-5 flex flex-col items-end ">
              <div className="text-[#0001ff] flex items-center justify-center gap-3">
                <span className="p-1 hover:bg-[#e6e7fe] text-center rounded cursor-pointer">
                  <BsReply />
                </span>
                <span className="p-1 hover:bg-[#e6e7fe] rounded cursor-pointer">
                  <BsReplyAll />
                </span>
                <span className="p-1 hover:bg-[#e6e7fe] rounded cursor-pointer flip-hor">
                  <BsReply />
                </span>
                <span className="p-1 hover:bg-[#e6e7fe] rounded cursor-pointer">
                  <BsThreeDots />
                </span>
              </div>
              <span className="text-slate-500 text-[12px] line-clamp-1">
                {moment(selectedEmail.date).format("ddd DD/MM/yyyy hh:mma")}
              </span>
            </div>
          </div>
        ) : (
          loaderPlaceholder()
        )}
        <div className="ml-11 p-5 pt-10 ">
          {emailBody ? (
            <div
              className={`text-gray-800 text-[14px] 	`}
              style={{ fontSize: `${zoomSize}%` }}
            >
              {parse(emailBody)}
            </div>
          ) : (
            loaderPlaceholder()
          )}
          <div className="flex gap-5 my-5">
            <button className="group border border-slate-400 hover:bg-[#e6e7fe] hover:border-slate-200 rounded-[5px] h-[2em]  flex items-center justify-center px-2">
              <span className="p-1 text-center rounded cursor-pointer text-[#0001ff]">
                <BsReply />
              </span>
              <p className="text-slate-500 text-[12px] group-hover:text-[#0001ff]">
                Reply
              </p>
            </button>
            <button className="group border border-slate-400 hover:bg-[#e6e7fe] hover:border-slate-200 rounded-[5px] h-[2em]  flex items-center justify-center px-2">
              <span className="p-1 text-center rounded cursor-pointer text-[#0001ff] flip-hor">
                <BsReply />
              </span>
              <p className="text-slate-500 text-[12px] group-hover:text-[#0001ff]">
                Forward
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailBody;
