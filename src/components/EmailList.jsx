import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmailsListAsync } from "../features/emailSlice";

import EmailItem from "./EmailItem";

const EmailList = ({ setOpenEmail }) => {
  const dispatch = useDispatch();
  const { emailsList } = useSelector((state) => state.emailData);

  useEffect(() => {
    dispatch(getEmailsListAsync());
    return () => {
      true;
    };
  }, []);

  return (
    <div className="">
      {emailsList.map((i) => (
        <EmailItem key={i.id} data={i} setOpenEmail={setOpenEmail} />
      ))}
    </div>
  );
};

export default EmailList;
