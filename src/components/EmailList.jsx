import React from "react";
import { useSelector } from "react-redux";

import EmailItem from "./EmailItem";

const EmailList = () => {
  const { filteredEmailsList } = useSelector((state) => state.emailData);

  return (
    <div className="min-h-200">
      {filteredEmailsList.map((i) => (
        <EmailItem key={i.id} data={i} />
      ))}
    </div>
  );
};

export default EmailList;
