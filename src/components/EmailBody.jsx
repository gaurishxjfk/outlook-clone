import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmailBodyAsync,
  setFavEmails,
  setReadEmails,
  setSelectedEmail,
} from "../features/emailSlice";
import { camelize, getFirstLetter } from "./EmailItem";
import moment from "moment";
import { useParams } from "react-router-dom";

const EmailBody = () => {
  let { id } = useParams();
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const {
    emailData: {
      emailBody,
      selectedEmail,
      emailsList,
      readFavObj: { favIds },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getEmailBodyAsync(id));
    favIds.includes(id) ? setIsFav(true) : setIsFav(false);
  }, [id, favIds]);

  useEffect(() => {
    const data = emailsList.find((i) => i.id === id);
    dispatch(setReadEmails(id));
    dispatch(setSelectedEmail(data));
  }, [id, emailsList]);

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
    <div className="bg-white border border-[#CFCFCF] rounded-[9px] p-5 m-5 mt-0 ml-1">
      {selectedEmail?.from ? (
        <div className="flex">
          <div className="bg-[#FF0060] rounded-full h-11 w-11 flex items-center justify-center">
            <span className="text-lg font-bold">
              {getFirstLetter(selectedEmail.from.name)}
            </span>
          </div>
          <div className="text-gray-900 ml-5 flex flex-col gap-5">
            <span className="text-2xl">
              {camelize(selectedEmail.from.name)}
            </span>
            <span>
              {moment(selectedEmail.date).format("DD/MM/yyyy hh:mma")}
            </span>
          </div>
          <div className="ml-auto mr-5">
            <button
              className="bg-[#FF0060] text-white p-2 px-4 font-bold rounded-3xl text-sm"
              onClick={() => dispatch(setFavEmails(selectedEmail.id))}
            >
              {isFav ? "Favorite" : "Mark as Favorite"}
            </button>
          </div>
        </div>
      ) : (
        loaderPlaceholder()
      )}
      <div className="ml-11 p-5 pt-10 ">
        {emailBody ? (
          <span className="text-gray-900">{parse(emailBody)}</span>
        ) : (
          loaderPlaceholder()
        )}
      </div>
    </div>
  );
};

export default EmailBody;
