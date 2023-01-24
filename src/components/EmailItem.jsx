import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSelectedEmail } from "../features/emailSlice";

export const getFirstLetter = (str) => str.slice(0, 1).toUpperCase();
export const camelize = (str) => {
  const wordArr = str.split(" ");
  let temparr = [];
  temparr =
    wordArr.length > 0
      ? wordArr.map((i) => getFirstLetter(i.split("")[0]) + i.slice(1))
      : [getFirstLetter(i.split("")[0]) + i.slice(1)];
  return temparr.join(" ");
};

const EmailItem = ({ data }) => {
  const { date, from, short_description, subject } = data;
  const dispatch = useDispatch();

  return (
    <div
      className="bg-white flex lg:p-4 md:p-2 lg:max-h-[8em] border border-[#CFCFCF] ml-4 mb-2 mt-0 mr-1 rounded-[9px] cursor-pointer"
      onClick={() => dispatch(setSelectedEmail(data))}
    >
      <div className="w-12 lg:w-10 md:w-8 flex justify-center hidden md:block">
        <div className="bg-[#FF0060] rounded-full lg:h-11 lg:w-11 md:w-8 md:h-8 flex items-center justify-center">
          <p className="lg:text-md md:text-md font-bold">
            {getFirstLetter(from.name)}
          </p>
        </div>
      </div>

      <div className="w-88 ml-3 text-gray-500 lg:text-sm text-xs">
        <div>
          <p className="">
            From:{" "}
            <span className="font-bold">
              {camelize(from.name) + " <" + from.email + ">"}
            </span>
          </p>
          <p className="">
            Subject: <span className="font-bold">{subject}</span>
          </p>
        </div>
        <div className="mt-1">
          <p className="line-clamp-1">{short_description}</p>
        </div>
        <div className="flex mt-1 lg:gap-8 md:gap-2">
          <p className="line-clamp-1">
            {moment(date).format("DD/MM/yyyy hh:mma")}
          </p>
          <a className="text-[#FF0060] cursor-pointer">Favorite</a>
        </div>
      </div>
    </div>
  );
};

export default EmailItem;
