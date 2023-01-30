import React, { useEffect, useState } from "react";
import moment from "moment";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setReadEmails, setSelectedEmail } from "../features/emailSlice";
import { useNavigate } from "react-router-dom";
import { MdDone } from "react-icons/md";

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
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [selected, setSelected] = useState(false);
  const { date, from, id, short_description, subject } = data;
  const {
    readFavObj: { favIds, readIds },
    selectAllEmail,
  } = useSelector((state) => state.emailData);
  const dispatch = useDispatch();

  useEffect(() => {
    favIds.includes(id) ? setIsFav(true) : setIsFav(false);
    readIds.includes(id) ? setIsRead(true) : setIsRead(false);
  }, [readIds, favIds]);

  useEffect(() => {
    selectAllEmail ? setSelected(true) : setSelected(false);
  }, [selectAllEmail]);

  const handleEmailClick = () => {
    dispatch(setSelectedEmail(data));
    dispatch(setReadEmails(id));
    navigate("/inbox/mail/" + id);
  };

  return (
    <div
      className={`group ${
        !isRead && " border-l-4 border-[#004de6]" //border border-[#CFCFCF] border-l-4 border-[#004de6]
      }  flex py-2 mb-[.1em] cursor-pointer w-[100%] ${
        selected ? "bg-[#e6e7fe]" : "bg-white"
      }`}
      onClick={() => handleEmailClick()}
    >
      <div className="w-[10%] flex justify-end">
        <div
          onClick={() => setSelected(!selected)}
          className={`w-[1em] h-[1em] ml-1 mt-3 rounded-full border border-slate-500 flex justify-center items-center  group-hover:visible hover:text-slate-500 ${
            selected ? "bg-[#3468fa] visible border-white" : "invisible"
          }`}
        >
          <span className="text-[10px]  ">
            <MdDone />
          </span>
        </div>
      </div>

      <div className="w-[85%] ml-3 text-slate-800">
        <p className="text-[16px] leading-1	">{camelize(from.name)}</p>
        <div className="w-[100%] text-[12px] flex justify-between leading-5	">
          <p className="">{subject}</p>
          <p className="line-clamp-1">{moment(date).format("ddd DD/MM")}</p>
        </div>
        <div className="mt-1 text-[12px] text-slate-600 leading-3	">
          <p className="line-clamp-1">{short_description}</p>
        </div>
        {/* <div className="flex mt-1 lg:gap-8 md:gap-2 text-[16px]">
           <a className={`text-[#FF0060] cursor-pointer ${!isFav && "hidden"}`}>
            Favorite
          </a> 
        </div> */}
      </div>

      <div className="w-[5%]">s</div>
    </div>
  );
};

export default EmailItem;
