import React, { useEffect } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { getEmailBodyAsync } from "../features/emailSlice";
import { camelize, getFirstLetter } from "./EmailItem";
import moment from "moment";

const EmailBody = () => {
  const dispatch = useDispatch();
  const {
    emailData: { emailBody, selectedEmail },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getEmailBodyAsync(selectedEmail.id));
  }, [selectedEmail]);

  return (
    <div className="bg-white border border-[#CFCFCF] rounded-[9px] p-5 m-5 mt-0 ml-1">
      <div className="flex">
        <div className="bg-[#FF0060] rounded-full h-11 w-11 flex items-center justify-center">
          <p className="text-lg font-bold">
            {getFirstLetter(selectedEmail.from.name)}
          </p>
        </div>
        <div className="text-gray-900 ml-5 flex flex-col gap-5">
          <p className="text-2xl">{camelize(selectedEmail.from.name)}</p>
          <p>{moment(selectedEmail.date).format("DD/MM/yyyy hh:mma")}</p>
        </div>
        <div className="ml-auto mr-5">
          <button className="bg-[#FF0060] text-white p-2 px-4 font-bold rounded-3xl text-sm">
            Mark as Favorite
          </button>
        </div>
      </div>
      <div className="ml-11 p-5 pt-10 ">
        <p className="text-gray-900">{emailBody && parse(emailBody)}</p>
      </div>
    </div>
  );
};

export default EmailBody;
