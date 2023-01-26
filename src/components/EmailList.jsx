import React from "react";
import { useSelector } from "react-redux";

import EmailItem from "./EmailItem";

const EmailList = ({indexOfFirstRecord, indexOfLastRecord}) => {
  const { filteredEmailsList } = useSelector((state) => state.emailData);
  const currentRecords = filteredEmailsList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  return (
    <div className="min-h-200">
      {currentRecords.map((i) => (
        <EmailItem key={i.id} data={i} />
      ))}
    </div>
  );
};

export default EmailList;
