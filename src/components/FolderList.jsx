import React from "react";
import FolderItem from "./FolderItem";

const FolderList = ({ folderList }) => {
  return folderList.map((item) => (
    <div key={item.id} className="ml-3">
      <FolderItem
        item={item}
      />
    </div>
  ));
};
export default FolderList;
